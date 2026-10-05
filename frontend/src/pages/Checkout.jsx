import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import api from "../services/api";

function Checkout() {

  const navigate = useNavigate();

  const {
    cartItems,
    totalAmount,
    clearCart,
  } = useCart();


  // ==========================================
  // CUSTOMER FORM
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });


  // ==========================================
  // PAYMENT METHOD
  // ==========================================

  const [paymentMethod, setPaymentMethod] =
    useState("cash");


  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // DUMMY ONLINE PAYMENT
  // ==========================================

  const [onlinePaymentDone, setOnlinePaymentDone] =
    useState(false);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData((previousData) => ({

      ...previousData,

      [name]: value,

    }));

  };


  // ==========================================
  // HANDLE PAYMENT CHANGE
  // ==========================================

  const handlePaymentChange = (method) => {

    setPaymentMethod(method);

    setOnlinePaymentDone(false);

  };


  // ==========================================
  // DUMMY ONLINE PAYMENT
  // ==========================================

  const handleDummyOnlinePayment = () => {

    setOnlinePaymentDone(true);

    alert(
      "Demo payment successful. You can now place your order."
    );

  };


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();


    // ==========================================
    // CART CHECK
    // ==========================================

    if (cartItems.length === 0) {

      alert("Your cart is empty.");

      return;

    }


    // ==========================================
    // ONLINE PAYMENT CHECK
    // ==========================================

    if (
      paymentMethod === "online" &&
      !onlinePaymentDone
    ) {

      alert(
        "Please complete the dummy online payment first."
      );

      return;

    }


    try {

      setLoading(true);


      // ==========================================
      // CONVERT CART
      // ==========================================

      const orderItems =
        cartItems.map((item) => ({

          menuItemId:
            item.menuItem,

          quantity:
            Number(item.quantity),

        }));


      // ==========================================
      // ORDER DATA
      // ==========================================

      const orderData = {

        items:
          orderItems,

        orderType:
          "delivery",

        deliveryAddress: {

          line1:
            formData.address,

          city:
            "Gujarat",

        },


        // ==========================================
        // PAYMENT METHOD
        // ==========================================

        paymentMethod:paymentMethod,

      };


      console.log(
        "Sending Order:",
        orderData
      );


      // ==========================================
      // API
      // ==========================================

      const response =
        await api.post(
          "/orders",
          orderData
        );


      console.log(
        "Order Response:",
        response.data
      );


      // ==========================================
      // SUCCESS
      // ==========================================

      if (
        response.data.success
      ) {

        alert(
          "Order placed successfully!"
        );


        // ==========================================
        // CLEAR CART
        // ==========================================

        clearCart();


        // ==========================================
        // GO TO ORDERS
        // ==========================================

        navigate("/orders");

      } else {

        alert(
          response.data.message ||
          "Order could not be placed."
        );

      }

    } catch (error) {

      console.error(
        "Order Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Unable to place order. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {

    return (

      <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center">

        <div className="text-center">

          <h1 className="font-serif text-4xl text-[#2C211B]">

            Cart is Empty

          </h1>


          <Link
            to="/menu"
            className="inline-block mt-5 bg-[#3F4A36] text-white px-6 py-3 rounded-md"
          >

            Go to Menu

          </Link>

        </div>

      </div>

    );

  }


  // ==========================================
  // CHECKOUT PAGE
  // ==========================================

  return (

    <div className="bg-[#F3EBDD] min-h-screen py-10 sm:py-16">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">


        {/* ==========================================
            TITLE
        ========================================== */}

        <div className="text-center mb-10">

          <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm">

            Complete Your Order

          </p>


          <h1 className="font-serif text-4xl sm:text-5xl text-[#2C211B] mt-3">

            Checkout

          </h1>

        </div>


        <div className="grid lg:grid-cols-2 gap-8">


          {/* ==========================================
              LEFT SIDE
          ========================================== */}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm"
          >






            {/* ==========================================
                PAYMENT METHODS
            ========================================== */}

            <div className="mt-8">

              <h3 className="font-serif text-2xl text-[#2C211B]">
                Payment Method
              </h3>

              <div className="mt-5 space-y-3">

                {/* CASH ON DELIVERY */}

                <label className="flex items-center gap-3 border border-[#E8DDC9] rounded-lg p-4 cursor-pointer hover:bg-[#F3EBDD]">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <div>
                    <p className="font-semibold text-[#2C211B]">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-[#6B7355]">
                      Pay when your order arrives
                    </p>
                  </div>

                </label>


                


                {/* ONLINE PAYMENT */}

                <label className="flex items-center gap-3 border border-[#E8DDC9] rounded-lg p-4 cursor-pointer hover:bg-[#F3EBDD]">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <div>
                    <p className="font-semibold text-[#2C211B]">
                      Online Payment
                    </p>

                    <p className="text-sm text-[#6B7355]">
                      Pay online using UPI / QR
                    </p>
                  </div>

                </label>

              </div>

            </div>


            {/* ==========================================
                DUMMY ONLINE PAYMENT
            ========================================== */}

            {paymentMethod === "online" && (

              <div className="mt-6 bg-[#F9F4EA] border border-[#E8DDC9] rounded-2xl p-6 text-center">

                <h3 className="font-serif text-2xl text-[#2C211B]">

                  Scan & Pay

                </h3>


                <p className="text-sm text-[#6B7355] mt-2">

                  Scan this demo QR code to continue.

                </p>


                {/* DUMMY QR */}

                <div className="mt-5 bg-white w-48 h-48 mx-auto rounded-xl flex items-center justify-center border border-[#D9CCB7]">

                  <div className="text-center">

                    <div className="text-7xl">

                      ▦

                    </div>

                    <p className="text-xs text-[#6B7355] mt-2">

                      DEMO QR

                    </p>

                  </div>

                </div>


                <p className="font-semibold text-[#2C211B] mt-5">

                  Amount: ₹{totalAmount}

                </p>


                {!onlinePaymentDone ? (

                  <button
                    type="button"
                    onClick={handleDummyOnlinePayment}
                    className="mt-5 bg-[#C9A45C] text-[#2C211B] px-6 py-3 rounded-lg font-semibold hover:bg-[#B58F48] transition"
                  >

                    Simulate Payment

                  </button>

                ) : (

                  <div className="mt-5 bg-green-100 text-green-700 px-4 py-3 rounded-lg font-semibold">

                    ✓ Demo Payment Successful

                  </div>

                )}

              </div>

            )}


            {/* ==========================================
                PLACE ORDER
            ========================================== */}

            <button
              type="submit"
              disabled={
                loading ||
                (
                  paymentMethod === "online" &&
                  !onlinePaymentDone
                )
              }
              className="w-full mt-7 bg-[#3F4A36] text-white py-3.5 rounded-lg hover:bg-[#2C211B] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {loading
                ? "Placing Order..."
                : "Place Order"}

            </button>

          </form>


          {/* ==========================================
              RIGHT SIDE
          ========================================== */}

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm h-fit">


            {/* ==========================================
                ORDER SUMMARY
            ========================================== */}

            <h2 className="font-serif text-3xl text-[#2C211B]">

              Order Summary

            </h2>


            <div className="mt-6 space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item.menuItem}
                  className="flex justify-between gap-4 border-b border-[#E8DDC9] pb-4"
                >

                  <div>

                    <p className="text-[#2C211B] font-medium">

                      {item.name}

                    </p>

                    <p className="text-sm text-[#6B7355]">

                      ₹{item.price} × {item.quantity}

                    </p>

                  </div>


                  <span className="font-semibold">

                    ₹
                    {Number(item.price) *
                      item.quantity}

                  </span>

                </div>

              ))}

            </div>


            {/* ==========================================
                TOTAL
            ========================================== */}

            <div className="border-t border-[#E8DDC9] mt-6 pt-6">

              <div className="flex justify-between">

                <span className="text-[#6B7355]">

                  Subtotal

                </span>

                <span>

                  ₹{totalAmount}

                </span>

              </div>


              <div className="flex justify-between mt-3">

                <span className="text-[#6B7355]">

                  Payment

                </span>

                <span className="font-semibold">

                  {paymentMethod === "cash" &&
                    "Cash on Delivery"}

                  {paymentMethod === "card" &&
                    "Card Payment"}

                  {paymentMethod === "online" &&
                    "Online Payment"}

                </span>

              </div>


              <div className="flex justify-between mt-5 text-xl">

                <span className="font-semibold">

                  Total

                </span>

                <span className="text-[#C9A45C] font-semibold">

                  ₹{totalAmount}

                </span>

              </div>

            </div>


            {/* ORDER TYPE */}

            <p className="text-sm text-[#6B7355] mt-5">

              Order Type: Delivery

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Checkout;