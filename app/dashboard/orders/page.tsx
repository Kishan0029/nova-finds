import { createClient } from "@/utils/supabase/server";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // In the future, fetch actual orders from the database
  // const { data: orders } = await supabase.from('orders').select('*').eq('user_id', user.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading">Order History</h1>
      
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-muted p-4 border-b">
          <p className="text-sm text-muted-foreground">You have no past orders.</p>
        </div>
        {/* Render orders here when they exist */}
      </div>
    </div>
  );
}
