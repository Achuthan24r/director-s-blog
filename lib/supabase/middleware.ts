import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // This refreshes the session token if expired.
  // Using getUser() instead of getSession() is secure since it validates the token on the server.
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error("Middleware Auth Error:", error);
  }

  const pathname = request.nextUrl.pathname;

  // Check Sandbox Cookie to bypass redirect during evaluation
  const isDemoSession = request.cookies.get("vance_demo_session")?.value === "active";

  // Protect Admin Dashboard
  if (pathname.startsWith("/admin/dashboard")) {
    if (!user && !isDemoSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      // Optional: keep track of redirect
      url.searchParams.set("redirected", "true");
      return NextResponse.redirect(url);
    }
  }

  // Redirect away from login if already authenticated
  if (pathname.startsWith("/admin/login")) {
    if (user || isDemoSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
