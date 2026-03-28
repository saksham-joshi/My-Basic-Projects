import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { VALUES } from "@/lib/values";
import type { CSSProperties } from "react";

const appTheme: CSSProperties = {
    "--brand-primary": VALUES.colors.primary,
    "--brand-primary-light": VALUES.colors.lighter,
    "--brand-primary-dark": VALUES.colors.dark,
    "--brand-primary-deep": VALUES.colors.deep,
    "--brand-primary-rgb": VALUES.colors.primaryRgb,
    "--brand-primary-light-rgb": VALUES.colors.lighterRgb,
    "--brand-primary-dark-rgb": VALUES.colors.darkRgb,
    "--brand-on-primary": VALUES.colors.textOnPrimary,
} as CSSProperties;

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50" style={appTheme}>
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
