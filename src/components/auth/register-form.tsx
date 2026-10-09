"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { FormError, FormField, PasswordField, SubmitButton } from "./form-field";

export function RegisterForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));

    if (password !== String(form.get("confirmPassword"))) {
      setError("The two passwords don't match. Type the same password in both fields.");
      return;
    }

    setPending(true);
    const { error } = await signUp
      .email({
        name: String(form.get("name")),
        email: String(form.get("email")),
        password,
      })
      .catch(() => ({ error: { message: "Couldn't reach the server. Try again." } }));

    if (error) {
      setError(error.message ?? "Couldn't create the account. Try again.");
      setPending(false);
      return;
    }

    // Better Auth logs the new user in automatically
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={error} />
      <FormField label="Full name" name="name" autoComplete="name" icon="user" required />
      <FormField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        icon="mail"
        placeholder="you@example.com"
        required
      />
      <PasswordField
        label="Password"
        name="password"
        autoComplete="new-password"
        minLength={8}
        placeholder="At least 8 characters"
        required
      />
      <PasswordField
        label="Confirm password"
        name="confirmPassword"
        autoComplete="new-password"
        minLength={8}
        required
      />
      <SubmitButton pending={pending} label="Create account" pendingLabel="Creating account…" />
    </form>
  );
}
