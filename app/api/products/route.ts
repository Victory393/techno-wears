import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET() {
  const { products, source } = await getProducts();

  return NextResponse.json({
    products,
    source,
  });
}
