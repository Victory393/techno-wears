import "server-only";

import { PRODUCTS } from "@/constants/product";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type ProductSource = "supabase" | "fallback";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string;
  price: number;
  priceLabel: string;
  currencyCode: string;
  whatsappMessage: string;
};

type SupabaseProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string;
  price: number | string;
  currency_code: string | null;
  whatsapp_message: string | null;
  sort_order: number;
};

function formatPrice(price: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function fallbackSlug(name: string, id: number) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${id}`.replace(
    /(^-|-$)/g,
    "",
  );
}

function getFallbackProducts(): Product[] {
  return PRODUCTS.map((product) => {
    const price = Number(product.price.replace(/[^0-9.]/g, "")) || 0;

    return {
      id: String(product.id),
      slug: fallbackSlug(product.name, product.id),
      name: product.name,
      description: null,
      imageUrl: product.image,
      price,
      priceLabel: product.price,
      currencyCode: "USD",
      whatsappMessage: `Hello! I'm interested in ${product.name}.`,
    };
  });
}

function mapProduct(row: SupabaseProductRow): Product {
  const price = Number(row.price);
  const currencyCode = row.currency_code ?? "USD";

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    imageUrl: row.image_url,
    price,
    priceLabel: formatPrice(price, currencyCode),
    currencyCode,
    whatsappMessage:
      row.whatsapp_message ?? `Hello! I'm interested in ${row.name}.`,
  };
}

export async function getProducts(): Promise<{
  products: Product[];
  source: ProductSource;
}> {
  if (!hasSupabaseEnv()) {
    return { products: getFallbackProducts(), source: "fallback" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, name, description, image_url, price, currency_code, whatsapp_message, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to load products from Supabase:", error.message);
    return { products: getFallbackProducts(), source: "fallback" };
  }

  if (!data || data.length === 0) {
    return { products: getFallbackProducts(), source: "fallback" };
  }

  return {
    products: data.map((row) => mapProduct(row as SupabaseProductRow)),
    source: "supabase",
  };
}
