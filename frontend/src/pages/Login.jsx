
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    email: "",
    password: "",

  });


  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(false);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({

      ...previousData,

      [name]: value,

    }));

  };


  // ==========================================
  // HANDLE LOGIN
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);


      // ==========================================
      // LOGIN USING AUTH CONTEXT
      // ==========================================

      const data = await login(
        formData.email,
        formData.password
      );
      console.log("LOGIN DATA =", data);
      console.log("TOKEN =", data?.data?.token);
      console.log("LOCAL TOKEN =", localStorage.getItem("token"));
      console.log("LOCAL USER =", localStorage.getItem("user"));


      console.log("Login response:", data);


      // ==========================================
      // LOGIN SUCCESS
      // ==========================================

      alert("Login successful!");


      // Go to Home page

      navigate("/");


    } catch (error) {

      console.error("Login error:", error);


      alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center px-6 py-16">


      {/* ==========================================
          LOGIN FORM
      ========================================== */}

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >


        {/* ==========================================
            HEADING
        ========================================== */}

        <h1 className="font-serif text-4xl text-[#2C211B] text-center">

          Welcome Back

        </h1>


        <p className="text-[#6B7355] text-center mt-3">

          Login to your account

        </p>


        {/* ==========================================
            EMAIL
        ========================================== */}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full mt-7 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C]"
        />


        {/* ==========================================
            PASSWORD
        ========================================== */}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mt-4 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C] focus:ring-1 focus:ring-[#C9A45C]"
        />


        {/* ==========================================
            LOGIN BUTTON
        ========================================== */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#3F4A36] text-white py-3 rounded-md font-semibold hover:bg-[#2C211B] transition disabled:opacity-60"
        >

          {loading
            ? "Logging in..."
            : "Login"
          }

        </button>


        {/* ==========================================
            REGISTER LINK
        ========================================== */}

        <p className="text-center text-[#6B7355] mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-[#3F4A36] font-semibold ml-1 hover:text-[#C9A45C] transition"
          >

            Register

          </Link>

        </p>


      </form>

    </div>

  );

}


export default Login;
