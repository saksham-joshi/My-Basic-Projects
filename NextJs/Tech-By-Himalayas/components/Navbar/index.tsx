"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { VALUES } from "@/libs/variables";
import { IMAGE_PATH } from "@/libs/paths";
import "@/app/globals.css";
import { RouteInfo } from "@/libs/routeInfo";
import { Montserrat_Alternates } from "next/font/google";

const navbarTitleFont = Montserrat_Alternates({
  weight: "800",
  preload: true,
  display: "swap"
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={IMAGE_PATH.logo.bgRemoved}
              alt={VALUES.appShortName}
              width={25}
              height={25}
              className="w-12 h-12"
            />
            <span className={`color-primary text-xl ${navbarTitleFont.className}`}>
              {VALUES.appName}
            </span>
          </Link>

          {/* Desktop Menu - Hidden below 914px */}
          <div className="hidden min-[914px]:flex items-center gap-8">
            {RouteInfo.navbarOrder.map((item, index) => (
              <Link
                key={index}
                href={item.route}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {item.text}
              </Link>
            ))}
            <Link
              href={RouteInfo.routes.Register}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Hamburger Button - Shows below 914px */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="min-[914px]:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu - Shows below 914px */}
        <div
          className={`min-[914px]:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 py-4">
            {RouteInfo.navbarOrder.map((item, index) => (
              <Link
                key={index}
                href={item.route}
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2"
              >
                {item.text}
              </Link>
            ))}
            <Link
              href={RouteInfo.routes.Register}
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all text-center"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
