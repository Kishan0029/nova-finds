import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card border rounded-2xl p-8 text-center shadow-sm">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 animate-bounce">
            <CheckCircle2 className="h-12 w-12" />
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold font-heading text-foreground">Order Confirmed!</h1>
          <p className="text-muted-foreground text-base">
            Thank you for your purchase. Your order has been placed and is now being processed.
          </p>
          {id && (
            <div className="p-3 bg-muted rounded-xl text-sm font-mono text-foreground/80 break-all select-all">
              Order ID: {id}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Button size="lg" className="w-full rounded-full font-semibold" render={<Link href="/dashboard/orders" />} nativeButton={false}>
            Track in My Orders <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="w-full rounded-full font-semibold" render={<Link href="/shop" />} nativeButton={false}>
            <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
        </div>

      </div>
    </div>
  );
}
