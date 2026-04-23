import type { NextRequest } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return;
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
  ],
};
