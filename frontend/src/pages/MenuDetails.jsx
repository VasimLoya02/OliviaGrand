import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";
import { useCart } from "../context/CartContext";

function MenuDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const [item, setItem] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    fetchItem();

  }, [id]);


  const fetchItem = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(`/menu/${id}`);

      const data = response.data;

      setItem(
        data.menu ||
        data.item ||
        data
      );

    } catch (error) {

      console.error(error);

      setError("Unable to load menu item.");

    } finally {

      setLoading(false);

    }

  };


  const handleAddToCart = () => {

    addToCart(item);

    alert(`${item.name} added to cart`);

  };


  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <p>
          Loading dish...
        </p>

      </div>
    );

  }


  if (error || !item) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center">

        <p className="text-red-600">
          {error || "Dish not found"}
        </p>

        <Link
          to="/menu"
          className="mt-5 bg-[#3F4A36] text-white px-6 py-3 rounded-md"
        >
          Back to Menu
        </Link>

      </div>
    );

  }


  return (
    <div className="bg-[#F3EBDD] min-h-screen py-16">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-2xl overflow-hidden">

          <img
            src={
              item.image ||
              "https://images.unsplash.com/photo-1547592180-85f173990554"
            }
            alt={item.name}
            className="w-full h-[500px] object-cover"
          />


          <div className="p-8">

            <p className="text-[#C9A45C] uppercase tracking-[3px] text-sm">
              Our Special
            </p>

            <h1 className="font-serif text-4xl text-[#2C211B] mt-3">
              {item.name}
            </h1>

            <p className="text-[#C9A45C] text-2xl font-semibold mt-5">
              ₹{item.price}
            </p>

            <p className="text-[#6B7355] leading-7 mt-6">
              {item.description ||
                "A delicious dish carefully prepared by our chef."}
            </p>


            <button
              onClick={handleAddToCart}
              className="mt-8 bg-[#3F4A36] text-white px-7 py-3 rounded-md hover:bg-[#2C211B] transition"
            >
              Add to Cart
            </button>


            <Link
              to="/menu"
              className="block mt-5 text-[#3F4A36] font-semibold"
            >
              ← Back to Menu
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MenuDetails;