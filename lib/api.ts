import { supabase } from './supabase';
import { Product } from './data';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products from Supabase:', error);
    return [];
  }

  // Transform snake_case from DB to camelCase for the frontend
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : undefined,
    rating: Number(item.rating),
    reviews: Number(item.reviews),
    category: item.category as Product['category'],
    image: item.image,
    images: item.images || [],
    isNew: item.is_new,
    discountBadge: item.discount_badge || undefined,
    colors: item.colors || undefined,
    stock: Number(item.stock),
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(`Error fetching product ${id} from Supabase:`, error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: Number(data.price),
    originalPrice: data.original_price ? Number(data.original_price) : undefined,
    rating: Number(data.rating),
    reviews: Number(data.reviews),
    category: data.category as Product['category'],
    image: data.image,
    images: data.images || [],
    isNew: data.is_new,
    discountBadge: data.discount_badge || undefined,
    colors: data.colors || undefined,
    stock: Number(data.stock),
  };
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : undefined,
    rating: Number(item.rating),
    reviews: Number(item.reviews),
    category: item.category as Product['category'],
    image: item.image,
    images: item.images || [],
    isNew: item.is_new,
    discountBadge: item.discount_badge || undefined,
    colors: item.colors || undefined,
    stock: Number(item.stock),
  }));
}
