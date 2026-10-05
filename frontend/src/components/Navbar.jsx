import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const { user, logout } = useAuth();
    const { totalItems } = useCart();

    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navigate = useNavigate();


    // ==========================================
    // CLOSE MOBILE MENU
    // ==========================================

    const closeMenu = () => {
        setIsMenuOpen(false);
    };


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        logout();

        setIsProfileOpen(false);
        setIsMenuOpen(false);

        navigate("/");

    };


    // ==========================================
    // NAVIGATION STYLE
    // ==========================================

    const navClass = ({ isActive }) =>
        `relative px-5 py-3 text-sm font-semibold tracking-wide
        uppercase transition-all duration-300
        after:absolute after:left-1/2 after:-bottom-1
        after:-translate-x-1/2 after:h-[2px]
        after:bg-[#C9A45C] after:transition-all after:duration-300
        ${isActive
            ? "text-[#C9A45C] after:w-8"
            : "text-white/90 hover:text-[#C9A45C] after:w-0 hover:after:w-8"
        }`;


    // ==========================================
    // MOBILE NAVIGATION STYLE
    // ==========================================

    const mobileNavClass = ({ isActive }) =>
        `px-4 py-3 rounded-md text-sm font-semibold
        tracking-wide uppercase transition-all duration-300
        ${isActive
            ? "bg-[#C9A45C] text-[#2C211B]"
            : "text-white hover:bg-[#3F4A36] hover:text-[#C9A45C]"
        }`;


    return (

        <header className="sticky top-0 z-50 w-full">


            {/* ==========================================
                TOP BRAND BAR
            ========================================== */}

            <div className="bg-[#2C211B] text-[#F3EBDD]">

                <div className="max-w-7xl mx-auto px-5 lg:px-8">

                    <div className="h-8 flex items-center justify-center md:justify-between text-[10px] sm:text-[11px] tracking-[2px] uppercase font-medium">

                        <p className="hidden md:block">
                            Fine Dining • Luxury Stay • Warm Hospitality
                        </p>

                        <p className="text-[#C9A45C]">
                            Open Daily • 11:00 AM - 11:00 PM
                        </p>

                    </div>

                </div>

            </div>


            {/* ==========================================
                MAIN NAVBAR
            ========================================== */}

            <nav className="bg-[#3F4A36] border-b border-[#C9A45C]/50 shadow-md">

                <div className="max-w-7xl mx-auto px-5 lg:px-8">

                    <div className="h-[78px] flex items-center justify-between">


                        {/* ==========================================
                            LOGO
                        ========================================== */}

                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="group flex items-center gap-3"
                        >

                            {/* Logo Box */}

                            <div className="w-11 h-11 border border-[#C9A45C] flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-[#C9A45C] group-hover:scale-105">

                                <span className="text-[#C9A45C] group-hover:text-[#2C211B] font-serif text-xl transition">
                                    O
                                </span>

                            </div>


                            {/* Brand Name */}

                            <div className="leading-none">

                                <h1 className="font-serif text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#C9A45C] transition">
                                    Olivia Grand
                                </h1>

                                <p className="text-[9px] sm:text-[10px] tracking-[3px] text-[#C9A45C] uppercase mt-1">
                                    Hotel & Restaurant
                                </p>

                            </div>

                        </Link>


                        {/* ==========================================
                            DESKTOP NAVIGATION
                        ========================================== */}

                        <div className="hidden lg:flex items-center">

                            <NavLink
                                to="/"
                                className={navClass}
                            >
                                Home
                            </NavLink>


                            <NavLink
                                to="/menu"
                                className={navClass}
                            >
                                Menu
                            </NavLink>


                            <NavLink
                                to="/reservations"
                                className={navClass}
                            >
                                Reservations
                            </NavLink>


                            <NavLink
                                to="/about"
                                className={navClass}
                            >
                                About
                            </NavLink>


                            <NavLink
                                to="/contact"
                                className={navClass}
                            >
                                Contact
                            </NavLink>

                        </div>


                        {/* ==========================================
                            RIGHT SIDE
                        ========================================== */}

                        {/* ==========================================
    RIGHT SIDE
========================================== */}

                        <div className="hidden lg:flex items-center gap-3">

                            {/* ==========================================
        CART
    ========================================== */}

                            <Link
                                to="/cart"
                                className="relative flex items-center gap-2 px-4 py-3 text-[#F8F1E4] hover:text-[#C9A45C] transition"
                            >

                                <span className="text-xl">
                                    🛒
                                </span>

                                <span className="text-sm tracking-[1px] uppercase font-medium">
                                    Cart
                                </span>


                                {/* CART COUNT */}

                                {totalItems > 0 && (

                                    <span className="absolute -top-1 right-0 bg-[#C9A45C] text-[#2C211B] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">

                                        {totalItems}

                                    </span>

                                )}

                            </Link>


                            {/* DIVIDER */}

                            <div className="h-8 w-px bg-white/20"></div>


                            {/* ==========================================
        BOOK TABLE
        MOVED BEFORE PROFILE
    ========================================== */}

                            <Link
                                to="/reservations"
                                className="bg-[#C9A45C] text-[#2C211B] px-6 py-3 rounded-md text-sm font-semibold tracking-[.5px] hover:bg-[#E0C98D] hover:scale-105 transition-all duration-300 shadow-sm"
                            >
                                Book a Table
                            </Link>


                            {/* ==========================================
        PROFILE
        MOVED AFTER BOOK TABLE
    ========================================== */}

                            {user ? (

                                <div className="relative">

                                    <button
                                        type="button"
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#C9A45C]/20 hover:shadow-[0_0_15px_rgba(201,164,92,0.35)] transition-all duration-300"
                                    >

                                        {/* PROFILE ICON */}

                                        <div className="w-10 h-10 rounded-full border border-[#C9A45C] flex items-center justify-center bg-[#34402F] hover:bg-[#C9A45C] hover:text-[#2C211B] hover:scale-110 hover:rotate-3 transition-all duration-300">

                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >

                                                <circle
                                                    cx="12"
                                                    cy="8"
                                                    r="4"
                                                />

                                                <path
                                                    d="M4 21c0-4 3.5-7 8-7s8 3 8 7"
                                                />

                                            </svg>

                                        </div>


                                        <div className="hidden xl:block text-left">

                                            <p className="text-[11px] text-[#C9A45C] uppercase tracking-[1px]">
                                                Welcome
                                            </p>

                                            <p className="text-sm font-serif tracking-wide">
                                                {user.name || "Account"}
                                            </p>

                                        </div>


                                        {/* ARROW */}

                                        <span className={`text-xs transition-transform ${profileOpen ? "rotate-180" : ""
                                            }`}>
                                            ▼
                                        </span>

                                    </button>


                                    {/* ==========================================
                PROFILE DROPDOWN
            ========================================== */}

                                    {profileOpen && (

                                        <div className="absolute right-0 top-14 w-60 bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E8DDC9]">


                                            {/* USER INFO */}

                                            <div className="px-5 py-4 bg-[#F3EBDD] border-b border-[#E8DDC9]">

                                                <p className="font-serif text-lg text-[#2C211B]">
                                                    {user.name || "Guest"}
                                                </p>

                                                <p className="text-xs text-[#6B7355] mt-1 truncate">
                                                    {user.email}
                                                </p>

                                            </div>


                                            {/* PROFILE */}

                                            <Link
                                                to="/profile"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-3 px-5 py-3 text-[#2C211B] hover:bg-[#F3EBDD] transition"
                                            >

                                                <span className="text-lg">
                                                    👤
                                                </span>

                                                <span className="text-sm tracking-wide">
                                                    My Profile
                                                </span>

                                            </Link>


                                            {/* ORDER HISTORY */}

                                            <Link
                                                to="/orders"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-3 px-5 py-3 text-[#2C211B] hover:bg-[#F3EBDD] transition"
                                            >

                                                <span className="text-lg">
                                                    🧾
                                                </span>

                                                <span className="text-sm tracking-wide">
                                                    Order History
                                                </span>

                                            </Link>


                                            {/* LOGOUT */}

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition border-t border-[#E8DDC9]"
                                            >

                                                <span className="text-lg">
                                                    ↪
                                                </span>

                                                <span className="text-sm tracking-wide">
                                                    Logout
                                                </span>

                                            </button>

                                        </div>

                                    )}

                                </div>

                            ) : (

                                /* ==========================================
                                    LOGIN
                                ========================================== */

                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2 text-[#F8F1E4] hover:text-[#C9A45C] transition"
                                >

                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >

                                        <circle
                                            cx="12"
                                            cy="8"
                                            r="4"
                                        />

                                        <path
                                            d="M4 21c0-4 3.5-7 8-7s8 3 8 7"
                                        />

                                    </svg>

                                    <span className="text-sm uppercase tracking-[1px] font-medium">
                                        Login
                                    </span>

                                </Link>

                            )}

                        </div>


                        {/* ==========================================
                            MOBILE MENU BUTTON
                        ========================================== */}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-11 h-11 border border-[#C9A45C] rounded-md flex flex-col items-center justify-center gap-1.5 hover:bg-[#C9A45C]/10 transition"
                            aria-label="Open menu"
                        >

                            <span
                                className={`block w-5 h-[2px] bg-[#C9A45C] transition ${isMenuOpen
                                    ? "rotate-45 translate-y-[4px]"
                                    : ""
                                    }`}
                            ></span>

                            <span
                                className={`block w-5 h-[2px] bg-[#C9A45C] transition ${isMenuOpen
                                    ? "opacity-0"
                                    : ""
                                    }`}
                            ></span>

                            <span
                                className={`block w-5 h-[2px] bg-[#C9A45C] transition ${isMenuOpen
                                    ? "-rotate-45 -translate-y-[4px]"
                                    : ""
                                    }`}
                            ></span>

                        </button>

                    </div>

                </div>


                {/* ==========================================
                    MOBILE MENU
                ========================================== */}

                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen
                        ? "max-h-[900px] opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                >

                    <div className="bg-[#2C211B] border-t border-[#C9A45C]/30 px-5 py-5">

                        <div className="flex flex-col gap-1">


                            {/* Home */}

                            <NavLink
                                to="/"
                                onClick={closeMenu}
                                className={mobileNavClass}
                            >
                                Home
                            </NavLink>


                            {/* Menu */}

                            <NavLink
                                to="/menu"
                                onClick={closeMenu}
                                className={mobileNavClass}
                            >
                                Menu
                            </NavLink>


                            {/* Reservations */}

                            <NavLink
                                to="/reservations"
                                onClick={closeMenu}
                                className={mobileNavClass}
                            >
                                Reservations
                            </NavLink>


                            {/* About */}

                            <NavLink
                                to="/about"
                                onClick={closeMenu}
                                className={mobileNavClass}
                            >
                                About
                            </NavLink>


                            {/* Contact */}

                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                                className={mobileNavClass}
                            >
                                Contact
                            </NavLink>


                            {/* ==========================================
                                MOBILE CART
                            ========================================== */}

                            <Link
                                to="/cart"
                                onClick={closeMenu}
                                className="px-4 py-3 rounded-md text-sm text-white hover:bg-[#3F4A36] hover:text-[#C9A45C] transition font-semibold tracking-wide uppercase"
                            >
                                🛒 &nbsp; Cart
                            </Link>


                            {/* ==========================================
                                MOBILE PROFILE
                                ONLY WHEN LOGGED IN
                            ========================================== */}

                            {user && (

                                <>

                                    <div className="border-t border-[#C9A45C]/20 my-3"></div>


                                    {/* Mobile User */}

                                    <div className="flex items-center gap-3 px-4 py-3 bg-[#3F4A36] rounded-md">

                                        <div className="w-10 h-10 rounded-full border border-[#C9A45C] flex items-center justify-center bg-[#2C211B]">

                                            <span>
                                                👤
                                            </span>

                                        </div>

                                        <div>

                                            <p className="text-[#C9A45C] text-xs uppercase tracking-wider">
                                                Welcome
                                            </p>

                                            <p className="text-white font-semibold">
                                                {user.name || "User"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Profile */}

                                    <Link
                                        to="/profile"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-md text-sm text-white hover:bg-[#3F4A36] hover:text-[#C9A45C] transition font-semibold tracking-wide"
                                    >
                                        👤 &nbsp; My Profile
                                    </Link>


                                    {/* Order History */}

                                    <Link
                                        to="/orders"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-md text-sm text-white hover:bg-[#3F4A36] hover:text-[#C9A45C] transition font-semibold tracking-wide"
                                    >
                                        📋 &nbsp; Order History
                                    </Link>


                                    {/* Reservations */}

                                    <Link
                                        to="/reservations"
                                        onClick={closeMenu}
                                        className="px-4 py-3 rounded-md text-sm text-white hover:bg-[#3F4A36] hover:text-[#C9A45C] transition font-semibold tracking-wide"
                                    >
                                        🍽️ &nbsp; My Reservations
                                    </Link>


                                    {/* Logout */}

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 rounded-md text-sm text-red-300 hover:bg-red-900/30 transition font-semibold tracking-wide"
                                    >
                                        🚪 &nbsp; Logout
                                    </button>

                                </>

                            )}


                            {/* ==========================================
                                MOBILE LOGIN
                                ONLY WHEN NOT LOGGED IN
                            ========================================== */}

                            {!user && (

                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="mt-2 text-center border border-[#C9A45C] text-[#F3EBDD] px-5 py-3 rounded-md text-sm font-semibold tracking-wide hover:bg-[#C9A45C] hover:text-[#2C211B] transition-all duration-300"
                                >
                                    🔐 Login
                                </Link>

                            )}


                            {/* ==========================================
                                MOBILE CTA
                            ========================================== */}

                            <Link
                                to="/reservations"
                                onClick={closeMenu}
                                className="mt-3 text-center bg-[#C9A45C] text-[#2C211B] px-5 py-3 rounded-md text-sm font-semibold tracking-wide hover:bg-[#E0C98D] transition"
                            >
                                Book a Table
                            </Link>

                        </div>

                    </div>

                </div>

            </nav>

        </header>

    );
}

export default Navbar;
