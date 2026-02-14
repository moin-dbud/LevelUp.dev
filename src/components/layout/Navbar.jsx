import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pt-10 pb-4">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="absolute inset-0 -z-10 rounded-full bg-background/30 backdrop-blur-md" />

                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/">
                        <h1 className="__className_a0cab8 cursor-pointer whitespace-nowrap text-3xl font-normal text-white transition-opacity hover:opacity-80">
                            LevelUp.dev
                        </h1>
                    </Link>

                    {/* Center Nav - Desktop */}
                    <div className="hidden md:flex">
                        <ul className="relative flex items-center gap-1 rounded-full border border-white/40 bg-background/50 px-1.5 py-1 overflow-visible">
                            {/* Active Item */}
                            <li className="relative overflow-visible">
                                <Link
                                    to="/"
                                    className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium transition ${pathname === "/"
                                        ? "text-white border-b-2 border-primary"
                                        : "text-white/50 hover:text-white"
                                        }`}
                                >
                                    Home
                                </Link>
                            </li>

                            {[
                                ["How Its Works", "/features"],
                                ["Why Different", "/pricing"],
                                ["Blogs", "/blogs"],
                                ["About", "/about"],
                            ].map(([label, href]) => (
                                <li key={href} className="relative overflow-visible">
                                    <Link
                                        to={href}
                                        className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium transition ${pathname === href
                                            ? "text-white border-b-2 border-primary"
                                            : "text-white/70 hover:text-white"
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}

                            {/* CTA */}
                            <li>
                                <Link to="/login">
                                    <button style={{ backgroundColor: "hsl(217, 91%, 60%)" }} className="relative rounded-full px-4 py-1.5 text-sm font-medium text-white transition hover:opacity-80">
                                        Get Started
                                        <div className="absolute bottom-0 h-1/3 w-full -translate-x-4 rounded-full bg-white/30 blur-sm" />
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu Button  */}
                    <div className="flex md:hidden items-center gap-2">

                        {/* Hamburger Menu */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                        >
                            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 rounded-2xl border border-white/40 bg-background/50 p-4">
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link
                                    to="/"
                                    className={`block rounded-full px-4 py-2 text-sm font-medium transition ${pathname === "/"
                                        ? "text-white border-b-2 border-primary"
                                        : "text-white/70 hover:text-white"
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>

                            {[
                                ["Features", "/features"],
                                ["Pricing", "/pricing"],
                                ["Blogs", "/blogs"],
                                ["About", "/about"],
                            ].map(([label, href]) => (
                                <li key={href}>
                                    <Link
                                        to={href}
                                        className={`block rounded-full px-4 py-2 text-sm font-medium transition ${pathname === href
                                            ? "text-white border-b-2 border-primary"
                                            : "text-white/70 hover:text-white"
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <button style={{ backgroundColor: "hsl(217, 91%, 60%)" }} className="w-full rounded-full px-4 py-2 text-sm font-medium text-white transition hover:opacity-80">
                                        Get Started
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
