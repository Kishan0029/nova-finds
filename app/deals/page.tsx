import { getProducts } from "@/lib/api";
import ProductCard from "@/components/shared/ProductCard";
import { Badge } from "@/components/ui/badge";

export default async function DealsPage() {
  // Only show products that have a discountBadge or an originalPrice
  const products = await getProducts();
  const deals = products.filter(p => p.discountBadge || p.originalPrice);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-primary/5 p-8 rounded-3xl border border-primary/20">
          <div>
            <Badge className="bg-red-500 hover:bg-red-600 mb-4 px-3 py-1 text-sm font-bold uppercase tracking-wider">Limited Time</Badge>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Exclusive Deals
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover our premium products at unbeatable prices. These offers won't last long, so grab your favorites while they're still in stock.
            </p>
          </div>
          <div className="text-left md:text-right shrink-0">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Ends In</p>
            <div className="flex items-center gap-2 font-mono text-2xl font-bold text-foreground">
              <span className="bg-card px-3 py-2 rounded-lg border border-border shadow-sm">12</span>:
              <span className="bg-card px-3 py-2 rounded-lg border border-border shadow-sm">45</span>:
              <span className="bg-card px-3 py-2 rounded-lg border border-border shadow-sm">30</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {deals.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No active deals at the moment. Check back later!
          </div>
        )}
      </div>
    </div>
  );
}
