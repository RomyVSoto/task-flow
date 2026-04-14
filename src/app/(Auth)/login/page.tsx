"use client";

import React from "react";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { set } from "zod";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    setLoading(false);
  }

  return (
    <div className="bg-background min-h-screen flex flex-col gap-8 items-center justify-center">
      <section className="flex flex-col gap-3 items-center text-center">
        <span className="font-rubik text-3xl font-bold text-accent tracking-tight">
          TaskFlow
        </span>
        <span>
          <p className="font-semibold text-primary text-3xl">Welcome back</p>
          <p className="text-primary-secondary text-md tracking-tight">
            Sign in to your account
          </p>
        </span>
      </section>
      <section className="w-full max-w-md flex flex-col">
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-12 p-10 bg-card border border-border rounded-md shadow-sm"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter text-sm text-primary">Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-primary-secondary" />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full rounded-sm pl-8 focus:pl-10 pr-4 py-3 bg-accent-light text-sm transition-all duration-200"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-inter text-sm text-primary">
                Password
              </label>
              <div className="relative flex items-center">
                <LockKeyhole className="absolute left-3 w-4 h-4 text-primary-secondary" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-sm pl-8 focus:pl-10 pr-4 py-3 bg-accent-light text-sm transition-all duration-200"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          {error && (
            <p className="text-priority-high text-sm text-center">{error}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-sm hover:cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}{" "}
              <ArrowRight className="inline w-5 h-5 ml-1" />
            </button>
          </div>
        </form>
      </section>
      <section>
        <span>
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-accent hover:underline hover:font-semibold transition-all duration-200"
          >
            Register
          </Link>
        </span>
      </section>
    </div>
  );
}
