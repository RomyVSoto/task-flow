import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="">
      <header className="bg-card text-center py-4 px-14">
        <Link
          href="/"
          className="font-rubik font-semibold text-2xl text-accent tracking-tight"
        >
          TaskFlow
        </Link>
      </header>
      <div className="flex flex-col py-6">
        <section className="items-center flex flex-col gap-12">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="font-rubik font-bold text-5xl">
                Organize your work.
              </h1>
              <h2 className="font-rubik font-bold text-5xl text-accent">
                Ship faster.
              </h2>
            </div>
            <p className="font-inter text-center text-lg text-primary-secondary max-w-lg">
              A simple, powerful Kanban board to keep your team aligned and your
              projects moving.
            </p>
          </div>

          <div className="flex gap-5">
            <Button className="bg-accent text-white px-8 py-6 cursor-pointer hover:bg-accent/90 transition-all">
              Get Started
            </Button>
            <Link href="/login">
              <Button className="bg-transparent border-border text-accent px-10 py-6 cursor-pointer hover:bg-accent hover:text-white transition-all">
                Login
              </Button>
            </Link>
          </div>
        </section>
        <section className="flex justify-center">
          <Image
            src="/LandingDemostrative.png"
            alt="Hero"
            width={750}
            height={750}
          />
        </section>
      </div>
    </div>
  );
}
