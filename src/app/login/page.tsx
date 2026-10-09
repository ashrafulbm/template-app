import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { getSession, safeRedirectPath } from "@/lib/session";

// Reads the session cookie, so this page renders per request (Cache Components opt-out).
export const instant = false;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = safeRedirectPath(next);

  // Already logged in? Skip the form.
  if (await getSession()) redirect(redirectTo);

  const registerHref = next ? `/register?next=${encodeURIComponent(next)}` : "/register";

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to your account to continue."
      footer={
        <>
          New here?{" "}
          <Link href={registerHref} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
