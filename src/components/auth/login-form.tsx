"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { FormError, FormField, PasswordField, SubmitButton } from "./form-field";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const { error } = await signIn
      .email({
        email: String(form.get("email")),
        password: String(form.get("password")),
        rememberMe: form.get("rememberMe") === "on",
      })
      .catch(() => ({ error: { message: "Couldn't reach the server. Try again." } }));

    if (error) {
      setError(error.message ?? "Couldn't log in. Check your email and password.");
      setPending(false);
      return;
    }

    router.push(redirectTo);
    router.refresh(); // reload server components so they see the new session
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={error} />
      <FormField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        icon="mail"
        placeholder="you@example.com"
        required
      />
      <PasswordField label="Password" name="password" autoComplete="current-password" required />
      <label className="flex w-fit cursor-pointer select-none items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
        <input
          type="checkbox"
          name="rememberMe"
          defaultChecked
          className="size-4 cursor-pointer rounded accent-blue-600"
        />
        Keep me logged in
      </label>
      <SubmitButton pending={pending} label="Log in" pendingLabel="Logging in…" />
    </form>
  );
}
