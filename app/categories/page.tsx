import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/api";

export default async function CategoriesPage() {
  const products = await getProducts();
  const categories = [
    { id: "electronics", name: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200&h=800" },
    { id: "lifestyle", name: "Lifestyle", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1200&h=800" },
    { id: "home", name: "Home & Office", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200&h=800" },
    { id: "accessories", name: "Accessories", image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=1200&h=800" },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections of premium essentials designed to elevate your everyday life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/shop?category=${category.id}`}
              className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all flex flex-col justify-end p-8"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
              <Image 
                src={category.image} 
                alt={category.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-20 flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-white mb-2 shadow-sm capitalize">
                    {category.name}
                  </h2>
                  <p className="text-white/90 font-medium">Shop Collection</p>
                </div>
                <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowRight className="h-5 w-5 text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
