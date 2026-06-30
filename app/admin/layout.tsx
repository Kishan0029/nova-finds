import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin Dashboard | Nova Finds",
};

const ADMIN_EMAIL = "kishanrevankar002@gmail.com";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Check if user is logged in
  if (!user) {
    redirect("/login");
  }

  // 2. Strict Admin Check
  if (user.email !== ADMIN_EMAIL) {
    redirect("/dashboard"); // not admin
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      <AdminSidebar userEmail={user.email} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
