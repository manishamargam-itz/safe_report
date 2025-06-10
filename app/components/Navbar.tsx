"use client";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full border-b border-emerald-100 bg-white/80 backdrop-blur-lg z-50 shadow-sm">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 via-indigo-300 to-blue-400 flex items-center justify-center shadow">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.5l7 3v4.75c0 5.25-3.4 9.42-7 10.75-3.6-1.33-7-5.5-7-10.75V7.5l7-3z"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold text-emerald-700 tracking-tight">
                  Safer Society
                </span>
              </Link>
            </div>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/submit-report"
                className="text-base text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-lg transition-all hover:bg-emerald-50 font-medium"
              >
                Submit Report
              </Link>
              <Link
                href="/track-report"
                className="text-base text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-lg transition-all hover:bg-emerald-50 font-medium"
              >
                Track Report
              </Link>
              <Link
                href="/how-it-works"
                className="text-base text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-lg transition-all hover:bg-emerald-50 font-medium"
              >
                How It Works
              </Link>
              <Link
                href="/resources"
                className="text-base text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-lg transition-all hover:bg-emerald-50 font-medium"
              >
                Resources
              </Link>
            </div>

            {/* Emergency Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden md:block text-base text-gray-700 hover:text-indigo-700 px-3 py-2 rounded-lg transition-all hover:bg-indigo-50 font-medium"
              >
                Contact
              </Link>
              <button className="group flex h-9 items-center gap-2 rounded-full bg-red-500/10 pl-4 pr-5 text-sm font-semibold text-red-600 ring-1 ring-inset ring-red-500/20 transition-all hover:bg-red-500/20 shadow">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Emergency: 911
              </button>
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-emerald-700 hover:text-emerald-900"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}