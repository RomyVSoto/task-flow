import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
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
        <form className="flex flex-col gap-12 p-10 bg-card border border-border rounded-md shadow-sm">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter text-sm text-primary">Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-primary-secondary" />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full rounded-sm pl-8 focus:pl-10 pr-4 py-3 bg-accent-light text-sm transition-all duration-200"
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
                />
              </div>
            </div>
          </div>
          <div>
            <button className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-sm hover:cursor-pointer">
              Sign In <ArrowRight className="inline w-5 h-5 ml-1" />
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
