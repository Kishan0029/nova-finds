"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-12">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {items.length > 0 ? `You have ${items.length} items in your cart.` : "Your cart is currently empty."}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-3xl border border-border">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-semibold mb-3">Your cart is empty</h3>
            <p className="text-muted-foreground max-w-sm mb-8">
              Looks like you haven't added anything to your cart yet. Discover our premium collection of essentials.
            </p>
            <Button size="lg" className="rounded-full px-8" render={<Link href="/shop" />} nativeButton={false}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-3xl border border-border overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-border bg-muted/30 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>
                
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:items-center">
                      
                      {/* Product Info */}
                      <div className="sm:col-span-6 flex gap-4">
                        <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Link href={`/product/${item.id}`} className="font-semibold hover:text-primary transition-colors line-clamp-2 mb-1">
                            {item.name}
                          </Link>
                          <span className="text-sm text-muted-foreground mb-2">₹{item.price.toLocaleString("en-IN")}</span>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors w-fit"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Quantity (Mobile & Desktop) */}
                      <div className="sm:col-span-3 flex justify-between sm:justify-center items-center mt-4 sm:mt-0">
                        <span className="text-sm text-muted-foreground sm:hidden">Quantity:</span>
                        <div className="flex items-center border border-border rounded-full bg-background h-10 w-28">
                          <button 
                            className="flex-1 h-full flex items-center justify-center hover:bg-muted rounded-l-full transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            className="flex-1 h-full flex items-center justify-center hover:bg-muted rounded-r-full transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="sm:col-span-3 flex justify-between sm:justify-end items-center mt-2 sm:mt-0">
                        <span className="text-sm text-muted-foreground sm:hidden">Total:</span>
                        <span className="font-bold text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-muted/50 p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Free Shipping included</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm sticky top-28">
                <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{getCartTotal().toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-foreground">Calculated at checkout</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-heading text-2xl font-bold text-foreground">
                    ₹{getCartTotal().toLocaleString("en-IN")}
                  </span>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full h-14 rounded-full text-base font-semibold group mb-4"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
