import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // FETCH LOGGED-IN USER ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/orders");

      console.log("My Orders API Response:", response.data);

      // Backend response:
      // {
      //   success: true,
      //   count: 12,
      //   data: [...]
      // }

      setOrders(response.data.data || []);

    } catch (error) {
      console.error("Orders error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load your orders."
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOAD ORDERS
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, []);


  // ==========================================
// PAYMENT METHOD
// ==========================================

const getPaymentMethod = (method) => {

  if (!method) {
    return "Not selected";
  }

  const value = method.toLowerCase();

  if (
    value === "cod" ||
    value === "cash" ||
    value === "cash_on_delivery" ||
    value === "cash on delivery"
  ) {
    return "Cash on Delivery";
  }

  if (
    value === "online" ||
    value === "online_payment" ||
    value === "upi"
  ) {
    return "Online Payment";
  }

  if (value === "card") {
    return "Card Payment";
  }

  if (value === "wallet") {
    return "Wallet Payment";
  }

  return method.charAt(0).toUpperCase() + method.slice(1);
};


  // ==========================================
  // PAYMENT STATUS
  // ==========================================

  const getPaymentStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "paid") {
      return "bg-green-100 text-green-700";
    }

    if (value === "failed") {
      return "bg-red-100 text-red-700";
    }

    if (value === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-700";
  };


  // ==========================================
  // ORDER STATUS
  // ==========================================

  const getOrderStatusClass = (status) => {
    const value = status?.toLowerCase();

    switch (value) {
      case "placed":
        return "bg-blue-100 text-blue-700";

      case "confirmed":
        return "bg-indigo-100 text-indigo-700";

      case "preparing":
        return "bg-yellow-100 text-yellow-700";

      case "ready":
        return "bg-purple-100 text-purple-700";

      case "out_for_delivery":
        return "bg-orange-100 text-orange-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  // ==========================================
  // FORMAT ORDER STATUS
  // ==========================================

  const formatStatus = (status) => {
    if (!status) {
      return "Unknown";
    }

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };


  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  // ==========================================
  // GET ITEM NAME
  // ==========================================

  const getItemName = (item) => {
    return (
      item.name ||
      item.menuItem?.name ||
      item.product?.name ||
      "Menu Item"
    );
  };


  // ==========================================
  // GET ITEM PRICE
  // ==========================================

  const getItemPrice = (item) => {
    return Number(
      item.price ||
      item.unitPrice ||
      item.menuItem?.price ||
      0
    );
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3EBDD]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          <div className="text-center">

            <div
              className="
                w-12
                h-12
                border-4
                border-[#C9A45C]/30
                border-t-[#C9A45C]
                rounded-full
                animate-spin
                mx-auto
              "
            ></div>

            <p className="mt-5 text-[#6B7355]">
              Loading your orders...
            </p>

          </div>

        </div>

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#F3EBDD]">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-[#E8DDC9]
              p-10
              text-center
              shadow-sm
            "
          >

            <div className="text-5xl mb-5">
              ⚠️
            </div>

            <h1 className="font-serif text-3xl text-[#2C211B]">
              Unable to Load Orders
            </h1>

            <p className="text-[#6B7355] mt-3">
              {error}
            </p>

            <button
              onClick={fetchOrders}
              className="
                mt-6
                px-6
                py-3
                rounded-lg
                bg-[#C9A45C]
                text-[#2C211B]
                font-semibold
                hover:bg-[#B99145]
                transition
              "
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F3EBDD]">

      {/* ==========================================
          HEADER
      ========================================== */}

      <section className="pt-14 sm:pt-16 pb-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <p
              className="
                text-[#C9A45C]
                text-xs
                sm:text-sm
                uppercase
                tracking-[4px]
                font-semibold
              "
            >
              My Account
            </p>

            <h1
              className="
                font-serif
                text-4xl
                sm:text-5xl
                lg:text-6xl
                text-[#2C211B]
                mt-3
              "
            >
              My Orders
            </h1>

            <p className="text-[#6B7355] mt-4">
              View and track all your restaurant orders.
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          NO ORDERS
      ========================================== */}

      {orders.length === 0 ? (

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-[#E8DDC9]
              p-10
              sm:p-16
              text-center
              shadow-sm
            "
          >

            <div className="text-6xl mb-6">
              🍽️
            </div>

            <h2
              className="
                font-serif
                text-3xl
                sm:text-4xl
                text-[#2C211B]
              "
            >
              No Orders Yet
            </h2>

            <p className="text-[#6B7355] mt-3">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/menu"
              className="
                inline-block
                mt-7
                px-7
                py-3
                rounded-lg
                bg-[#C9A45C]
                text-[#2C211B]
                font-semibold
                hover:bg-[#B99145]
                transition
              "
            >
              Browse Menu
            </Link>

          </div>

        </div>

      ) : (

        /* ==========================================
           ORDERS LIST
        ========================================== */

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

          <div className="space-y-7">

            {orders.map((order) => (

              <div
                key={order._id}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-[#E8DDC9]
                  shadow-sm
                  overflow-hidden
                "
              >

                {/* ==========================================
                    ORDER HEADER
                ========================================== */}

                <div
                  className="
                    px-5
                    sm:px-7
                    py-5
                    bg-[#F9F5ED]
                    border-b
                    border-[#E8DDC9]
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-4
                    "
                  >

                    <div>

                      <p className="text-xs uppercase tracking-wider text-[#6B7355]">
                        Order Number
                      </p>

                      <h2
                        className="
                          font-semibold
                          text-lg
                          sm:text-xl
                          text-[#2C211B]
                          mt-1
                        "
                      >
                        {order.orderNumber || order._id}
                      </h2>

                      <p className="text-sm text-[#6B7355] mt-1">
                        {formatDate(order.createdAt)}
                        {" • "}
                        {formatTime(order.createdAt)}
                      </p>

                    </div>


                    {/* STATUS */}

                    <div className="flex flex-wrap gap-2">

                      <span
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-xs
                          sm:text-sm
                          font-semibold
                          ${getOrderStatusClass(order.status)}
                        `}
                      >
                        {formatStatus(order.status)}
                      </span>

                      <span
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-xs
                          sm:text-sm
                          font-semibold
                          ${getPaymentStatusClass(
                            order.payment?.status
                          )}
                        `}
                      >
                        Payment:{" "}
                        {formatStatus(
                          order.payment?.status || "pending"
                        )}
                      </span>

                    </div>

                  </div>

                </div>


                {/* ==========================================
                    ORDER CONTENT
                ========================================== */}

                <div className="p-5 sm:p-7">

                  <div className="grid lg:grid-cols-3 gap-7">


                    {/* ==========================================
                        ITEMS
                    ========================================== */}

                    <div className="lg:col-span-2">

                      <h3
                        className="
                          font-serif
                          text-2xl
                          text-[#2C211B]
                          mb-5
                        "
                      >
                        Ordered Items
                      </h3>


                      <div className="space-y-4">

                        {(order.items || []).map(
                          (item, index) => (

                            <div
                              key={
                                item._id ||
                                item.menuItem?._id ||
                                index
                              }
                              className="
                                flex
                                items-center
                                justify-between
                                gap-4
                                p-4
                                rounded-xl
                                bg-[#F9F5ED]
                                border
                                border-[#E8DDC9]
                              "
                            >

                              <div className="min-w-0">

                                <p
                                  className="
                                    font-semibold
                                    text-[#2C211B]
                                    truncate
                                  "
                                >
                                  {getItemName(item)}
                                </p>

                                <p
                                  className="
                                    text-sm
                                    text-[#6B7355]
                                    mt-1
                                  "
                                >
                                  ₹
                                  {getItemPrice(item).toFixed(2)}
                                  {" × "}
                                  {item.quantity || 1}
                                </p>

                              </div>


                              <p
                                className="
                                  font-semibold
                                  text-[#3F4A36]
                                  whitespace-nowrap
                                "
                              >
                                ₹
                                {(
                                  getItemPrice(item) *
                                  (item.quantity || 1)
                                ).toFixed(2)}
                              </p>

                            </div>

                          )
                        )}

                      </div>

                    </div>


                    {/* ==========================================
                        ORDER SUMMARY
                    ========================================== */}

                    <div>

                      <h3
                        className="
                          font-serif
                          text-2xl
                          text-[#2C211B]
                          mb-5
                        "
                      >
                        Order Summary
                      </h3>


                      <div
                        className="
                          bg-[#F9F5ED]
                          rounded-2xl
                          border
                          border-[#E8DDC9]
                          p-5
                        "
                      >

                        <div className="space-y-3">

                          <div className="flex justify-between gap-4">

                            <span className="text-[#6B7355]">
                              Subtotal
                            </span>

                            <span className="font-medium text-[#2C211B]">
                              ₹
                              {Number(
                                order.subtotal || 0
                              ).toFixed(2)}
                            </span>

                          </div>


                          <div className="flex justify-between gap-4">

                            <span className="text-[#6B7355]">
                              Tax
                            </span>

                            <span className="font-medium text-[#2C211B]">
                              ₹
                              {Number(
                                order.tax || 0
                              ).toFixed(2)}
                            </span>

                          </div>


                          <div className="flex justify-between gap-4">

                            <span className="text-[#6B7355]">
                              Delivery Fee
                            </span>

                            <span className="font-medium text-[#2C211B]">
                              ₹
                              {Number(
                                order.deliveryFee || 0
                              ).toFixed(2)}
                            </span>

                          </div>


                          <div className="flex justify-between gap-4">

                            <span className="text-[#6B7355]">
                              Discount
                            </span>

                            <span className="font-medium text-green-700">
                              - ₹
                              {Number(
                                order.discount || 0
                              ).toFixed(2)}
                            </span>

                          </div>


                          <div className="border-t border-[#E8DDC9] pt-4 mt-4 flex justify-between gap-4">

                            <span
                              className="
                                font-semibold
                                text-[#2C211B]
                              "
                            >
                              Total
                            </span>

                            <span
                              className="
                                font-bold
                                text-xl
                                text-[#C9A45C]
                              "
                            >
                              ₹
                              {Number(
                                order.total || 0
                              ).toFixed(2)}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* ==========================================
                      DELIVERY + PAYMENT
                  ========================================== */}

                  <div className="grid md:grid-cols-2 gap-6 mt-7">


                    {/* ==========================================
                        DELIVERY ADDRESS
                    ========================================== */}

                    <div
                      className="
                        rounded-2xl
                        border
                        border-[#E8DDC9]
                        p-5
                      "
                    >

                      <h3
                        className="
                          font-serif
                          text-xl
                          text-[#2C211B]
                          mb-3
                        "
                      >
                        📍 Delivery Address
                      </h3>

                      <div className="text-[#6B7355] text-sm leading-6">

                        {order.deliveryAddress ? (

                          <>
                            {order.deliveryAddress.line1 && (
                              <p>
                                {order.deliveryAddress.line1}
                              </p>
                            )}

                            {order.deliveryAddress.line2 && (
                              <p>
                                {order.deliveryAddress.line2}
                              </p>
                            )}

                            {order.deliveryAddress.city && (
                              <p>
                                {order.deliveryAddress.city}
                              </p>
                            )}

                            {order.deliveryAddress.state && (
                              <p>
                                {order.deliveryAddress.state}
                              </p>
                            )}

                            {order.deliveryAddress.zip && (
                              <p>
                                {order.deliveryAddress.zip}
                              </p>
                            )}

                            {order.deliveryAddress.pincode && (
                              <p>
                                {order.deliveryAddress.pincode}
                              </p>
                            )}

                          </>

                        ) : (

                          <p>
                            Address not available
                          </p>

                        )}

                      </div>

                    </div>


                    {/* ==========================================
                        PAYMENT
                    ========================================== */}

                    <div
                      className="
                        rounded-2xl
                        border
                        border-[#E8DDC9]
                        p-5
                      "
                    >

                      <h3
                        className="
                          font-serif
                          text-xl
                          text-[#2C211B]
                          mb-3
                        "
                      >
                        💳 Payment
                      </h3>


                      <div className="space-y-3">

                        <div className="flex justify-between gap-4">

                          <span className="text-[#6B7355]">
                            Method
                          </span>

                          <span className="font-semibold text-[#2C211B]">
                            {getPaymentMethod(
                              order.payment?.method
                            )}
                          </span>

                        </div>


                        <div className="flex justify-between gap-4">

                          <span className="text-[#6B7355]">
                            Status
                          </span>

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                              ${getPaymentStatusClass(
                                order.payment?.status
                              )}
                            `}
                          >
                            {formatStatus(
                              order.payment?.status ||
                              "pending"
                            )}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* ==========================================
                      ORDER TYPE / ESTIMATED TIME
                  ========================================== */}

                  <div
                    className="
                      mt-6
                      pt-5
                      border-t
                      border-[#E8DDC9]
                      flex
                      flex-wrap
                      gap-x-8
                      gap-y-3
                      text-sm
                    "
                  >

                    <div>

                      <span className="text-[#6B7355]">
                        Order Type:
                      </span>

                      <span className="ml-2 font-semibold text-[#2C211B] capitalize">
                        {order.orderType || "Delivery"}
                      </span>

                    </div>


                    {order.estimatedTime && (

                      <div>

                        <span className="text-[#6B7355]">
                          Estimated Time:
                        </span>

                        <span className="ml-2 font-semibold text-[#2C211B]">
                          {order.estimatedTime} minutes
                        </span>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default Orders;