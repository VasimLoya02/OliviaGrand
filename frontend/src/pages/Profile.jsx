import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {

    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/auth/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load profile"
                    );
                }

                setProfile(data.data || data.user);

            } catch (error) {

                console.error("Profile Error:", error);

                setError(
                    error.message || "Unable to load profile"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);


    if (loading) {

        return (
            <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-[#C9A45C] border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-[#6B7355]">
                        Loading your profile...
                    </p>

                </div>

            </div>
        );

    }


    if (error) {

        return (
            <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center px-6">

                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">

                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>

                    <h1 className="font-serif text-3xl text-[#2C211B]">
                        Profile Not Available
                    </h1>

                    <p className="text-red-500 mt-3">
                        {error}
                    </p>

                    <Link
                        to="/"
                        className="inline-block mt-6 bg-[#3F4A36] text-white px-6 py-3 rounded-md hover:bg-[#2C211B] transition"
                    >
                        Back to Home
                    </Link>

                </div>

            </div>
        );

    }


    const currentUser = profile || user;


    return (

        <div className="min-h-screen bg-[#F3EBDD] py-16 px-5">

            <div className="max-w-5xl mx-auto">


                {/* ==========================================
                    PAGE HEADER
                ========================================== */}

                <div className="text-center mb-12">

                    <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm">
                        My Account
                    </p>

                    <h1 className="font-serif text-5xl text-[#2C211B] mt-3">
                        My Profile
                    </h1>

                    <p className="text-[#6B7355] mt-4">
                        Manage your personal information and account details.
                    </p>

                </div>


                {/* ==========================================
                    PROFILE CARD
                ========================================== */}

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">


                    {/* ==========================================
                        PROFILE HEADER
                    ========================================== */}

                    <div className="bg-[#3F4A36] px-8 py-10">

                        <div className="flex flex-col md:flex-row items-center gap-6">


                            {/* PROFILE ICON */}

                            <div className="w-28 h-28 rounded-full bg-[#2C211B] border-2 border-[#C9A45C] flex items-center justify-center shadow-lg">

                                <svg
                                    width="55"
                                    height="55"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#C9A45C"
                                    strokeWidth="1.5"
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


                            {/* USER NAME */}

                            <div className="text-center md:text-left">

                                <p className="text-[#C9A45C] uppercase tracking-[3px] text-xs">
                                    Welcome Back
                                </p>

                                <h2 className="font-serif text-4xl text-white mt-2">
                                    {currentUser?.name || "Guest User"}
                                </h2>

                                <p className="text-white/70 mt-2">
                                    {currentUser?.email || "No email available"}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        PERSONAL INFORMATION
                    ========================================== */}

                    <div className="p-8">

                        <h2 className="font-serif text-3xl text-[#2C211B] mb-6">
                            Personal Information
                        </h2>


                        <div className="grid md:grid-cols-2 gap-5">


                            {/* NAME */}

                            <div className="border border-[#E8DDC9] rounded-xl p-5 bg-[#FDFBF7]">

                                <p className="text-xs uppercase tracking-[2px] text-[#C9A45C]">
                                    Full Name
                                </p>

                                <p className="text-lg text-[#2C211B] mt-2 font-medium">
                                    {currentUser?.name || "Not available"}
                                </p>

                            </div>


                            {/* EMAIL */}

                            <div className="border border-[#E8DDC9] rounded-xl p-5 bg-[#FDFBF7]">

                                <p className="text-xs uppercase tracking-[2px] text-[#C9A45C]">
                                    Email Address
                                </p>

                                <p className="text-lg text-[#2C211B] mt-2 font-medium break-all">
                                    {currentUser?.email || "Not available"}
                                </p>

                            </div>


                            {/* PHONE */}

                            <div className="border border-[#E8DDC9] rounded-xl p-5 bg-[#FDFBF7]">

                                <p className="text-xs uppercase tracking-[2px] text-[#C9A45C]">
                                    Phone Number
                                </p>

                                <p className="text-lg text-[#2C211B] mt-2 font-medium">
                                    {currentUser?.phone || "Not available"}
                                </p>

                            </div>


                            {/* ROLE */}

                            <div className="border border-[#E8DDC9] rounded-xl p-5 bg-[#FDFBF7]">

                                <p className="text-xs uppercase tracking-[2px] text-[#C9A45C]">
                                    Account Type
                                </p>

                                <p className="text-lg text-[#2C211B] mt-2 font-medium capitalize">
                                    {currentUser?.role || "Customer"}
                                </p>

                            </div>


                        </div>


                        {/* ==========================================
                            ACCOUNT DETAILS
                        ========================================== */}

                        <h2 className="font-serif text-3xl text-[#2C211B] mt-12 mb-6">
                            Account Details
                        </h2>


                        <div className="grid md:grid-cols-2 gap-5">


                            {/* LOYALTY POINTS */}

                            <div className="bg-[#3F4A36] rounded-xl p-6 text-white">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-[#C9A45C] uppercase tracking-[2px] text-xs">
                                            Loyalty Points
                                        </p>

                                        <p className="font-serif text-4xl mt-2">
                                            {currentUser?.loyaltyPoints ?? 0}
                                        </p>

                                    </div>

                                    <div className="text-4xl">
                                        ⭐
                                    </div>

                                </div>

                            </div>


                            {/* ACCOUNT STATUS */}

                            <div className="bg-[#FDFBF7] border border-[#E8DDC9] rounded-xl p-6">

                                <p className="text-[#C9A45C] uppercase tracking-[2px] text-xs">
                                    Account Status
                                </p>

                                <div className="flex items-center gap-2 mt-3">

                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>

                                    <p className="text-lg text-[#2C211B] font-medium">
                                        {currentUser?.isActive === false
                                            ? "Inactive"
                                            : "Active"}
                                    </p>

                                </div>

                            </div>


                        </div>


                        {/* ==========================================
                            QUICK ACTIONS
                        ========================================== */}

                        <h2 className="font-serif text-3xl text-[#2C211B] mt-12 mb-6">
                            Quick Actions
                        </h2>


                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">


                            <Link
                                to="/orders"
                                className="group border border-[#E8DDC9] rounded-xl p-5 hover:bg-[#3F4A36] transition-all duration-300"
                            >

                                <div className="text-3xl">
                                    🧾
                                </div>

                                <h3 className="text-lg font-semibold text-[#2C211B] group-hover:text-[#C9A45C] mt-3">
                                    Order History
                                </h3>

                                <p className="text-sm text-[#6B7355] group-hover:text-white/70 mt-1">
                                    View your previous orders.
                                </p>

                            </Link>


                            <Link
                                to="/reservations"
                                className="group border border-[#E8DDC9] rounded-xl p-5 hover:bg-[#3F4A36] transition-all duration-300"
                            >

                                <div className="text-3xl">
                                    🍽️
                                </div>

                                <h3 className="text-lg font-semibold text-[#2C211B] group-hover:text-[#C9A45C] mt-3">
                                    Reservations
                                </h3>

                                <p className="text-sm text-[#6B7355] group-hover:text-white/70 mt-1">
                                    Manage your table reservations.
                                </p>

                            </Link>


                            <Link
                                to="/menu"
                                className="group border border-[#E8DDC9] rounded-xl p-5 hover:bg-[#3F4A36] transition-all duration-300"
                            >

                                <div className="text-3xl">
                                    🍴
                                </div>

                                <h3 className="text-lg font-semibold text-[#2C211B] group-hover:text-[#C9A45C] mt-3">
                                    Explore Menu
                                </h3>

                                <p className="text-sm text-[#6B7355] group-hover:text-white/70 mt-1">
                                    Discover our latest dishes.
                                </p>

                            </Link>


                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Profile;

