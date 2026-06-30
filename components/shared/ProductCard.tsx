"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Eye, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/data";

export default function ProductCard(product: Product) {
  const {
    id,
    name,
    image,
    price,
    originalPrice,
    rating,
    reviews,
    discountBadge,
    isNew,
    description = "A premium product designed to elevate your everyday life."
  } = product;
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
      
      {/* Image & Badges */}
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountBadge && (
            <Badge variant="destructive" className="font-semibold px-2 py-0.5 shadow-sm rounded-md">
              {discountBadge}
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-primary hover:bg-primary text-primary-foreground font-semibold px-2 py-0.5 shadow-sm rounded-md">
              New
            </Badge>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
          <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full shadow-sm bg-background hover:bg-muted text-foreground">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          
          <Dialog>
            <DialogTrigger render={<Button variant="secondary" size="icon" className="h-9 w-9 rounded-full shadow-sm bg-background hover:bg-muted text-foreground" />}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick view</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto bg-muted">
                  <Image src={image} alt={name} fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col">
                  <DialogHeader className="mb-4 text-left">
                    <DialogTitle className="font-heading text-2xl font-bold">{name}</DialogTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium ml-1">{rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground underline">({reviews} reviews)</span>
                    </div>
                  </DialogHeader>
                  
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-3xl font-bold text-foreground">₹{price.toLocaleString("en-IN")}</span>
                    {originalPrice && (
                      <span className="text-lg text-muted-foreground line-through pb-1">₹{originalPrice.toLocaleString("en-IN")}</span>
                    )}
                  </div>
                  
                  <DialogDescription className="text-base text-foreground/80 mb-8">
                    {description}
                  </DialogDescription>
                  
                  <ul className="space-y-2 mb-8 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Free shipping on orders over ₹1,999</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 30-day return policy</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> In stock, ready to ship</li>
                  </ul>
                  
                  <div className="mt-auto flex gap-4">
                    <Button size="lg" className="flex-1 rounded-full text-base font-semibold" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11 rounded-full shrink-0">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        
        <div className="flex items-center gap-1 mb-2 mt-auto">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-muted-foreground">({reviews})</span>
        </div>

        <Link href={`/product/${id}`} className="mb-2 block h-[3rem]">
          <h3 className="font-heading font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">₹{price.toLocaleString("en-IN")}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
          
          <Button size="icon" className="h-10 w-10 rounded-full shadow-sm" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>

    </div>
  );
}
