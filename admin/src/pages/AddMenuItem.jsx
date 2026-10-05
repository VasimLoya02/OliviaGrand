import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddMenuItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Indian",
    price: "",
    discountPrice: "",
    image: "",
    tags: "",
    isAvailable: true,
    stockCount: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter menu item name");
      return;
    }

    if (!formData.price) {
      alert("Please enter price");
      return;
    }

    if (!formData.image.trim()) {
      alert("Please enter image URL");
      return;
    }

    try {
      setLoading(true);

      const data = {
        name: formData.name.trim(),

        description: formData.description.trim(),

        category: formData.category,

        price: Number(formData.price),

        discountPrice:
          formData.discountPrice !== ""
            ? Number(formData.discountPrice)
            : null,

        // IMPORTANT:
        // Backend schema expects images as an array
        images: [formData.image.trim()],

        tags: formData.tags
          ? formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],

        isAvailable: formData.isAvailable,

        stockCount:
          formData.stockCount !== ""
            ? Number(formData.stockCount)
            : null,
      };

      console.log("ADDING MENU ITEM:", data);

      const response = await api.post("/menu", data);

      console.log("MENU ITEM CREATED:", response.data);

      alert("Menu item added successfully!");

      navigate("/menu");

    } catch (error) {
      console.error("ADD MENU ITEM ERROR:", error);

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to add menu item"
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#F3EBDD] p-4 sm:p-6 lg:p-8">

      <div className="max-w-5xl mx-auto">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8">

          <p className="
            text-[#C9A45C]
            text-xs
            uppercase
            tracking-[3px]
            font-bold
          ">
            Restaurant Management
          </p>

          <h1 className="
            text-3xl
            sm:text-4xl
            font-serif
            text-[#2C211B]
            mt-2
          ">
            Add Menu Item
          </h1>

          <p className="
            text-[#6B7355]
            mt-2
          ">
            Add a new dish to your restaurant menu.
          </p>

        </div>


        {/* ==========================================
            FORM CARD
        ========================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-2xl
            border
            border-[#E8DDC9]
            shadow-sm
            overflow-hidden
          "
        >

          {/* FORM HEADER */}

          <div className="
            px-6
            sm:px-8
            py-5
            bg-[#3F4A36]
            text-white
          ">

            <h2 className="text-xl font-semibold">
              Menu Item Information
            </h2>

            <p className="
              text-sm
              text-[#E8DDC9]
              mt-1
            ">
              Fill in the details below.
            </p>

          </div>


          {/* FORM BODY */}

          <div className="
            p-6
            sm:p-8
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          ">


            {/* ==========================================
                NAME
            ========================================== */}

            <div className="md:col-span-2">

              <label className="
                block
                text-sm
                font-semibold
                text-[#2C211B]
                mb-2
              ">
                Menu Item Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Paneer Butter Masala"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-[#E8DDC9]
                  outline-none
                  focus:border-[#C9A45C]
                  focus:ring-2
                  focus:ring-[#C9A45C]/20
                "
                required
              />

            </div>


            {/* ==========================================
                DESCRIPTION
            ========================================== */}

            <div className="md:col-span-2">

              <label className="
                block
                text-sm
                font-semibold
                text-[#2C211B]
                mb-2
              ">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the dish..."
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-[#E8DDC9]
                  outline-none
                  resize-none
                  focus:border-[#C9A45C]
                  focus:ring-2
                  focus:ring-[#C9A45C]/20
                "
              />

            </div>


            {/* ==========================================
                CATEGORY
            ========================================== */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-[#2C211B]
                mb-2
              ">
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-[#E8DDC9]
                  bg-white
                  outline-none
                  focus:border-[#C9A45C]
                  focus:ring-2
                  focus:ring-[#C9A45C]/20
                "
                required
              >

                <option value="Indian">
                  Indian
                </option>

                <option value="Italian">
                  Italian
                </option>

                <option value="Chinese">
                  Chinese
                </option>

                <option value="Mexican">
                  Mexican
                </option>

                <option value="Continental">
                  Continental
                </option>

                <option value="Desserts">
                  Desserts
                </option>

                <option value="Beverages">
                  Beverages
                </option>

              </select>

            </div>


            {/* ==========================================
                PRICE
            ========================================== */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-[#2C211B]
                mb-2
              ">
                Price (₹) *
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="249"
                min="0"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-[#E8DDC9]
                  outline-none
                  focus:border-[#C9A45C]
                  focus:ring-2
                  focus:ring-[#C9A45C]/20
                "
                required
              />

            </div>


            {/* ==========================================
                DISCOUNT PRICE
            ========================================== */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-[#2C211B]
                mb-2
              ">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="Optional"
                min="0"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-[#E8DDC9]
                  outline-none
                  focus:border-[#C9A45C]
                  focus:ring-2
                  focus:ring-[#C9A45C]/20
                "
              />

            </div>


            {/* ==========================================
                IMAGE URL
            ========================================== */}

            <div className="md:col-span-2">

              <label className="
                block
                text-sm
                font-semibold
                text-[#2C211B]
                mb-2
              ">
                Food Image URL *
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-[#E8DDC9]
                  outline-none
                  focus:border-[#C9A45C]
                  focus:ring-2
                  focus:ring-[#C9A45C]/20
                "
                required
              />

              <p className="
                text-xs
                text-[#6B7355]
                mt-2
              ">
                Paste a direct image URL. This image will appear on
                the customer menu card.
              </p>


              {/* IMAGE PREVIEW */}

              {formData.image && (

                <div className="mt-4">

                  <p className="
                    text-sm
                    font-semibold
                    text-[#2C211B]
                    mb-2
                  ">
                    Image Preview
                  </p>

                  <img
                    src={formData.image}
                    alt="Food preview"
                    className="
                      w-full
                      max-w-md
                      h-56
                      object-cover
                      rounded-xl
                      border
                      border-[#E8DDC9]
                    "
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                </div>

              )}

            </div>


            {/* ==========================================
                TAGS
            ========================================== */}

            <div className="md:col-span-2">

              <label className="
                block
                text-sm
                font-semibold
                text-[#2C211B]
                mb-2
              ">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="spicy, popular, chef special"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-[#E8DDC9]
                  outline-none
                  focus:border-[#C9A45C]
                  focus:ring-2
                  focus:ring-[#C9A45C]/20
                "
              />

              <p className="
                text-xs
                text-[#6B7355]
                mt-2
              ">
                Separate multiple tags with commas.
              </p>

            </div>


            {/* ==========================================
                STOCK
            ========================================== */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-[#2C211B]
                mb-2
              ">
                Stock Count
              </label>

              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
                placeholder="Optional"
                min="0"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-[#E8DDC9]
                  outline-none
                  focus:border-[#C9A45C]
                  focus:ring-2
                  focus:ring-[#C9A45C]/20
                "
              />

            </div>


            {/* ==========================================
                AVAILABILITY
            ========================================== */}

            <div className="
              flex
              items-end
            ">

              <label className="
                flex
                items-center
                gap-3
                cursor-pointer
                bg-[#F3EBDD]
                px-4
                py-3
                rounded-lg
                w-full
              ">

                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="
                    w-5
                    h-5
                    accent-[#3F4A36]
                  "
                />

                <span className="
                  text-sm
                  font-semibold
                  text-[#2C211B]
                ">
                  Item is Available
                </span>

              </label>

            </div>

          </div>


          {/* ==========================================
              BUTTONS
          ========================================== */}

          <div className="
            px-6
            sm:px-8
            py-5
            border-t
            border-[#E8DDC9]
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
          ">

            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="
                px-6
                py-3
                rounded-lg
                border
                border-[#C9A45C]
                text-[#3F4A36]
                font-semibold
                hover:bg-[#F3EBDD]
                transition
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="
                px-7
                py-3
                rounded-lg
                bg-[#3F4A36]
                text-white
                font-semibold
                hover:bg-[#2C211B]
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Adding..."
                : "Add Menu Item"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddMenuItem;

