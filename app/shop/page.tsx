import { Metadata } from "next";
import ShopClient from "./ShopClient";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Shop | Nova Finds",
  description: "Browse our complete collection of premium products.",
};

export const revalidate = 0; // or use cache tags for ISR

export default async function ShopPage() {
  const initialProducts = await getProducts();

  return (
    <div className="min-h-screen bg-background pt-10 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Shop All Products
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover our curated collection of premium essentials designed to elevate your everyday life.
          </p>
        </div>

        {/* Shop Client Components (Filters, Grid, Pagination) */}
        <ShopClient initialProducts={initialProducts} />
        
      </div>
    </div>
  );
}
