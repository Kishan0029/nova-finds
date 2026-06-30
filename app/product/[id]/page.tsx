import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductById, getProductsByCategory } from "@/lib/api";
import ProductDetailsClient from "./ProductDetailsClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Nova Finds",
    };
  }

  return {
    title: `${product.name} | Nova Finds`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Fetch related products (same category)
  const categoryProducts = await getProductsByCategory(product.category);
  const relatedProducts = categoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
