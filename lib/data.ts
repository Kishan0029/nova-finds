export type Category = "electronics" | "lifestyle" | "home" | "accessories";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: Category;
  image: string;
  images?: string[];
  isNew?: boolean;
  discountBadge?: string;
  colors?: string[];
  stock: number;
}

// Keeping a small fallback mock data array for SSR pre-rendering or if Supabase fails
export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Minimalist Smart Watch Pro",
    description: "A premium smartwatch with advanced health tracking and a battery that lasts up to 14 days.",
    price: 15999,
    originalPrice: 19999,
    rating: 4.8,
    reviews: 124,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600&h=600",
    discountBadge: "-20%",
    stock: 45
  },
  {
    id: "p2",
    name: "Ergonomic Wireless Keyboard",
    description: "Type in comfort for hours with our scientifically designed split keyboard.",
    price: 9999,
    rating: 4.9,
    reviews: 89,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600&h=600",
    isNew: true,
    stock: 120
  }
];

// Supabase fetching functions will be implemented in the components directly or a new service file.
