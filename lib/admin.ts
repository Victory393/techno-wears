import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Viewer = {
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
};

export const getViewer = cache(async (): Promise<Viewer> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;
  const email = typeof data?.claims?.email === "string" ? data.claims.email : null;

  if (!userId) {
    return {
      userId: null,
      email,
      isAdmin: false,
    };
  }

  const { data: adminRow, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to read admin status:", error.message);
  }

  return {
    userId,
    email,
    isAdmin: Boolean(adminRow),
  };
});

export async function requireAdmin(next = "/admin/products") {
  const viewer = await getViewer();

  if (!viewer.userId) {
    redirect(`/admin/login?next=${encodeURIComponent(next)}`);
  }

  if (!viewer.isAdmin) {
    redirect(
      `/admin/login?next=${encodeURIComponent(next)}&message=${encodeURIComponent(
        "Your account is signed in but does not have admin access yet.",
      )}`,
    );
  }

  return viewer;
}
