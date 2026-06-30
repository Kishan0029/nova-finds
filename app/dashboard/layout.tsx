import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Package, User, Heart, Settings, LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: <User className="w-5 h-5" /> },
    { name: "Orders", href: "/dashboard/orders", icon: <Package className="w-5 h-5" /> },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: <Heart className="w-5 h-5" /> },
    { name: "Profile", href: "/dashboard/profile", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-background rounded-2xl border p-4 shadow-sm sticky top-28">
              <div className="mb-6 px-2">
                <h2 className="text-xl font-bold font-heading">My Account</h2>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                
                <hr className="my-4 border-border" />
                
                <form action={logout}>
                  <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-destructive/10 text-destructive transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </form>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-background rounded-2xl border p-6 md:p-8 shadow-sm">
              {children}
            </div>
          </main>
        </div>
        
      </div>
    </div>
  );
}
