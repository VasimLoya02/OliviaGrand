
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function Cart() {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalAmount,
  } = useCart();

  const navigate = useNavigate();

  // ==========================================
  // PAYMENT METHOD
  // ==========================================

  const [paymentMethod, setPaymentMethod] = useState("cash");


  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {

    return (
      <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center px-4">

        <div className="bg-white rounded-2xl p-8 sm:p-10 text-center shadow-sm max-w-md w-full">

          <div className="text-6xl mb-5">
            🛒
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#2C211B]">
            Your Cart is Empty
          </h1>

          <p className="text-[#6B7355] mt-3">
            Add some delicious food to your cart.
          </p>

          <Link
            to="/menu"
            className="inline-block mt-7 bg-[#3F4A36] text-white px-7 py-3 rounded-md hover:bg-[#2C211B] transition"
          >
            Browse Menu
          </Link>

        </div>

      </div>
    );

  }


  // ==========================================
  // PROCEED TO CHECKOUT
  // ==========================================

  const handleCheckout = () => {

    navigate("/checkout", {
      state: {
        paymentMethod: paymentMethod
      }
    });

  };


  // ==========================================
  // CART
  // ==========================================

  return (

    <div className="min-h-screen bg-[#F3EBDD] py-12 sm:py-16 lg:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* ==========================================
            TITLE
        ========================================== */}

        <div className="text-center mb-10 sm:mb-12">

          <p className="text-[#C9A45C] uppercase tracking-[4px] text-xs sm:text-sm">
            Your Order
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#2C211B] mt-3">
            Your Cart
          </h1>

          <p className="text-[#6B7355] mt-3">
            Review your selected dishes before checkout.
          </p>

        </div>


        {/* ==========================================
            MAIN GRID
        ========================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">


          {/* ==========================================
              CART ITEMS
          ========================================== */}

          <div className="lg:col-span-2 space-y-5">

            {cartItems.map((item) => (

              <div
                key={item.menuItem}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm"
              >

                <div className="flex flex-col sm:flex-row gap-5">


                  {/* ==========================================
                      PRODUCT IMAGE
                  ========================================== */}

                  <div className="w-full sm:w-40 md:w-44 h-48 sm:h-40 md:h-44 flex-shrink-0 bg-[#F3EBDD] rounded-xl overflow-hidden flex items-center justify-center">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />

                    ) : (

                      <div className="text-center text-[#6B7355]">

                        <div className="text-4xl">
                          🍽️
                        </div>

                        <p className="text-sm mt-2">
                          No Image
                        </p>

                      </div>

                    )}

                  </div>


                  {/* ==========================================
                      PRODUCT DETAILS
                  ========================================== */}

                  <div className="flex-1 min-w-0 flex flex-col justify-between">

                    <div>

                      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">


                        {/* PRODUCT NAME */}

                        <div className="min-w-0">

                          <h2 className="font-serif text-2xl sm:text-3xl text-[#2C211B] leading-tight break-words">
                            {item.name}
                          </h2>

                          {item.category && (

                            <p className="text-sm text-[#6B7355] mt-1">
                              {item.category}
                            </p>

                          )}

                        </div>


                        {/* PRICE */}

                        <div className="text-left sm:text-right flex-shrink-0">

                          <p className="font-semibold text-[#2C211B] whitespace-nowrap">
                            ₹{Number(item.price) * item.quantity}
                          </p>

                          <p className="text-sm text-[#C9A45C] mt-1 whitespace-nowrap">
                            ₹{item.price} each
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* ==========================================
                        BOTTOM CONTROLS
                    ========================================== */}

                    <div className="flex items-center justify-between mt-6">


                      {/* QUANTITY */}

                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.menuItem)
                          }
                          className="w-10 h-10 border border-[#D9CCB7] rounded-lg text-lg text-[#2C211B] hover:bg-[#F3EBDD] transition"
                        >
                          −
                        </button>

                        <span className="w-6 text-center font-medium text-[#2C211B]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.menuItem)
                          }
                          className="w-10 h-10 border border-[#D9CCB7] rounded-lg text-lg text-[#2C211B] hover:bg-[#F3EBDD] transition"
                        >
                          +
                        </button>

                      </div>


                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.menuItem)
                        }
                        className="text-red-500 text-sm hover:text-red-700 transition"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* ==========================================
              ORDER SUMMARY
          ========================================== */}

          <div className="lg:col-span-1">

            <div
              className="
                bg-white
                rounded-2xl
                p-6
                sm:p-7
                shadow-sm
                lg:sticky
                lg:top-24
              "
            >

              <h2 className="font-serif text-3xl text-[#2C211B]">
                Order Summary
              </h2>


              {/* ==========================================
                  ITEMS
              ========================================== */}

              <div className="border-t border-[#E8DDC9] mt-6 pt-5">

                <div className="flex justify-between text-[#6B7355]">

                  <span>
                    Items
                  </span>

                  <span>
                    {cartItems.reduce(
                      (total, item) =>
                        total + Number(item.quantity),
                      0
                    )}
                  </span>

                </div>


                <div className="flex justify-between mt-4">

                  <span className="font-semibold text-[#2C211B]">
                    Total
                  </span>

                  <span className="font-semibold text-xl text-[#C9A45C]">
                    ₹{totalAmount}
                  </span>

                </div>

              </div>


              {/* ==========================================
                  PAYMENT METHOD
              ========================================== */}

              <div className="mt-7">

                <h3 className="font-semibold text-[#2C211B] mb-4">
                  Payment Method
                </h3>


                <div className="space-y-3">


                  {/* ONLINE PAYMENT */}

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`
                      w-full
                      text-left
                      p-4
                      rounded-xl
                      border-2
                      transition
                      ${
                        paymentMethod === "online"
                          ? "border-[#C9A45C] bg-[#F8F1E5]"
                          : "border-[#E8DDC9] bg-white hover:border-[#C9A45C]"
                      }
                    `}
                  >

                    <div className="flex items-center gap-3">

                      <div className="text-2xl">
                        🌐
                      </div>

                      <div className="flex-1">

                        <p className="font-semibold text-[#2C211B]">
                          Online Payment
                        </p>

                        <p className="text-xs text-[#6B7355] mt-1">
                          Pay using UPI / Online
                        </p>

                      </div>


                      <div
                        className={`
                          w-5
                          h-5
                          rounded-full
                          border-2
                          flex
                          items-center
                          justify-center
                          ${
                            paymentMethod === "online"
                              ? "border-[#C9A45C]"
                              : "border-[#D9CCB7]"
                          }
                        `}
                      >

                        {paymentMethod === "online" && (

                          <div className="w-2.5 h-2.5 bg-[#C9A45C] rounded-full"></div>

                        )}

                      </div>

                    </div>

                  </button>


                 


                  {/* CASH ON DELIVERY */}

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`
                      w-full
                      text-left
                      p-4
                      rounded-xl
                      border-2
                      transition
                      ${
                        paymentMethod === "cash"
                          ? "border-[#C9A45C] bg-[#F8F1E5]"
                          : "border-[#E8DDC9] bg-white hover:border-[#C9A45C]"
                      }
                    `}
                  >

                    <div className="flex items-center gap-3">

                      <div className="text-2xl">
                        💵
                      </div>

                      <div className="flex-1">

                        <p className="font-semibold text-[#2C211B]">
                          Cash on Delivery
                        </p>

                        <p className="text-xs text-[#6B7355] mt-1">
                          Pay when your order arrives
                        </p>

                      </div>


                      <div
                        className={`
                          w-5
                          h-5
                          rounded-full
                          border-2
                          flex
                          items-center
                          justify-center
                          ${
                            paymentMethod === "cash"
                              ? "border-[#C9A45C]"
                              : "border-[#D9CCB7]"
                          }
                        `}
                      >

                        {paymentMethod === "cash" && (

                          <div className="w-2.5 h-2.5 bg-[#C9A45C] rounded-full"></div>

                        )}

                      </div>

                    </div>

                  </button>

                </div>

              </div>


              {/* ==========================================
                  SELECTED PAYMENT
              ========================================== */}

              <div className="mt-5 bg-[#F3EBDD] rounded-xl px-4 py-3">

                <div className="flex justify-between items-center">

                  <span className="text-sm text-[#6B7355]">
                    Selected Payment
                  </span>

                  <span className="text-sm font-semibold text-[#3F4A36]">

                    {paymentMethod === "online" && "Online Payment"}

                    {paymentMethod === "card" && "Card Payment"}

                    {paymentMethod === "cash" && "Cash on Delivery"}

                  </span>

                </div>

              </div>


              {/* ==========================================
                  CHECKOUT
              ========================================== */}

              <button
                type="button"
                onClick={handleCheckout}
                className="
                  block
                  w-full
                  text-center
                  mt-7
                  bg-[#3F4A36]
                  text-white
                  py-3.5
                  rounded-lg
                  hover:bg-[#2C211B]
                  transition
                "
              >
                Proceed to Checkout
              </button>


              {/* ==========================================
                  CONTINUE SHOPPING
              ========================================== */}

              <Link
                to="/menu"
                className="
                  block
                  w-full
                  text-center
                  mt-3
                  border
                  border-[#D9CCB7]
                  text-[#3F4A36]
                  py-3.5
                  rounded-lg
                  hover:bg-[#F3EBDD]
                  transition
                "
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Cart;

