import { createClient } from "@/utils/supabase/server";
import { Package, Clock, CreditCard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">Here's a quick overview of your account.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col items-center text-center gap-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">0</h3>
          <p className="text-sm text-muted-foreground">Total Orders</p>
        </div>
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col items-center text-center gap-2">
          <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">0</h3>
          <p className="text-sm text-muted-foreground">Pending Orders</p>
        </div>
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col items-center text-center gap-2">
          <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
            <CreditCard className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">₹0</h3>
          <p className="text-sm text-muted-foreground">Total Spent</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading">Recent Orders</h2>
          <Button variant="outline" size="sm" render={<Link href="/dashboard/orders" />} nativeButton={false}>
            View All
          </Button>
        </div>
        
        <div className="text-center py-12 border rounded-xl border-dashed">
          <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
          <Button render={<Link href="/shop" />} nativeButton={false}>
            Start Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
