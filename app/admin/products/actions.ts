"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toNumber(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

async function refreshAdminPages() {
  revalidatePath("/");
  revalidatePath("/admin/products");
}

function redirectWithMessage(type: "success" | "error", message: string) {
  redirect(
    `/admin/products?type=${encodeURIComponent(type)}&message=${encodeURIComponent(
      message,
    )}`,
  );
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin("/admin/products");

  const supabase = await createClient();
  const id = String(formData.get("id") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const currencyCode = String(formData.get("currencyCode") || "USD")
    .trim()
    .toUpperCase();
  const whatsappMessage = String(formData.get("whatsappMessage") || "").trim();
  const price = toNumber(formData.get("price"));
  const sortOrder = toNumber(formData.get("sortOrder"));
  const isActive = toBoolean(formData.get("isActive"));

  if (!name || !imageUrl) {
    redirectWithMessage("error", "Name and image URL are required.");
  }

  const payload = {
    name,
    slug: slugify(slugInput || name),
    description: description || null,
    image_url: imageUrl,
    price,
    currency_code: currencyCode || "USD",
    whatsapp_message: whatsappMessage || null,
    sort_order: sortOrder,
    is_active: isActive,
  };

  const query = id
    ? supabase.from("products").update(payload).eq("id", id)
    : supabase.from("products").insert(payload);

  const { error } = await query;

  if (error) {
    redirectWithMessage("error", error.message);
  }

  await refreshAdminPages();
  redirectWithMessage(
    "success",
    id ? "Product updated successfully." : "Product created successfully.",
  );
}

export async function deactivateProductAction(formData: FormData) {
  await requireAdmin("/admin/products");

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    redirectWithMessage("error", "Product ID is required.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    redirectWithMessage("error", error.message);
  }

  await refreshAdminPages();
  redirectWithMessage("success", "Product deactivated successfully.");
}
