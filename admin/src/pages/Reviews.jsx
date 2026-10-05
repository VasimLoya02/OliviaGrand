import { useEffect, useState } from "react";
import api from "../services/api";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/admin/reviews"
      );

      setReviews(
        response.data.data || []
      );

    } catch (error) {
      console.error(
        "Reviews error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to load reviews"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + Number(review.rating || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-[#F3EBDD] p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">

          <div>

            <p className="text-[#C9A45C] text-xs uppercase tracking-[3px] font-bold">
              Customer Feedback
            </p>

            <h1 className="text-4xl sm:text-5xl font-serif text-[#2C211B] mt-2">
              Reviews
            </h1>

            <p className="text-[#6B7355] mt-2">
              Monitor customer feedback and ratings.
            </p>

          </div>

          <div className="bg-white rounded-2xl px-7 py-5 border border-[#E8DDC9]">

            <p className="text-sm text-[#6B7355]">
              Average Rating
            </p>

            <p className="text-3xl font-bold text-[#C9A45C] mt-1">
              ⭐ {averageRating}
            </p>

          </div>

        </div>


        {/* REVIEWS */}

        {loading ? (

          <div className="bg-white rounded-2xl p-12 text-center">
            Loading reviews...
          </div>

        ) : reviews.length === 0 ? (

          <div className="bg-white rounded-2xl p-14 text-center border border-[#E8DDC9]">

            <div className="text-6xl">
              ⭐
            </div>

            <h2 className="font-serif text-3xl text-[#2C211B] mt-5">
              No Reviews Yet
            </h2>

            <p className="text-[#6B7355] mt-2">
              Customer reviews will appear here.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {reviews.map((review) => (

              <div
                key={review._id}
                className="
                  bg-white
                  rounded-2xl
                  p-6
                  border
                  border-[#E8DDC9]
                  shadow-sm
                  hover:-translate-y-1
                  transition
                "
              >

                <div className="flex justify-between items-start">

                  <div className="flex items-center gap-3">

                    <div className="
                      w-11
                      h-11
                      rounded-full
                      bg-[#C9A45C]
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-[#2C211B]
                    ">
                      {(
                        review.user?.name ||
                        review.name ||
                        "C"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <p className="font-semibold text-[#2C211B]">
                        {review.user?.name ||
                          review.name ||
                          "Customer"}
                      </p>

                      <p className="text-xs text-[#6B7355]">
                        Customer
                      </p>

                    </div>

                  </div>

                  <span className="text-[#C9A45C] font-bold">
                    ⭐ {review.rating || 0}
                  </span>

                </div>


                <p className="
                  text-[#6B7355]
                  mt-5
                  leading-7
                ">
                  {review.comment ||
                    review.review ||
                    "No comment provided."}
                </p>


                <div className="
                  mt-5
                  pt-4
                  border-t
                  border-[#E8DDC9]
                  text-xs
                  text-[#6B7355]
                ">
                  {review.createdAt
                    ? new Date(
                        review.createdAt
                      ).toLocaleDateString()
                    : ""}
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Reviews;