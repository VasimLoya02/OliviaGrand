import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import ReviewForm from "../components/ReviewForm";
function Menu() {

  // ==========================================
  // STORE ALL MENU ITEMS
  // ==========================================

  const [menuItems, setMenuItems] = useState([]);

  // ==========================================
  // STORE FILTERED MENU ITEMS
  // ==========================================

  const [filteredItems, setFilteredItems] = useState([]);

  // ==========================================
  // LOADING STATE
  // ==========================================

  const [loading, setLoading] = useState(true);

  // ==========================================
  // ERROR STATE
  // ==========================================

  const [error, setError] = useState("");

  // ==========================================
  // SELECTED CATEGORY
  // ==========================================

  const [selectedCategory, setSelectedCategory] = useState("All");

  // ==========================================
  // SELECTED PRODUCT FOR DETAILS
  // ==========================================

  const [selectedItem, setSelectedItem] = useState(null);

  // ==========================================
  // DETAIL LOADING
  // ==========================================

  const [detailLoading, setDetailLoading] = useState(false);

  // ==========================================
  // REVIEWS
  // ==========================================

  const [reviews, setReviews] = useState([]);

  // ==========================================
  // RECOMMENDATIONS
  // ==========================================

  const [recommendations, setRecommendations] = useState([]);

  // ==========================================
  // CART
  // ==========================================

  const { addToCart } = useCart();

  // ==========================================
  // MENU CATEGORIES
  // ==========================================

  const categories = [
    "All",
    "Indian",
    "Italian",
    "Chinese",
    "Mexican",
    "Continental",
    "Desserts",
    "Beverages",
  ];

  // ==========================================
  // FETCH MENU WHEN PAGE LOADS
  // ==========================================

  useEffect(() => {
    fetchMenu();
  }, []);

  // ==========================================
  // FETCH ALL MENU ITEMS
  // ==========================================

  const fetchMenu = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/menu");

      const data = response.data;

      if (data.success && Array.isArray(data.data)) {

        setMenuItems(data.data);
        setFilteredItems(data.data);

      } else {

        setMenuItems([]);
        setFilteredItems([]);

      }

    } catch (error) {

      console.error("Menu Error:", error);

      setError(
        "Unable to load menu. Please check your backend server."
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // CATEGORY FILTER
  // ==========================================

  const handleCategoryClick = (category) => {

    setSelectedCategory(category);

    if (category === "All") {

      setFilteredItems(menuItems);

      return;

    }

    const filtered = menuItems.filter((item) => {

      return (
        item.category?.toLowerCase() ===
        category.toLowerCase()
      );

    });

    setFilteredItems(filtered);

  };

  // ==========================================
  // ADD ITEM TO CART
  // ==========================================

  const handleAddToCart = (item) => {

    if (!item.isAvailable) {
      return;
    }

    addToCart(item);

    alert(`${item.name} added to cart`);

  };

  // ==========================================
  // OPEN PRODUCT DETAILS
  // ==========================================

  const handleDetails = async (item) => {

    try {

      setSelectedItem(item);

      setReviews([]);
      setRecommendations([]);

      setDetailLoading(true);

      // ==========================================
      // FETCH REVIEWS
      // GET /api/reviews/menu/:menuItemId
      // ==========================================

      try {

        const reviewResponse = await api.get(
          `/reviews/menu/${item._id}`
        );

        setReviews(
          reviewResponse.data?.data || []
        );

      } catch (reviewError) {

        console.error(
          "Reviews loading error:",
          reviewError
        );

        setReviews([]);

      }

      // ==========================================
      // FETCH RECOMMENDATIONS
      // GET /api/menu/:id/recommendations
      // ==========================================

      try {

        const recommendationResponse =
          await api.get(
            `/menu/${item._id}/recommendations`
          );

        setRecommendations(
          recommendationResponse.data?.data || []
        );

      } catch (recommendationError) {

        console.error(
          "Recommendations loading error:",
          recommendationError
        );

        setRecommendations([]);

      }

    } catch (error) {

      console.error(
        "Product details error:",
        error
      );

    } finally {

      setDetailLoading(false);

    }

  };

  // ==========================================
  // CLOSE PRODUCT DETAILS
  // ==========================================

  const closeDetails = () => {

    setSelectedItem(null);
    setReviews([]);
    setRecommendations([]);

  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-[#F3EBDD]
        flex
        items-center
        justify-center
      ">

        <p className="
          text-[#3F4A36]
          text-lg
        ">

          Loading menu...

        </p>

      </div>

    );

  }

  // ==========================================
  // ERROR SCREEN
  // ==========================================

  if (error) {

    return (

      <div className="
        min-h-screen
        bg-[#F3EBDD]
        flex
        items-center
        justify-center
        px-6
      ">

        <div className="text-center">

          <p className="text-red-600">
            {error}
          </p>

          <button
            onClick={fetchMenu}
            className="
              mt-5
              bg-[#3F4A36]
              text-white
              px-6
              py-3
              rounded-md
              hover:bg-[#2C211B]
              transition
            "
          >

            Try Again

          </button>

        </div>

      </div>

    );

  }

  // ==========================================
  // MAIN MENU PAGE
  // ==========================================

  return (

    <div className="
      bg-[#F3EBDD]
      min-h-screen
      py-16
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* ==========================================
            PAGE HEADING
        ========================================== */}

        <div className="
          text-center
          mb-10
        ">

          <p className="
            text-[#C9A45C]
            uppercase
            tracking-[4px]
            text-sm
          ">

            Our Menu

          </p>

          <h1 className="
            font-serif
            text-5xl
            md:text-6xl
            text-[#2C211B]
            mt-3
          ">

            Discover Our Dishes

          </h1>

          <p className="
            text-[#6B7355]
            mt-4
          ">

            Fresh ingredients and carefully prepared dishes.

          </p>

        </div>


        {/* ==========================================
            CATEGORY FILTER
        ========================================== */}

        <div className="
          flex
          flex-wrap
          justify-center
          gap-3
          mb-12
        ">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                handleCategoryClick(category)
              }
              className={`
                px-5
                py-2.5
                rounded-full
                border
                transition
                font-medium

                ${selectedCategory === category

                  ? "bg-[#3F4A36] text-white border-[#3F4A36]"

                  : "bg-white text-[#2C211B] border-[#C9A45C] hover:bg-[#C9A45C] hover:text-white"
                }
              `}
            >

              {category}

            </button>

          ))}

        </div>


        {/* ==========================================
            SELECTED CATEGORY TITLE
        ========================================== */}

        <div className="
          text-center
          mb-8
        ">

          <p className="
            text-[#C9A45C]
            uppercase
            tracking-[3px]
            text-sm
          ">

            {selectedCategory === "All"
              ? "Our Complete Collection"
              : "Explore Our Selection"}

          </p>

          <h2 className="
            font-serif
            text-3xl
            md:text-4xl
            text-[#2C211B]
            mt-2
          ">

            {selectedCategory === "All"
              ? "All Dishes"
              : `${selectedCategory} Cuisine`}

          </h2>

        </div>


        {/* ==========================================
            NO ITEMS
        ========================================== */}

        {filteredItems.length === 0 ? (

          <div className="
            bg-white
            rounded-xl
            p-10
            text-center
          ">

            <p className="
              text-[#6B7355]
              text-lg
            ">

              No{" "}

              {selectedCategory === "All"
                ? ""
                : selectedCategory + " "}

              menu items available.

            </p>

          </div>

        ) : (

          /* ==========================================
             MENU CARDS
          ========================================== */

          <div className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
          ">

            {filteredItems.map((item) => (

              <div
                key={item._id}
                className="
                  bg-white
                  rounded-xl
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  transition
                  duration-300
                "
              >

                {/* ==========================================
                    FOOD IMAGE
                ========================================== */}

                <div className="relative">

                  <img
                    src={
                      item.images?.[0] ||
                      "https://images.unsplash.com/photo-1547592180-85f173990554"
                    }
                    alt={item.name}
                    className="
                      w-full
                      h-64
                      object-cover
                    "
                  />

                  {/* AVAILABLE BADGE */}

                  <div className="
                    absolute
                    top-4
                    left-4
                  ">

                    {item.isAvailable ? (

                      <span className="
                        bg-[#3F4A36]
                        text-white
                        text-xs
                        px-3
                        py-1.5
                        rounded-full
                      ">

                        Available

                      </span>

                    ) : (

                      <span className="
                        bg-red-600
                        text-white
                        text-xs
                        px-3
                        py-1.5
                        rounded-full
                      ">

                        Currently Unavailable

                      </span>

                    )}

                  </div>

                </div>


                {/* ==========================================
                    FOOD INFORMATION
                ========================================== */}

                <div className="p-6">

                  {/* NAME + PRICE */}

                  <div className="
                    flex
                    justify-between
                    items-start
                    gap-4
                  ">

                    <h2 className="
                      font-serif
                      text-2xl
                      text-[#2C211B]
                    ">

                      {item.name}

                    </h2>


                    <div className="
                      text-right
                      whitespace-nowrap
                    ">

                      {item.discountPrice ? (

                        <>

                          <span className="
                            text-gray-400
                            line-through
                            text-sm
                            mr-2
                          ">

                            ₹{item.price}

                          </span>

                          <span className="
                            text-[#C9A45C]
                            font-semibold
                          ">

                            ₹{item.discountPrice}

                          </span>

                        </>

                      ) : (

                        <span className="
                          text-[#C9A45C]
                          font-semibold
                        ">

                          ₹{item.price}

                        </span>

                      )}

                    </div>

                  </div>


                  {/* CATEGORY */}

                  <p className="
                    text-[#C9A45C]
                    text-sm
                    mt-2
                    font-medium
                  ">

                    {item.category}

                  </p>


                  {/* DESCRIPTION */}

                  <p className="
                    text-[#6B7355]
                    mt-3
                    line-clamp-2
                  ">

                    {item.description ||
                      "Delicious dish prepared by our chef."}

                  </p>


                  {/* RATING */}

                  {item.rating > 0 && (

                    <div className="
                      flex
                      items-center
                      gap-2
                      mt-4
                    ">

                      <span className="
                        text-[#C9A45C]
                      ">

                        ★

                      </span>

                      <span className="
                        text-[#2C211B]
                        text-sm
                        font-medium
                      ">

                        {item.rating}

                      </span>

                      <span className="
                        text-[#6B7355]
                        text-sm
                      ">

                        ({item.numReviews || 0} reviews)

                      </span>

                    </div>

                  )}


                  {/* ==========================================
                      BUTTONS
                  ========================================== */}

                  <div className="
                    flex
                    gap-3
                    mt-6
                  ">

                    {/* DETAILS BUTTON */}

                    <button
                      onClick={() =>
                        handleDetails(item)
                      }
                      className="
                        flex-1
                        text-center
                        border
                        border-[#C9A45C]
                        text-[#2C211B]
                        px-4
                        py-3
                        rounded-md
                        hover:bg-[#C9A45C]
                        hover:text-white
                        transition
                      "
                    >

                      Details

                    </button>


                    {/* ADD TO CART */}

                    <button
                      onClick={() =>
                        handleAddToCart(item)
                      }
                      disabled={!item.isAvailable}
                      className={`
                        flex-1
                        px-4
                        py-3
                        rounded-md
                        transition

                        ${item.isAvailable

                          ? "bg-[#3F4A36] text-white hover:bg-[#2C211B]"

                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                      `}
                    >

                      {item.isAvailable
                        ? "Add to Cart"
                        : "Unavailable"}

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =====================================================
          PRODUCT DETAIL MODAL
      ===================================================== */}

      {selectedItem && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/60
            flex
            items-center
            justify-center
            p-4
            overflow-y-auto
          "
          onClick={closeDetails}
        >

          <div
            className="
              bg-white
              rounded-2xl
              max-w-5xl
              w-full
              max-h-[92vh]
              overflow-y-auto
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ==========================================
                CLOSE BUTTON
            ========================================== */}

            <div className="
              flex
              justify-end
              p-4
            ">

              <button
                onClick={closeDetails}
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#F3EBDD]
                  text-[#2C211B]
                  text-xl
                  hover:bg-[#E8DDC9]
                  transition
                "
              >

                ✕

              </button>

            </div>


            {/* ==========================================
                PRODUCT MAIN DETAILS
            ========================================== */}

            <div className="
              grid
              md:grid-cols-2
              gap-8
              px-6
              pb-8
            ">

              {/* IMAGE */}

              <div>

                <div className="
                  rounded-2xl
                  overflow-hidden
                  bg-[#F3EBDD]
                ">

                  <img
                    src={
                      selectedItem.images?.[0] ||
                      "https://images.unsplash.com/photo-1547592180-85f173990554"
                    }
                    alt={selectedItem.name}
                    className="
                      w-full
                      h-[300px]
                      sm:h-[400px]
                      object-cover
                    "
                  />

                </div>

              </div>


              {/* DETAILS */}

              <div className="
                flex
                flex-col
                justify-center
              ">

                <p className="
                  text-[#C9A45C]
                  uppercase
                  tracking-[4px]
                  text-sm
                  font-semibold
                ">

                  Our Special

                </p>


                <h2 className="
                  font-serif
                  text-4xl
                  sm:text-5xl
                  text-[#2C211B]
                  mt-3
                ">

                  {selectedItem.name}

                </h2>


                {/* CATEGORY */}

                <p className="
                  text-[#C9A45C]
                  mt-3
                  font-medium
                ">

                  {selectedItem.category}

                </p>


                {/* PRICE */}

                <div className="
                  mt-6
                  text-3xl
                  font-bold
                  text-[#C9A45C]
                ">

                  {selectedItem.discountPrice ? (

                    <>

                      <span className="
                        text-gray-400
                        line-through
                        text-xl
                        mr-3
                      ">

                        ₹{selectedItem.price}

                      </span>

                      ₹{selectedItem.discountPrice}

                    </>

                  ) : (

                    `₹${selectedItem.price}`

                  )}

                </div>


                {/* DESCRIPTION */}

                <p className="
                  text-[#6B7355]
                  mt-6
                  leading-7
                ">

                  {selectedItem.description ||
                    "A delicious dish carefully prepared by our chef."}

                </p>


                {/* RATING */}

                <div className="
                  flex
                  items-center
                  gap-3
                  mt-6
                ">

                  <span className="
                    text-[#C9A45C]
                    text-xl
                  ">

                    ★

                  </span>

                  <span className="
                    font-semibold
                    text-[#2C211B]
                  ">

                    {selectedItem.rating || 0}

                  </span>

                  <span className="
                    text-[#6B7355]
                  ">

                    ({selectedItem.numReviews || 0} reviews)

                  </span>

                </div>


                {/* ADD TO CART */}

                <button
                  onClick={() =>
                    handleAddToCart(selectedItem)
                  }
                  disabled={!selectedItem.isAvailable}
                  className={`
                    mt-7
                    w-full
                    sm:w-fit
                    px-8
                    py-3.5
                    rounded-lg
                    font-semibold
                    transition

                    ${selectedItem.isAvailable

                      ? "bg-[#3F4A36] text-white hover:bg-[#2C211B]"

                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >

                  {selectedItem.isAvailable
                    ? "Add to Cart"
                    : "Currently Unavailable"}

                </button>

              </div>

            </div>


            {/* =================================================
                REVIEWS SECTION
            ================================================= */}

            <div className="
              border-t
              border-[#E8DDC9]
              px-6
              py-8
            ">

              <h3 className="
                font-serif
                text-3xl
                text-[#2C211B]
              ">

                Customer Reviews

              </h3>


              {detailLoading ? (

                <p className="
                  text-[#6B7355]
                  mt-5
                ">

                  Loading reviews...

                </p>

              ) : reviews.length === 0 ? (

                <div className="
                  bg-[#F3EBDD]
                  rounded-xl
                  p-6
                  mt-5
                  text-center
                ">

                  <div className="text-4xl">
                    ⭐
                  </div>

                  <p className="
                    text-[#2C211B]
                    font-semibold
                    mt-2
                  ">

                    No reviews yet

                  </p>

                  <p className="
                    text-[#6B7355]
                    text-sm
                    mt-1
                  ">

                    Be the first customer to review this dish.

                  </p>

                </div>

              ) : (

                <div className="
                  grid
                  md:grid-cols-2
                  gap-4
                  mt-5
                ">

                  {reviews.map((review) => (

                    <div
                      key={review._id}
                      className="
                        bg-[#F9F5ED]
                        rounded-xl
                        p-5
                        border
                        border-[#E8DDC9]
                      "
                    >

                      <div className="
                        flex
                        justify-between
                        gap-3
                      ">

                        <div>

                          <p className="
                            font-semibold
                            text-[#2C211B]
                          ">

                            {review.user?.name ||
                              "Customer"}

                          </p>

                          <p className="
                            text-xs
                            text-[#6B7355]
                            mt-1
                          ">

                            {review.createdAt
                              ? new Date(
                                review.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                              : ""}

                          </p>

                        </div>

                        <span className="
                          text-[#C9A45C]
                          font-semibold
                        ">

                          ⭐ {review.rating}

                        </span>

                      </div>


                      <p className="
                        text-[#6B7355]
                        mt-4
                        leading-6
                      ">

                        {review.comment ||
                          "No comment provided."}

                      </p>


                      {/* ADMIN RESPONSE */}

                      {review.response?.text && (

                        <div className="
                          mt-4
                          bg-white
                          rounded-lg
                          p-4
                          border-l-4
                          border-[#C9A45C]
                        ">

                          <p className="
                            text-xs
                            uppercase
                            tracking-wider
                            text-[#C9A45C]
                            font-bold
                          ">

                            Restaurant Response

                          </p>

                          <p className="
                            text-sm
                            text-[#6B7355]
                            mt-1
                          ">

                            {review.response.text}

                          </p>

                        </div>

                      )}

                    </div>

                  ))}

                </div>

              )}

              
              {/* =================================================
    WRITE A REVIEW
================================================= */}

              <ReviewForm
                menuItemId={selectedItem._id}
                onReviewSubmitted={(newReview) => {

                  // New review ko immediately screen par show karo
                  setReviews((previousReviews) => [
                    newReview,
                    ...previousReviews,
                  ]);

                  // Rating/count bhi update karo
                  setSelectedItem((previousItem) => ({
                    ...previousItem,

                    rating: newReview.rating,

                    numReviews:
                      Number(previousItem.numReviews || 0) + 1,
                  }));

                }}
              />


            </div>


            {/* =================================================
                RECOMMENDATIONS
            ================================================= */}

            {recommendations.length > 0 && (

              <div className="
                border-t
                border-[#E8DDC9]
                px-6
                py-8
              ">

                <h3 className="
                  font-serif
                  text-3xl
                  text-[#2C211B]
                ">

                  You May Also Like

                </h3>


                <div className="
                  grid
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-5
                  mt-6
                ">

                  {recommendations.map((recommendation) => (

                    <div
                      key={recommendation._id}
                      className="
                        bg-[#F9F5ED]
                        rounded-xl
                        overflow-hidden
                        border
                        border-[#E8DDC9]
                      "
                    >

                      <img
                        src={
                          recommendation.images?.[0] ||
                          "https://images.unsplash.com/photo-1547592180-85f173990554"
                        }
                        alt={recommendation.name}
                        className="
                          w-full
                          h-40
                          object-cover
                        "
                      />

                      <div className="p-4">

                        <h4 className="
                          font-serif
                          text-xl
                          text-[#2C211B]
                        ">

                          {recommendation.name}

                        </h4>

                        <p className="
                          text-[#C9A45C]
                          font-semibold
                          mt-2
                        ">

                          ₹
                          {recommendation.discountPrice ||
                            recommendation.price}

                        </p>

                        <button
                          onClick={() => {

                            closeDetails();

                            setTimeout(() => {
                              handleDetails(
                                recommendation
                              );
                            }, 100);

                          }}
                          className="
                            mt-4
                            w-full
                            border
                            border-[#C9A45C]
                            text-[#2C211B]
                            py-2
                            rounded-md
                            hover:bg-[#C9A45C]
                            hover:text-white
                            transition
                          "
                        >

                          View Details

                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}

export default Menu;