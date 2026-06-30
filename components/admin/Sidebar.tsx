"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut,
  TrendingUp
} from "lucide-react";
import { logout } from "@/app/login/actions";

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/products", icon: Package },
  ];

  return (
    <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 md:min-h-[calc(100vh-80px)] flex flex-col">
      <div className="p-6">
        <h2 className="font-heading text-lg font-bold text-primary mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Admin Portal
        </h2>
        <p className="text-xs text-muted-foreground mb-6 truncate">{userEmail}</p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-6 mt-auto border-t border-border">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
