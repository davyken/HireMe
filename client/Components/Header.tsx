"use client";
import { useGlobalContext } from "@/context/globalContext";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";

function Header() {
  const { isAuthenticated } = useGlobalContext();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Optional: add a subtle background when scrolling
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/findwork", label: "Find Work" },
    { href: "/myjobs", label: "My Jobs" },
    { href: "/post", label: "Post a Job" },
  ];

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "px-6 md:px-10 py-4 md:py-6",
        // Transparent by default, subtle blur; add light bg and shadow on scroll
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm"
          : "bg-transparent backdrop-blur-sm",
        "text-gray-600 flex justify-between items-center"
      ].join(" ")}
    >
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="font-extrabold text-xl md:text-2xl text-[#7263f3]">
          HireMe
        </h1>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={[
                "py-2 px-4 rounded-md transition-colors duration-200",
                pathname === link.href
                  ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                  : "hover:text-[#7263F3]"
              ].join(" ")}
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
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-md md:hidden z-50 border-t">
          <ul className="flex flex-col items-start gap-2 p-4">
            {navLinks.map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  className={[
                    "block w-full py-2 px-4 rounded-md transition-colors",
                    pathname === link.href
                      ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                      : "hover:text-[#7263F3]"
                  ].join(" ")}
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
