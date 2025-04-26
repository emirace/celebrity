"use client";

import { useUser } from "@/contexts/user";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Meet", href: "/meet" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">⭘</span>
          </div>
          <span className="font-semibold text-lg text-gray-900">M-Fanstar</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm text-gray-600">
          {navItems.map((item) =>
            item.label === "Services" ? (
              <a
                href={item.href}
                key={item.label}
                className="hover:text-black transition"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-black transition"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Right Side - Button and Avatar */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              href="/register"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <div className="font-semibold">Hi {user.username}</div>
              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-black cursor-pointer overflow-hidden"
              >
                {user.image && (
                  <Image
                    src={user.image}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover "
                  />
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
