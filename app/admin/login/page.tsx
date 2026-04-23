import Link from "next/link";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/admin";
import { signInAction, signUpAction } from "@/app/admin/login/actions";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    message?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = params.next || "/admin/products";
  const message = params.message;
  const viewer = await getViewer();

  if (viewer.isAdmin) {
    redirect(next);
  }

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
            Admin Access
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Sign in to manage the product catalog.
          </h1>
          <p className="mt-4 max-w-xl text-gray-300">
            This area is protected by Supabase Auth. Product changes go through
            database RLS policies, so only users listed in `public.admin_users`
            can create, edit, or deactivate products.
          </p>

          {message ? (
            <div className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
              {message}
            </div>
          ) : null}

          {viewer.userId && !viewer.isAdmin ? (
            <div className="mt-6 space-y-4 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-5 text-sm text-cyan-50">
              <p>
                You are signed in, but this account is not in `public.admin_users`
                yet.
              </p>
              <div>
                <p className="font-medium text-white">Your user ID</p>
                <code className="mt-2 block overflow-x-auto rounded-lg bg-black/40 p-3 text-xs">
                  {viewer.userId}
                </code>
              </div>
              {viewer.email ? (
                <div>
                  <p className="font-medium text-white">Your email</p>
                  <code className="mt-2 block overflow-x-auto rounded-lg bg-black/40 p-3 text-xs">
                    {viewer.email}
                  </code>
                </div>
              ) : null}
              <div>
                <p className="font-medium text-white">Run this in Supabase SQL</p>
                <code className="mt-2 block overflow-x-auto rounded-lg bg-black/40 p-3 text-xs">
                  {`insert into public.admin_users (user_id, email)\nvalues ('${viewer.userId}', '${viewer.email ?? ""}')\non conflict (user_id) do nothing;`}
                </code>
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              Back to storefront
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <form
            action={signInAction}
            className="rounded-3xl border border-white/10 bg-white p-8 text-black"
          >
            <input type="hidden" name="next" value={next} />
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Use an existing admin account to access the dashboard.
            </p>
            <div className="mt-6 space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Password</span>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-white transition hover:bg-gray-800"
            >
              Sign in
            </button>
          </form>

          <form
            action={signUpAction}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <input type="hidden" name="next" value={next} />
            <h2 className="text-2xl font-semibold">Create account</h2>
            <p className="mt-2 text-sm text-gray-300">
              New accounts are not admins automatically. After sign-up, add the
              user to `public.admin_users` in Supabase.
            </p>
            <div className="mt-6 space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Password</span>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/40"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 transition hover:bg-white/15"
            >
              Create account
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
