"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function buildLoginRedirect(next: string, message: string) {
  return `/admin/login?next=${encodeURIComponent(next)}&message=${encodeURIComponent(
    message,
  )}`;
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin/products");

  if (!email || !password) {
    redirect(buildLoginRedirect(next, "Email and password are required."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(buildLoginRedirect(next, error.message));
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin/products");
  const headerStore = await headers();
  const origin =
    headerStore.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  if (!email || !password) {
    redirect(buildLoginRedirect(next, "Email and password are required."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    redirect(buildLoginRedirect(next, error.message));
  }

  redirect(
    buildLoginRedirect(
      next,
      "Account created. Check your email if confirmation is enabled, then ask an existing admin to add your user ID to public.admin_users.",
    ),
  );
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
