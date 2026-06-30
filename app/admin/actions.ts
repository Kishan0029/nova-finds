"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Ensure the user is an admin before performing any action
async function ensureAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "kishanrevankar002@gmail.com") {
    throw new Error("Unauthorized");
  }
  return supabase;
}

export async function getAdminOrders() {
  try {
    const supabase = await ensureAdmin();
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return orders;
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return [];
  }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const supabase = await ensureAdmin();
    const { error } = await supabase
      .from("orders")
      .update({ order_status: newStatus })
      .eq("id", orderId);

    if (error) throw error;
    
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function getAdminProducts() {
  try {
    const supabase = await ensureAdmin();
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return products;
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return [];
  }
}
