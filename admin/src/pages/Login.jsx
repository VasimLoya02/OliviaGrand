
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                formData
            );

            const data = response.data;

            const token =
                data.token ||
                data.data?.token;

            const user =
                data.user ||
                data.data?.user;

            if (!token) {
                throw new Error("Token not received");
            }

            if (user && user.role !== "admin") {

                setError(
                    "Only admin users can access this panel."
                );

                setLoading(false);

                return;
            }
            console.log("LOGIN TOKEN:", token);
            console.log("LOGIN USER:", user);
            localStorage.setItem(
                "adminToken",
                token
            );

            localStorage.setItem(
                "adminUser",
                JSON.stringify(user || {})
            );

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed. Please check your email and password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="text-center mb-8">

                    <div className="w-16 h-16 mx-auto rounded-full bg-[#3F4A36] text-[#C9A45C] flex items-center justify-center text-2xl font-bold">
                        O
                    </div>

                    <h1 className="text-3xl font-bold text-[#2C211B] mt-4">
                        Olivia Grand
                    </h1>

                    <p className="text-[#6B7355] mt-1">
                        Restaurant Admin Panel
                    </p>

                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

                    <h2 className="text-2xl font-bold text-[#2C211B] mb-6">
                        Admin Login
                    </h2>



                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/20"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#3F4A36] text-white py-3 rounded-lg font-semibold hover:bg-[#6B7355] transition disabled:opacity-60"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>
                    <br />
                    {error && (
                        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                </div>

            </div>

        </div>

    );
}

export default Login;