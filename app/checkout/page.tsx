import { createClient } from "@/utils/supabase/server";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const email = user?.email || "";
  const name = user?.user_metadata?.full_name || "";

  return (
    <div className="min-h-screen bg-muted/20 py-8 md:py-12">
      <div className="container mx-auto px-4 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">Checkout</h1>
        <p className="text-muted-foreground mt-2">Please review your order and fill in shipping details.</p>
      </div>
      <CheckoutForm initialEmail={email} initialName={name} />
    </div>
  );
}
