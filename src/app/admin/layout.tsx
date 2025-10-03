"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const navItems = [
  { name: "School", href: "/admin" },
  { name: "Book", href: "/admin/book" },
  { name: "Logout", href: "/auth/logout" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ create query client once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen font-[lexend]">
        {/* Sidebar */}
        <div className="w-64 bg-[#53007B] text-white p-4">
          <Link href="/">
            <Image
              src="/sabiyou_bw.png"
              alt="Sabiyou Logo"
              width={150}
              height={150}
              className="lg:w-20 w-14 py-6"
            />
          </Link>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded ${
                  pathname === item.href ? "bg-amber-500" : "hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</main>
      </div>
    </QueryClientProvider>
  );
}
