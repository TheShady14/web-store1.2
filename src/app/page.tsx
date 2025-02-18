"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";
import { TerminalDemo } from "../components/terminal";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 relative bg-gradient-to-b from-gray-900 to-black">
      <h1 className="text-4xl font-bold mb-12 text-green-400 text-center max-w-2xl"></h1>

      <div className="relative w-[600px] mb-12 mt-[-50px]">
        <TerminalDemo />
      </div>

      {/* Navigation buttons container */}
      <div className="flex space-x-4">
        {/* Products page link */}
        <Link href="/products">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Browse Products
          </Button>
        </Link>
        {/* Cart page link */}
        <Link href="/cart">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            View Cart
          </Button>
        </Link>
      </div>
    </main>
  );
}
