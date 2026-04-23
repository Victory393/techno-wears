import { signOutAction } from "@/app/admin/login/actions";
import {
  deactivateProductAction,
  saveProductAction,
} from "@/app/admin/products/actions";
import { requireAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string;
  price: number;
  currency_code: string;
  whatsapp_message: string | null;
  sort_order: number;
  is_active: boolean;
};

async function getAdminProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, name, description, image_url, price, currency_code, whatsapp_message, sort_order, is_active",
    )
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminProduct[];
}

function ProductForm({
  title,
  product,
}: {
  title: string;
  product?: AdminProduct;
}) {
  const submitLabel = product ? "Save changes" : "Create product";

  return (
    <form
      action={saveProductAction}
      className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <input type="hidden" name="id" value={product?.id ?? ""} />
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {product ? (
          <span
            className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em] ${
              product.is_active
                ? "bg-emerald-500/15 text-emerald-200"
                : "bg-gray-500/15 text-gray-300"
            }`}
          >
            {product.is_active ? "Active" : "Inactive"}
          </span>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium">Name</span>
          <input
            name="name"
            required
            defaultValue={product?.name ?? ""}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Slug</span>
          <input
            name="slug"
            defaultValue={product?.slug ?? ""}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Image URL</span>
        <input
          name="imageUrl"
          type="url"
          required
          defaultValue={product?.image_url ?? ""}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Description</span>
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description ?? ""}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block space-y-2">
          <span className="text-sm font-medium">Price</span>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price ?? 0}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Currency</span>
          <input
            name="currencyCode"
            defaultValue={product?.currency_code ?? "USD"}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Sort order</span>
          <input
            name="sortOrder"
            type="number"
            step="1"
            defaultValue={product?.sort_order ?? 0}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium">WhatsApp message</span>
        <textarea
          name="whatsappMessage"
          rows={3}
          defaultValue={product?.whatsapp_message ?? ""}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
        />
      </label>

      <label className="flex items-center gap-3 text-sm text-gray-300">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={product ? product.is_active : true}
          className="h-4 w-4 rounded border-white/20 bg-black/30"
        />
        Product is active
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-xl bg-white px-4 py-3 text-black transition hover:bg-gray-200"
        >
          {submitLabel}
        </button>

        {product ? (
          <button
            type="submit"
            formAction={deactivateProductAction}
            formNoValidate
            className="rounded-xl border border-white/15 px-4 py-3 text-white transition hover:bg-white/10"
          >
            Deactivate
          </button>
        ) : null}
      </div>
    </form>
  );
}

type AdminProductsPageProps = {
  searchParams: Promise<{
    type?: string;
    message?: string;
  }>;
};

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const params = await searchParams;
  const viewer = await requireAdmin("/admin/products");
  const products = await getAdminProducts();
  const message = params.message;
  const type = params.type === "error" ? "error" : params.type === "success" ? "success" : null;

  return (
    <main className="min-h-screen bg-black px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Manage products
            </h1>
            <p className="mt-3 max-w-2xl text-gray-300">
              Signed in as {viewer.email ?? viewer.userId}. Create new products or
              edit the live catalog stored in Supabase.
            </p>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-xl border border-white/15 px-4 py-3 text-white transition hover:bg-white/10"
            >
              Sign out
            </button>
          </form>
        </header>

        {message && type ? (
          <div
            className={`rounded-2xl border p-4 text-sm ${
              type === "error"
                ? "border-rose-500/40 bg-rose-500/10 text-rose-100"
                : "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
            }`}
          >
            {message}
          </div>
        ) : null}

        <ProductForm title="Create product" />

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Existing products</h2>
            <p className="mt-2 text-sm text-gray-400">
              Changes here write directly to Supabase and respect the database RLS
              policies from `supabase/schema.sql`.
            </p>
          </div>

          <div className="grid gap-6">
            {products.map((product) => (
              <ProductForm
                key={product.id}
                title={product.name}
                product={product}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
