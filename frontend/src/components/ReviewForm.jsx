import { useState } from "react";
import api from "../services/api";

function ReviewForm({ menuItemId, onReviewSubmitted }) {

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    if (rating === 0) {
      setMessage("Please select a rating.");
      return;
    }

    try {

      setSubmitting(true);

      const response = await api.post("/reviews", {
        menuItemId,
        rating,
        comment,
      });

      if (response.data?.success) {

        setMessage("Review submitted successfully! ⭐");

        setRating(0);
        setHoverRating(0);
        setComment("");

        // Refresh reviews in product detail
        if (onReviewSubmitted) {
          onReviewSubmitted(response.data.data);
        }

      }

    } catch (error) {

      console.error("Review submit error:", error);

      setMessage(
        error.response?.data?.message ||
        "Unable to submit review. Please login first."
      );

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <div className="
      mt-8
      bg-[#F9F5ED]
      border
      border-[#E8DDC9]
      rounded-2xl
      p-6
    ">

      <h3 className="
        font-serif
        text-2xl
        text-[#2C211B]
      ">
        Write a Review
      </h3>

      <p className="
        text-sm
        text-[#6B7355]
        mt-1
      ">
        How was your experience with this dish?
      </p>


      {/* ==========================================
          STAR RATING
      ========================================== */}

      <div className="mt-5">

        <p className="
          text-sm
          font-semibold
          text-[#2C211B]
          mb-2
        ">
          Your Rating
        </p>

        <div className="flex gap-2">

          {[1, 2, 3, 4, 5].map((star) => (

            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="
                text-4xl
                transition
                hover:scale-110
              "
              aria-label={`Rate ${star} stars`}
            >

              <span
                className={
                  star <= (hoverRating || rating)
                    ? "text-[#C9A45C]"
                    : "text-gray-300"
                }
              >
                ★
              </span>

            </button>

          ))}

        </div>

        {rating > 0 && (

          <p className="
            text-sm
            text-[#6B7355]
            mt-1
          ">
            You selected {rating} out of 5 stars.
          </p>

        )}

      </div>


      {/* ==========================================
          COMMENT
      ========================================== */}

      <div className="mt-5">

        <label className="
          block
          text-sm
          font-semibold
          text-[#2C211B]
          mb-2
        ">
          Your Review
        </label>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience..."
          rows="4"
          className="
            w-full
            border
            border-[#D8CCB8]
            rounded-xl
            px-4
            py-3
            bg-white
            text-[#2C211B]
            outline-none
            focus:border-[#C9A45C]
            resize-none
          "
        />

      </div>


      {/* ==========================================
          MESSAGE
      ========================================== */}

      {message && (

        <div className="
          mt-4
          text-sm
          text-[#3F4A36]
          bg-white
          border
          border-[#E8DDC9]
          rounded-lg
          px-4
          py-3
        ">
          {message}
        </div>

      )}


      {/* ==========================================
          SUBMIT
      ========================================== */}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="
          mt-5
          w-full
          sm:w-auto
          bg-[#3F4A36]
          text-white
          px-7
          py-3
          rounded-lg
          font-semibold
          hover:bg-[#2C211B]
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >

        {submitting
          ? "Submitting..."
          : "Submit Review"}

      </button>

    </div>

  );
}

export default ReviewForm;

