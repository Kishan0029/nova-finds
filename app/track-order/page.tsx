"use client";

import { useState } from "react";
import { Package, Search, CheckCircle2, Truck, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setIsTracking(true);
  };

  return (
    <div className="min-h-screen bg-light-background py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground mb-4">
            Track Your Order
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter your order number below to see real-time updates on your shipment status.
          </p>
        </div>

        <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm mb-12">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="e.g. NF-123456" 
                className="pl-12 h-14 bg-background text-lg"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" size="lg" className="h-14 px-8 rounded-xl font-semibold text-base shrink-0">
              Track Order
            </Button>
          </form>
        </div>

        {isTracking && (
          <div className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Order Number</p>
                <h2 className="font-heading text-2xl font-bold">{orderId.toUpperCase()}</h2>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm font-medium text-muted-foreground mb-1">Estimated Delivery</p>
                <h2 className="font-heading text-2xl font-bold text-primary">Tomorrow, by 9:00 PM</h2>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative mt-8">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 z-0" />
              
              <div className="space-y-8 relative z-10">
                
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="hidden md:block flex-1 text-right">
                    <p className="font-semibold">Order Placed</p>
                    <p className="text-sm text-muted-foreground">June 29, 10:42 AM</p>
                  </div>
                  <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="md:hidden mb-1">
                      <p className="font-semibold">Order Placed</p>
                      <p className="text-sm text-muted-foreground">June 29, 10:42 AM</p>
                    </div>
                    <p className="text-sm">We have received your order.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="hidden md:block flex-1 text-right">
                    <p className="font-semibold">Processing</p>
                    <p className="text-sm text-muted-foreground">June 29, 2:15 PM</p>
                  </div>
                  <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 shadow-md">
                    <Box className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="md:hidden mb-1">
                      <p className="font-semibold">Processing</p>
                      <p className="text-sm text-muted-foreground">June 29, 2:15 PM</p>
                    </div>
                    <p className="text-sm">Your items are being packed.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="hidden md:block flex-1 text-right">
                    <p className="font-semibold text-primary">In Transit</p>
                    <p className="text-sm text-primary/80">Today, 8:30 AM</p>
                  </div>
                  <div className="h-12 w-12 bg-background border-4 border-primary text-primary rounded-full flex items-center justify-center shrink-0 shadow-sm relative">
                    <Truck className="h-5 w-5" />
                    <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping -z-10" />
                  </div>
                  <div className="flex-1">
                    <div className="md:hidden mb-1">
                      <p className="font-semibold text-primary">In Transit</p>
                      <p className="text-sm text-primary/80">Today, 8:30 AM</p>
                    </div>
                    <p className="text-sm">Out for delivery. Arriving soon!</p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 opacity-50">
                  <div className="hidden md:block flex-1 text-right">
                    <p className="font-semibold">Delivered</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div className="h-12 w-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center shrink-0 border border-border">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="md:hidden mb-1">
                      <p className="font-semibold">Delivered</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                    <p className="text-sm">Package will be handed to resident.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
