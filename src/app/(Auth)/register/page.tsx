'use client'

import { useState } from "react";
import { Separator } from "~/components/ui/separator";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { register } from "~/server/actions/auth";


export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await register(form);

    if(result?.error){
      setError(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
  }
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-card py-6 rounded-md shadow-sm">
        <section className="flex flex-col gap-3 items-center text-center">
          <span className="font-rubik text-2xl font-bold text-accent tracking-tight">
            TaskFlow
          </span>
          <span>
            <p className="font-semibold text-primary text-2xl">
              Create an account
            </p>
            <p className="text-primary-secondary text-md tracking-tight">
              Start organizing your work today
            </p>
          </span>
        </section>
        <section className="w-full max-w-md flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 p-10">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="font-inter text-sm text-primary">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-sm pl-4 focus:pl-8 pr-4 py-3 bg-accent-light text-sm transition-all duration-200"
                  onChange={(e) => setForm({...form, fullName: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-inter text-sm text-primary">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-primary-secondary" />
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full rounded-sm pl-8 focus:pl-10 pr-4 py-3 bg-accent-light text-sm transition-all duration-200"
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-inter text-sm text-primary">Password</label>
                <div className="relative flex items-center">
                  <LockKeyhole className="absolute left-3 w-4 h-4 text-primary-secondary" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-sm pl-8 focus:pl-10 pr-4 py-3 bg-accent-light text-sm transition-all duration-200"
                    onChange={(e) => setForm({...form, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-inter text-sm text-primary">Confirm Password</label>
                <div className="relative flex items-center">
                  <LockKeyhole className="absolute left-3 w-4 h-4 text-primary-secondary" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-sm pl-8 focus:pl-10 pr-4 py-3 bg-accent-light text-sm transition-all duration-200"
                    onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
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
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-sm hover:cursor-pointer">
                {loading ? "Creating account..." : "Create Account"} <ArrowRight className="inline w-5 h-5 ml-1" />
              </button>
            </div>
          </form>
        </section>
        <section className="flex flex-col gap-2 justify-center items-center">
          <Separator />
          <span className="text-center my-2">
            Don't have an account?{" "}
            <Link
              href="/login"
              className="text-accent hover:underline hover:font-semibold transition-all duration-200"
            >
              Login
            </Link>
          </span>
        </section>
      </div>
    </div>
  );
}

