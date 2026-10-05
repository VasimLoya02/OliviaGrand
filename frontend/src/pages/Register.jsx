import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

  const navigate = useNavigate();


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
  });


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
  // HANDLE REGISTER
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/auth/register",
        formData
      );


      alert("Registration successful!");

      navigate("/login");


    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center px-6 py-16">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl"
      >

        {/* ==========================================
            TITLE
        ========================================== */}

        <h1 className="font-serif text-4xl text-[#2C211B] text-center">

          Create Account

        </h1>


        {/* ==========================================
            NAME
        ========================================== */}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full mt-7 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
        />


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
          className="w-full mt-4 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
        />


        {/* ==========================================
            PHONE
        ========================================== */}

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full mt-4 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
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
          className="w-full mt-4 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
        />


        {/* ==========================================
            ADDRESS
        ========================================== */}

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full Delivery Address"
          rows="3"
          required
          className="w-full mt-4 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C] resize-none"
        ></textarea>


        {/* ==========================================
            CITY
        ========================================== */}

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="w-full mt-4 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
        />


        {/* ==========================================
            REGISTER BUTTON
        ========================================== */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#3F4A36] text-white py-3 rounded-md hover:bg-[#2C211B] transition disabled:opacity-60"
        >

          {loading
            ? "Creating..."
            : "Create Account"}

        </button>


        {/* ==========================================
            LOGIN LINK
        ========================================== */}

        <p className="text-center text-[#6B7355] mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-[#3F4A36] font-semibold ml-1"
          >

            Login

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;