import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch real data
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: products } = await supabase
    .from("products")
    .select("*");

  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;
  const activeOrders = orders?.filter(o => o.order_status !== "delivered" && o.order_status !== "cancelled").length || 0;
  const uniqueCustomers = new Set(orders?.map(o => o.email)).size;
  const inStockCount = products?.length || 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: activeOrders.toString(),
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: uniqueCustomers.toString(),
      icon: Users,
    },
    {
      title: "Total Products",
      value: inStockCount.toString(),
      icon: Package,
    },
  ];

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time metrics for Nova Finds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No orders found yet.</div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b border-border last:border-0 pb-4 last:pb-0">
                    <div>
                      <p className="font-medium">{order.shipping_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.id.split('-')[0]} • {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{Number(order.total_amount).toLocaleString("en-IN")}</p>
                      <div className="flex items-center justify-end gap-2 mt-1">
                        <div className={`h-2 w-2 rounded-full ${
                          order.order_status === 'delivered' ? 'bg-green-500' : 
                          order.order_status === 'shipped' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`} />
                        <p className="text-xs text-muted-foreground capitalize">{order.order_status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products?.slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-muted rounded-md shrink-0 border border-border overflow-hidden relative">
                     <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
