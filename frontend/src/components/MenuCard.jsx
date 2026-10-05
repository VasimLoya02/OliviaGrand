import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function MenuCard({ item }) {

    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#E3CC98]/50 hover:-translate-y-2 hover:shadow-xl transition duration-300">

            <div className="h-52 bg-[#EDE3D4] overflow-hidden">

                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-5xl text-[#C9A45C]">
                        🍽
                    </div>
                )}

            </div>

            <div className="p-5">

                <p className="text-sm text-[#6E1F2A] font-semibold uppercase">
                    {item.category || "Special"}
                </p>

                <h3 className="text-2xl font-bold mt-1">
                    {item.name}
                </h3>

                <p className="text-gray-600 mt-2 line-clamp-2">
                    {item.description || "Deliciously prepared with fresh ingredients."}
                </p>

                <div className="flex items-center justify-between mt-5">

                    <span className="text-xl font-bold text-[#6E1F2A]">
                        ₹{item.price}
                    </span>

                    <button
                        onClick={() => addToCart(item)}
                        className="bg-[#6E1F2A] text-white px-4 py-2 rounded-full hover:bg-[#4B121C]"
                    >
                        Add
                    </button>

                </div>

                <Link
                    to={`/menu/${item._id}`}
                    className="block text-center mt-3 border border-[#C9A45C] text-[#6E1F2A] py-2 rounded-full hover:bg-[#C9A45C]"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}

export default MenuCard;