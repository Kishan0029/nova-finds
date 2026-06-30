"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Script from "next/script"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { placeOrder, verifyRazorpayPayment } from "./actions"
import { ShoppingBag, CreditCard, Truck } from "lucide-react"

interface CheckoutFormProps {
  initialEmail: string
  initialName: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutForm({ initialEmail, initialName }: CheckoutFormProps) {
  const { items, getCartTotal, clearCart } = useCartStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    email: initialEmail || "",
    shippingName: initialName || "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingPhone: "",
    paymentMethod: "cod" as "cod" | "razorpay",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold font-heading mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to your cart before checking out.</p>
        <Button onClick={() => router.push("/shop")}>Go Shopping</Button>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const orderItems = items.map(item => ({
      id: item.id,
      quantity: item.quantity,
    }))

    try {
      const res = await placeOrder({
        ...formData,
        items: orderItems,
      })

      if (!res.success) {
        setError(res.error || "Something went wrong.")
        setLoading(false)
        return
      }

      if (res.paymentMethod === "cod") {
        clearCart()
        router.push(`/checkout/success?id=${res.orderId}`)
      } else if (res.paymentMethod === "razorpay" && res.razorpayOrderId) {
        // Trigger Razorpay payment modal
        const options = {
          key: res.keyId,
          amount: res.amount * 100,
          currency: "INR",
          name: "Nova Finds",
          description: "Discover Products That Make Life Better",
          order_id: res.razorpayOrderId,
          handler: async function (response: any) {
            setLoading(true)
            const verifyRes = await verifyRazorpayPayment({
              orderId: res.orderId!,
              razorpayOrderId: res.razorpayOrderId!,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              items: orderItems,
            })

            if (verifyRes.success) {
              clearCart()
              router.push(`/checkout/success?id=${res.orderId}`)
            } else {
              setError(verifyRes.error || "Payment verification failed.")
              setLoading(false)
            }
          },
          prefill: {
            name: formData.shippingName,
            email: formData.email,
            contact: formData.shippingPhone,
          },
          theme: {
            color: "#6D4AFF",
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.on("payment.failed", function (response: any) {
          setError(response.error.description || "Payment failed.")
          setLoading(false)
        })
        rzp.open()
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  const subtotal = getCartTotal()
  const shipping = subtotal >= 1999 ? 0 : 99
  const total = subtotal + shipping

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto py-8 px-4 sm:px-6">
        
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="bg-card border rounded-2xl p-6 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> Shipping Details
            </h2>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingName">Full Name</Label>
                  <Input
                    id="shippingName"
                    name="shippingName"
                    required
                    value={formData.shippingName}
                    onChange={handleChange}
                    placeholder="Rahul Kumar"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingAddress">Street Address</Label>
                <Input
                  id="shippingAddress"
                  name="shippingAddress"
                  required
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  placeholder="Flat/House No, Building, Area"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingCity">City</Label>
                  <Input
                    id="shippingCity"
                    name="shippingCity"
                    required
                    value={formData.shippingCity}
                    onChange={handleChange}
                    placeholder="New Delhi"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingState">State</Label>
                  <Input
                    id="shippingState"
                    name="shippingState"
                    required
                    value={formData.shippingState}
                    onChange={handleChange}
                    placeholder="Delhi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingZip">ZIP/Postal Code</Label>
                  <Input
                    id="shippingZip"
                    name="shippingZip"
                    required
                    value={formData.shippingZip}
                    onChange={handleChange}
                    placeholder="110001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingPhone">Phone Number</Label>
                  <Input
                    id="shippingPhone"
                    name="shippingPhone"
                    type="tel"
                    required
                    value={formData.shippingPhone}
                    onChange={handleChange}
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card border rounded-2xl p-6 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Payment Method
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                  formData.paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() => setFormData(prev => ({ ...prev, paymentMethod: "cod" }))}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <div>
                    <p className="font-semibold text-sm">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">Pay when product is delivered</p>
                  </div>
                </div>
              </label>

              <label 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                  formData.paymentMethod === "razorpay" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === "razorpay"}
                    onChange={() => setFormData(prev => ({ ...prev, paymentMethod: "razorpay" }))}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <div>
                    <p className="font-semibold text-sm">Razorpay (Online Payment)</p>
                    <p className="text-xs text-muted-foreground">Cards, NetBanking, UPI</p>
                  </div>
                </div>
              </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold rounded-full mt-4">
              {loading ? "Processing Order..." : `Place Order (₹${total.toLocaleString("en-IN")})`}
            </Button>
          </div>
        </form>

        {/* Order Summary Side panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-28 space-y-6">
            <h2 className="text-xl font-bold font-heading">Order Summary</h2>

            <div className="divide-y max-h-[350px] overflow-y-auto pr-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 pt-4 first:pt-0">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted border shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold self-center">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <hr />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
