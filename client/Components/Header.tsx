"use client";
import { useGlobalContext } from "@/context/globalContext";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Profile from "./Profile";

function Header() {
  const { isAuthenticated } = useGlobalContext();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/findwork", label: "Find Work" },
    { href: "/myjobs", label: "My Jobs" },
    { href: "/post", label: "Post a Job" },
  ];

  return (
    <header className="px-6 md:px-10 py-4 md:py-6 bg-[#D7DEDC] text-gray-500 flex justify-between items-center relative">
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="font-extrabold text-xl md:text-2xl text-[#7263f3]">HireMe</h1>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`py-2 px-4 rounded-md transition-colors duration-200 ${
                pathname === link.href
                  ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                  : "hover:text-[#7263F3]"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Auth */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href={"https://hireme-yu0h.onrender.com/login"}
              className="py-2 px-4 rounded-md border flex items-center gap-2 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href={"https://hireme-yu0h.onrender.com/login"}
              className="py-2 px-4 rounded-md border flex items-center gap-2 border-[#7263F3] text-[#7263F3] hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-[#D7DEDC] shadow-md md:hidden z-50">
          <ul className="flex flex-col items-start gap-2 p-4">
            {navLinks.map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  className={`block w-full py-2 px-4 rounded-md ${
                    pathname === link.href
                      ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                      : "hover:text-[#7263F3]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 p-4 border-t">
            {isAuthenticated ? (
              <Profile />
            ) : (
              <>
                <Link
                  href={"https://hireme-yu0h.onrender.com/login"}
                  className="py-2 px-4 rounded-md border flex items-center gap-2 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href={"https://hireme-yu0h.onrender.com/login"}
                  className="py-2 px-4 rounded-md border flex items-center gap-2 border-[#7263F3] text-[#7263F3] hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out"
                  onClick={() => setMobileOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
