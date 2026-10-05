import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MenuManagement() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchMenu();

  }, []);

  const fetchMenu = async () => {

    try {

      const response = await api.get("/menu");

      setItems(response.data.data || []);

    } catch (error) {

      console.error(
        "Menu fetch error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(`/menu/${id}`);

      setItems(
        items.filter(
          (item) => item._id !== id
        )
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to delete item"
      );

    }

  };

  const toggleAvailability = async (
    item
  ) => {

    try {

      const response = await api.patch(
        `/menu/${item._id}/availability`,
        {
          isAvailable:
            !item.isAvailable,
        }
      );

      setItems(
        items.map((currentItem) =>
          currentItem._id === item._id
            ? response.data.data
            : currentItem
        )
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to update availability"
      );

    }

  };

  return (

    <div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#2C211B]">
            Menu Management
          </h1>

          <p className="text-[#6B7355] mt-1">
            Add, edit and manage restaurant menu
          </p>

        </div>

        <Link
          to="/menu/add"
          className="bg-[#3F4A36] text-white px-5 py-3 rounded-lg font-semibold text-center hover:bg-[#6B7355] transition"
        >
          + Add Menu Item
        </Link>

      </div>

      {loading ? (

        <div className="bg-white rounded-xl p-8 text-center">
          Loading menu...
        </div>

      ) : items.length === 0 ? (

        <div className="bg-white rounded-xl p-8 text-center">
          No menu items found.
        </div>

      ) : (

        <div className="bg-white rounded-2xl shadow-sm border border-[#e8dfd0] overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead className="bg-[#3F4A36] text-white">

                <tr>

                  <th className="text-left px-5 py-4">
                    Item
                  </th>

                  <th className="text-left px-5 py-4">
                    Category
                  </th>

                  <th className="text-left px-5 py-4">
                    Price
                  </th>

                  <th className="text-left px-5 py-4">
                    Availability
                  </th>

                  <th className="text-left px-5 py-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {items.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-gray-100 hover:bg-[#F3EBDD]/40"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        {item.images?.[0] ? (

                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />

                        ) : (

                          <div className="w-12 h-12 rounded-lg bg-[#F3EBDD] flex items-center justify-center text-[#3F4A36] font-bold">
                            O
                          </div>

                        )}

                        <div>

                          <p className="font-semibold text-[#2C211B]">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {item.description?.slice(0, 45)}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="bg-[#F3EBDD] text-[#3F4A36] px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category}
                      </span>

                    </td>

                    <td className="px-5 py-4 font-semibold">

                      ₹{item.discountPrice ?? item.price}

                    </td>

                    <td className="px-5 py-4">

                      <button
                        onClick={() =>
                          toggleAvailability(item)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </button>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex gap-2">

                        <Link
                          to={`/menu/edit/${item._id}`}
                          className="px-3 py-2 bg-[#F3EBDD] text-[#3F4A36] rounded-lg text-sm font-semibold hover:bg-[#e7dcc7]"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>

  );
}

export default MenuManagement;