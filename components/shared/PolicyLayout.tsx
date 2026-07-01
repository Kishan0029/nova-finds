"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  Undo2, 
  CreditCard, 
  Truck, 
  ChevronRight, 
  Calendar,
  Scale
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const policies = [
  {
    name: "Terms & Conditions",
    href: "/terms",
    icon: Scale,
    description: "Rules, guidelines, and legal agreements."
  },
  {
    name: "Privacy Policy",
    href: "/privacy",
    icon: ShieldCheck,
    description: "How we protect and manage your data."
  },
  {
    name: "Return Policy",
    href: "/returns",
    icon: Undo2,
    description: "Returns, exchanges, and eligibility rules."
  },
  {
    name: "Refund Policy",
    href: "/refund",
    icon: CreditCard,
    description: "Refund timelines and cancellation terms."
  },
  {
    name: "Shipping Policy",
    href: "/shipping",
    icon: Truck,
    description: "Delivery times, tracking, and carrier details."
  }
];

export default function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-light-background py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Customer Policies</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary font-semibold">{title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-card rounded-3xl border border-border p-6 md:p-10 mb-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Legal & Info
              </span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="text-muted-foreground text-sm flex items-center gap-1.5 pt-1">
                <Calendar className="h-4 w-4" /> Last Updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Panel - Addressing the approximate timelines dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Timeline 1 */}
          <Card className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative overflow-hidden group hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex gap-4 items-start relative z-10">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Undo2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Approx. Timeline</span>
                <h4 className="font-heading text-lg font-bold text-foreground">7-Day Easy Returns</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Request returns or size exchanges within 7 days of delivery. Keep items unused and with original tags.
                </p>
              </div>
            </div>
          </Card>

          {/* Timeline 2 */}
          <Card className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative overflow-hidden group hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex gap-4 items-start relative z-10">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Approx. Timeline</span>
                <h4 className="font-heading text-lg font-bold text-foreground">3-Day Refund Cycle</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once your return check passes quality inspection, approved refunds are initiated and processed in 3 business days.
                </p>
              </div>
            </div>
          </Card>

          {/* Timeline 3 */}
          <Card className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative overflow-hidden group hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex gap-4 items-start relative z-10">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Approx. Timeline</span>
                <h4 className="font-heading text-lg font-bold text-foreground">5-Day Fast Shipping</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Orders are dispatched within 5 days of placement, shipping via registered speed post or domestic couriers.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="font-heading font-bold text-lg mb-4 text-foreground px-2">
                Policy Navigation
              </h3>
              <nav className="space-y-1">
                {policies.map((policy) => {
                  const Icon = policy.icon;
                  const isActive = pathname === policy.href;
                  return (
                    <Link
                      key={policy.name}
                      href={policy.href}
                      className={`flex gap-3 items-start p-3.5 rounded-2xl transition-all duration-200 group ${
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${isActive ? "" : "text-primary group-hover:scale-110 transition-transform duration-200"}`} />
                      <div className="space-y-0.5">
                        <p className={`font-semibold text-sm ${isActive ? "text-primary-foreground" : "text-foreground"}`}>
                          {policy.name}
                        </p>
                        <p className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {policy.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            {/* Quick Contact Card */}
            <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
              <h4 className="font-heading font-bold text-foreground">Need Assistance?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you have questions about our policies, shipping times, or your order details, please don&apos;t hesitate to contact our support team.
              </p>
              <Button size="sm" className="rounded-xl w-full font-semibold shadow-sm hover:shadow" render={<Link href="/contact" />} nativeButton={false}>
                Contact Support
              </Button>
            </div>
          </aside>

          {/* Horizontal Navigation for Mobile */}
          <div className="lg:hidden w-full overflow-x-auto pb-4 scrollbar-none">
            <div className="flex gap-3 px-1 min-w-max">
              {policies.map((policy) => {
                const Icon = policy.icon;
                const isActive = pathname === policy.href;
                return (
                  <Link
                    key={policy.name}
                    href={policy.href}
                    className={`flex items-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25" 
                        : "bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{policy.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main Reading Content Area */}
          <main className="lg:col-span-8 bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            <article className="prose dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              {children}
            </article>

            {/* Quick Footer inside Policy Content */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
              <p>Nova Finds Legal Operations</p>
              <div className="flex gap-4">
                <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                <span>•</span>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                <span>•</span>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
