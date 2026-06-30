'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import Razorpay from 'razorpay'
import crypto from 'crypto'

interface OrderInput {
  email: string
  shippingName: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingZip: string
  shippingPhone: string
  paymentMethod: 'cod' | 'razorpay'
  items: { id: string; quantity: number }[]
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function placeOrder(input: OrderInput) {
  const supabase = await createClient()

  // 1. Get current logged-in user (if any)
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Fetch products from DB to verify pricing on the server
  const productIds = input.items.map(item => item.id)
  const { data: dbProducts, error: dbError } = await supabase
    .from('products')
    .select('id, price, name, stock')
    .in('id', productIds)

  if (dbError || !dbProducts || dbProducts.length === 0) {
    return { success: false, error: 'Failed to verify products.' }
  }

  // Map products by ID for fast lookup
  const productMap = new Map(dbProducts.map(p => [p.id, p]))

  // 3. Calculate total
  let totalAmount = 0
  for (const item of input.items) {
    const dbProduct = productMap.get(item.id)
    if (!dbProduct) {
      return { success: false, error: `Product ${item.id} not found.` }
    }
    if (dbProduct.stock < item.quantity) {
      return { success: false, error: `Insufficient stock for ${dbProduct.name}.` }
    }
    totalAmount += Number(dbProduct.price) * item.quantity
  }

  // 4. Insert order as 'pending'
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user?.id || null,
      email: input.email,
      shipping_name: input.shippingName,
      shipping_address: input.shippingAddress,
      shipping_city: input.shippingCity,
      shipping_state: input.shippingState,
      shipping_zip: input.shippingZip,
      shipping_phone: input.shippingPhone,
      payment_method: input.paymentMethod,
      payment_status: 'pending',
      order_status: 'processing',
      total_amount: totalAmount,
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('Order creation error:', orderError)
    return { success: false, error: 'Failed to save order.' }
  }

  // 5. Insert order items
  const orderItemsData = input.items.map(item => {
    const dbProduct = productMap.get(item.id)!
    return {
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: Number(dbProduct.price),
    }
  })

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData)

  if (itemsError) {
    console.error('Order items error:', itemsError)
    // Rollback order
    await supabase.from('orders').delete().eq('id', order.id)
    return { success: false, error: 'Failed to save order items.' }
  }

  // 6. Handle COD immediately
  if (input.paymentMethod === 'cod') {
    // Deduct stock
    for (const item of input.items) {
      const dbProduct = productMap.get(item.id)!
      await supabase
        .from('products')
        .update({ stock: dbProduct.stock - item.quantity })
        .eq('id', item.id)
    }

    revalidatePath('/dashboard/orders')
    return { success: true, orderId: order.id, paymentMethod: 'cod' }
  }

  // 7. Handle Razorpay (create Razorpay order)
  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // paise
      currency: 'INR',
      receipt: order.id,
    })

    return {
      success: true,
      orderId: order.id,
      paymentMethod: 'razorpay',
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
    }
  } catch (err) {
    console.error('Razorpay order creation failed:', err)
    // Rollback order
    await supabase.from('orders').delete().eq('id', order.id)
    return { success: false, error: 'Failed to initialize payment gateway.' }
  }
}

export async function verifyRazorpayPayment(data: {
  orderId: string
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
  items: { id: string; quantity: number }[]
}) {
  const supabase = await createClient()

  // 1. Verify signature
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
    .digest('hex')

  if (generatedSignature !== data.razorpaySignature) {
    return { success: false, error: 'Payment signature verification failed.' }
  }

  // 2. Update order payment_status to 'paid'
  const { error: updateError } = await supabase
    .from('orders')
    .update({ payment_status: 'paid' })
    .eq('id', data.orderId)

  if (updateError) {
    console.error('Failed to mark order as paid:', updateError)
    return { success: false, error: 'Payment verified, but failed to update order database.' }
  }

  // 3. Deduct stock
  for (const item of data.items) {
    const { data: dbProduct } = await supabase
      .from('products')
      .select('stock')
      .eq('id', item.id)
      .single()

    if (dbProduct) {
      await supabase
        .from('products')
        .update({ stock: Math.max(0, dbProduct.stock - item.quantity) })
        .eq('id', item.id)
    }
  }

  revalidatePath('/dashboard/orders')
  return { success: true }
}
