import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

export default async function AdminIndexPage() {
  await requireAdmin("/admin/products");
  redirect("/admin/products");
}
