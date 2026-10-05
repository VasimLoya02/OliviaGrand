import { useEffect, useState } from "react";

function MenuForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Save Menu Item",
}) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Indian",
    price: "",
    discountPrice: "",
    images: "",
    tags: "",
    isAvailable: true,
    stockCount: "",
  });

  useEffect(() => {

    if (initialData) {

      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        category: initialData.category || "Indian",
        price: initialData.price || "",
        discountPrice:
          initialData.discountPrice ?? "",
        images:
          initialData.images?.join(", ") || "",
        tags:
          initialData.tags?.join(", ") || "",
        isAvailable:
          initialData.isAvailable ?? true,
        stockCount:
          initialData.stockCount ?? "",
      });

    }

  }, [initialData]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const data = {

      name: formData.name,

      description: formData.description,

      category: formData.category,

      price: Number(formData.price),

      discountPrice:
        formData.discountPrice === ""
          ? null
          : Number(formData.discountPrice),

      images: formData.images
        ? formData.images
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],

      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],

      isAvailable: formData.isAvailable,

      stockCount:
        formData.stockCount === ""
          ? null
          : Number(formData.stockCount),
    };

    onSubmit(data);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-[#e8dfd0] p-5 md:p-7"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="md:col-span-2">

          <label className="block text-sm font-semibold mb-2">
            Item Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Example: Paneer Tikka"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C]"
          />

        </div>

        <div className="md:col-span-2">

          <label className="block text-sm font-semibold mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the menu item"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C]"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold mb-2">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-[#C9A45C]"
          >

            <option>Indian</option>
            <option>Italian</option>
            <option>Chinese</option>
            <option>Mexican</option>
            <option>Continental</option>
            <option>Desserts</option>
            <option>Beverages</option>

          </select>

        </div>

        <div>

          <label className="block text-sm font-semibold mb-2">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="500"
            min="0"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C]"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold mb-2">
            Discount Price
          </label>

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            placeholder="450"
            min="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C]"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold mb-2">
            Stock Count
          </label>

          <input
            type="number"
            name="stockCount"
            value={formData.stockCount}
            onChange={handleChange}
            placeholder="20"
            min="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C]"
          />

        </div>

        <div className="md:col-span-2">

          <label className="block text-sm font-semibold mb-2">
            Image URLs
          </label>

          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://image1.jpg, https://image2.jpg"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C]"
          />

          <p className="text-xs text-gray-500 mt-1">
            Multiple URLs ko comma se separate karein.
          </p>

        </div>

        <div className="md:col-span-2">

          <label className="block text-sm font-semibold mb-2">
            Tags
          </label>

          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="spicy, popular, vegetarian"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#C9A45C]"
          />

        </div>

        <div className="md:col-span-2">

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="w-5 h-5 accent-[#3F4A36]"
            />

            <span className="font-semibold">
              Item is available
            </span>

          </label>

        </div>

      </div>

      <div className="mt-7 flex flex-col sm:flex-row gap-3">

        <button
          type="submit"
          disabled={loading}
          className="bg-[#3F4A36] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6B7355] transition disabled:opacity-60"
        >
          {loading ? "Saving..." : submitText}
        </button>

      </div>

    </form>

  );
}

export default MenuForm;