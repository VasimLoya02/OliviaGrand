import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/menu/${id}`);

      console.log("PRODUCT RESPONSE:", response.data);

      setItem(response.data?.data || null);

    } catch (error) {
      console.error("Product detail error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH REVIEWS
  // ==========================================

  const fetchReviews = async () => {
    try {
      const response = await api.get(
        `/reviews/menu/${id}`
      );

      setReviews(response.data?.data || []);

    } catch (error) {
      console.error("Reviews error:", error);
      setReviews([]);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center">
        <div className="text-center">
          <div className="
            w-10
            h-10
            border-4
            border-[#C9A45C]/30
            border-t-[#C9A45C]
            rounded-full
            animate-spin
            mx-auto
          " />

          <p className="mt-4 text-[#6B7355]">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !item) {
    return (
      <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center p-6">

        <div className="
          bg-white
          rounded-3xl
          p-10
          text-center
          border
          border-[#E8DDC9]
          max-w-md
          w-full
        ">

          <div className="text-5xl mb-4">
            🍽️
          </div>

          <h2 className="
            font-serif
            text-3xl
            text-[#2C211B]
          ">
            Product Not Found
          </h2>

          <p className="
            text-[#6B7355]
            mt-3
          ">
            {error || "This menu item could not be found."}
          </p>

          <button
            onClick={() => navigate("/menu")}
            className="
              mt-6
              px-6
              py-3
              rounded-xl
              bg-[#3F4A36]
              text-white
              font-semibold
              hover:bg-[#2f3829]
              transition
            "
          >
            Back to Menu
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="
      min-h-screen
      bg-[#F3EBDD]
      p-4
      sm:p-6
      lg:p-10
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        {/* PRODUCT CARD */}

        <div className="
          bg-white
          rounded-3xl
          overflow-hidden
          border
          border-[#E8DDC9]
          shadow-sm
          grid
          md:grid-cols-2
        ">

          {/* IMAGE */}

          <div className="
            bg-[#F3EBDD]
            min-h-[350px]
            md:min-h-[550px]
          ">

            {item.image ? (
              <img
                src={item.image}
                alt={item.name || "Menu item"}
                className="
                  w-full
                  h-full
                  min-h-[350px]
                  md:min-h-[550px]
                  object-cover
                "
              />
            ) : (
              <div className="
                w-full
                h-full
                min-h-[350px]
                md:min-h-[550px]
                flex
                items-center
                justify-center
                text-7xl
              ">
                🍽️
              </div>
            )}

          </div>

          {/* DETAILS */}

          <div className="
            p-7
            sm:p-10
            lg:p-14
            flex
            flex-col
            justify-center
          ">

            <p className="
              text-[#C9A45C]
              text-xs
              uppercase
              tracking-[4px]
              font-bold
            ">
              Our Special
            </p>

            {/* NAME */}

            <h1 className="
              font-serif
              text-4xl
              sm:text-5xl
              text-[#2C211B]
              mt-3
            ">
              {item.name || "Menu Item"}
            </h1>

            {/* PRICE */}

            <p className="
              text-3xl
              font-bold
              text-[#C9A45C]
              mt-5
            ">
              ₹{Number(item.price || 0).toFixed(2)}
            </p>

            {/* DESCRIPTION */}

            <p className="
              text-[#6B7355]
              text-lg
              leading-8
              mt-6
            ">
              {item.description ||
                "A delicious dish carefully prepared by our chef."}
            </p>

            {/* CATEGORY */}

            {item.category && (
              <div className="mt-5">

                <span className="
                  inline-flex
                  px-4
                  py-2
                  rounded-full
                  bg-[#F3EBDD]
                  text-[#3F4A36]
                  text-sm
                  font-semibold
                  capitalize
                ">
                  {item.category}
                </span>

              </div>
            )}

            {/* AVAILABILITY */}

            <div className="mt-5">

              {item.isAvailable ? (
                <span className="
                  text-green-700
                  font-semibold
                ">
                  ● Available
                </span>
              ) : (
                <span className="
                  text-red-600
                  font-semibold
                ">
                  ● Currently unavailable
                </span>
              )}

            </div>

            {/* RATING */}

            {item.rating !== undefined && (
              <div className="
                mt-4
                text-[#C9A45C]
                font-semibold
              ">
                ⭐ {Number(item.rating || 0).toFixed(1)}
                {" "}
                <span className="text-[#6B7355] font-normal">
                  ({item.numReviews || 0} reviews)
                </span>
              </div>
            )}

            {/* BUTTONS */}

            <div className="
              flex
              flex-wrap
              gap-4
              mt-8
            ">

              <button
                disabled={!item.isAvailable}
                className="
                  px-7
                  py-3.5
                  rounded-xl
                  bg-[#3F4A36]
                  text-white
                  font-semibold
                  hover:bg-[#2f3829]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/menu")}
                className="
                  px-6
                  py-3.5
                  rounded-xl
                  border
                  border-[#E8DDC9]
                  text-[#2C211B]
                  font-semibold
                  hover:bg-[#F3EBDD]
                  transition
                "
              >
                ← Back to Menu
              </button>

            </div>

          </div>

        </div>


        {/* REVIEWS */}

        <div className="
          bg-white
          rounded-3xl
          border
          border-[#E8DDC9]
          mt-8
          p-6
          sm:p-8
        ">

          <h2 className="
            font-serif
            text-3xl
            text-[#2C211B]
          ">
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (

            <p className="
              text-[#6B7355]
              mt-5
            ">
              No reviews yet.
            </p>

          ) : (

            <div className="
              grid
              md:grid-cols-2
              gap-5
              mt-6
            ">

              {reviews.map((review) => (

                <div
                  key={review._id}
                  className="
                    border
                    border-[#E8DDC9]
                    rounded-2xl
                    p-5
                  "
                >

                  <div className="
                    flex
                    items-center
                    justify-between
                  ">

                    <p className="
                      font-semibold
                      text-[#2C211B]
                    ">
                      {review.user?.name || "Customer"}
                    </p>

                    <span className="text-[#C9A45C]">
                      ⭐ {review.rating}
                    </span>

                  </div>

                  <p className="
                    text-[#6B7355]
                    mt-3
                    leading-6
                  ">
                    {review.comment ||
                      "No comment provided."}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;

