import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/orders");

      console.log(
        "ADMIN ORDERS RESPONSE:",
        response.data
      );

      setOrders(
        response.data.data || []
      );

    } catch (error) {

      console.error(
        "ADMIN ORDERS ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to load orders"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);


  // ==========================================
  // MARK ORDER AS DELIVERED
  // ==========================================

  const markAsDelivered = async (orderId) => {

    try {

      const response = await api.patch(
        `/orders/${orderId}/status`,
        {
          status: "delivered"
        }
      );


      if (response.data?.success) {

        alert("Order marked as delivered!");

        // Refresh orders
        await fetchOrders();

      }

    } catch (error) {

      console.error(
        "UPDATE ORDER STATUS ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update order status"
      );

    }

  };


  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (status) => {

    switch (status?.toLowerCase()) {

      case "placed":
        return "bg-blue-100 text-blue-700";

      case "confirmed":
        return "bg-green-100 text-green-700";

      case "preparing":
        return "bg-yellow-100 text-yellow-700";

      case "ready":
        return "bg-purple-100 text-purple-700";

      case "out-for-delivery":
      case "out_for_delivery":
        return "bg-orange-100 text-orange-700";

      case "delivered":
        return "bg-emerald-100 text-emerald-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };


  // ==========================================
  // PAYMENT STATUS STYLE
  // ==========================================

  const getPaymentStyle = (status) => {

    switch (status?.toLowerCase()) {

      case "paid":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "failed":
        return "bg-red-100 text-red-700";

      case "refunded":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-[#F3EBDD]
        p-6
        flex
        items-center
        justify-center
      ">

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
          "></div>

          <p className="
            mt-4
            text-[#6B7355]
          ">
            Loading orders...
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="
      min-h-screen
      bg-[#F3EBDD]
      p-4
      sm:p-6
      lg:p-8
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-end
          sm:justify-between
          gap-5
          mb-8
        ">

          <div>

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
              font-serif
              text-4xl
              sm:text-5xl
              text-[#2C211B]
              mt-2
            ">
              Orders
            </h1>

            <p className="
              text-[#6B7355]
              mt-2
            ">
              Manage all customer orders.
            </p>

          </div>


          {/* TOTAL ORDERS */}

          <div className="
            bg-white
            rounded-2xl
            px-7
            py-5
            border
            border-[#E8DDC9]
            shadow-sm
          ">

            <p className="
              text-sm
              text-[#6B7355]
            ">
              Total Orders
            </p>

            <p className="
              text-3xl
              font-bold
              text-[#3F4A36]
              mt-1
            ">
              {orders.length}
            </p>

          </div>

        </div>


        {/* ==========================================
            ORDER SUMMARY
        ========================================== */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          mb-8
        ">


          {/* TOTAL ORDERS */}

          <div className="
            bg-white
            rounded-2xl
            p-6
            border
            border-[#E8DDC9]
            shadow-sm
          ">

            <p className="
              text-sm
              text-[#6B7355]
            ">
              Total Orders
            </p>

            <p className="
              text-3xl
              font-bold
              text-[#2C211B]
              mt-2
            ">
              {orders.length}
            </p>

          </div>


          {/* PLACED */}

          <div className="
            bg-white
            rounded-2xl
            p-6
            border
            border-[#E8DDC9]
            shadow-sm
          ">

            <p className="
              text-sm
              text-[#6B7355]
            ">
              Placed
            </p>

            <p className="
              text-3xl
              font-bold
              text-blue-600
              mt-2
            ">
              {
                orders.filter(
                  (order) =>
                    order.status?.toLowerCase() ===
                    "placed"
                ).length
              }
            </p>

          </div>


          {/* DELIVERED */}

          <div className="
            bg-white
            rounded-2xl
            p-6
            border
            border-[#E8DDC9]
            shadow-sm
          ">

            <p className="
              text-sm
              text-[#6B7355]
            ">
              Delivered
            </p>

            <p className="
              text-3xl
              font-bold
              text-green-600
              mt-2
            ">
              {
                orders.filter(
                  (order) =>
                    order.status?.toLowerCase() ===
                    "delivered"
                ).length
              }
            </p>

          </div>


          {/* TOTAL REVENUE */}

          <div className="
            bg-white
            rounded-2xl
            p-6
            border
            border-[#E8DDC9]
            shadow-sm
          ">

            <p className="
              text-sm
              text-[#6B7355]
            ">
              Total Revenue
            </p>

            <p className="
              text-3xl
              font-bold
              text-[#C9A45C]
              mt-2
            ">
              ₹
              {
                orders
                  .reduce(
                    (total, order) =>
                      total +
                      Number(
                        order.total || 0
                      ),
                    0
                  )
                  .toFixed(2)
              }
            </p>

          </div>

        </div>


        {/* ==========================================
            ORDERS TABLE
        ========================================== */}

        <div className="
          bg-white
          rounded-2xl
          border
          border-[#E8DDC9]
          shadow-sm
          overflow-hidden
        ">


          {/* TABLE HEADER */}

          <div className="
            px-6
            py-5
            border-b
            border-[#E8DDC9]
          ">

            <h2 className="
              font-serif
              text-2xl
              text-[#2C211B]
            ">
              All Orders
            </h2>

            <p className="
              text-sm
              text-[#6B7355]
              mt-1
            ">
              Showing {orders.length} orders
            </p>

          </div>


          {/* NO ORDERS */}

          {orders.length === 0 ? (

            <div className="
              p-14
              text-center
            ">

              <div className="
                text-6xl
                mb-4
              ">
                🛒
              </div>

              <h3 className="
                font-serif
                text-2xl
                text-[#2C211B]
              ">
                No Orders Found
              </h3>

              <p className="
                text-[#6B7355]
                mt-2
              ">
                There are currently no orders.
              </p>

            </div>

          ) : (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
                min-w-[1200px]
              ">

                {/* ==========================================
                    TABLE HEADER
                ========================================== */}

                <thead>

                  <tr className="
                    bg-[#F3EBDD]
                    text-left
                  ">

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Order
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Customer
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Items
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Type
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Amount
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Payment
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Status
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Date
                    </th>

                    <th className="
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-[#2C211B]
                    ">
                      Address
                    </th>

                  </tr>

                </thead>


                {/* ==========================================
                    TABLE BODY
                ========================================== */}

                <tbody>

                  {orders.map(
                    (order) => (

                      <tr
                        key={order._id}
                        className="
                          border-t
                          border-[#E8DDC9]
                          hover:bg-[#F9F5ED]
                          transition
                        "
                      >


                        {/* ORDER DETAILS */}

                        <td className="
                          px-6
                          py-5
                        ">

                          <p className="
                            font-semibold
                            text-[#2C211B]
                          ">
                            {order.orderNumber ||
                              `#${order._id?.slice(-6)}`}
                          </p>

                          <p className="
                            text-xs
                            text-[#6B7355]
                            mt-1
                          ">
                            ID: {order._id?.slice(-8)}
                          </p>

                        </td>


                        {/* CUSTOMER */}

                        <td className="
                          px-6
                          py-5
                        ">

                          <div>

                            <p className="
                              font-semibold
                              text-[#2C211B]
                            ">
                              {order.user?.name ||
                                "Customer"}
                            </p>

                            <p className="
                              text-xs
                              text-[#6B7355]
                              mt-1
                            ">
                              {order.user?.email ||
                                "-"}
                            </p>

                            {order.user?.phone && (

                              <p className="
                                text-xs
                                text-[#6B7355]
                                mt-1
                              ">
                                {order.user.phone}
                              </p>

                            )}

                          </div>

                        </td>


                        {/* ITEMS */}

                        <td className="
                          px-6
                          py-5
                        ">

                          <div className="
                            min-w-[200px]
                          ">

                            {order.items &&
                              order.items.length > 0 ? (

                              order.items.map(
                                (item, index) => (

                                  <div
                                    key={
                                      item._id ||
                                      item.menuItem ||
                                      index
                                    }
                                    className="
                                      flex
                                      items-center
                                      justify-between
                                      gap-4
                                      text-sm
                                      mb-2
                                    "
                                  >

                                    <div>

                                      <p className="
                                        font-medium
                                        text-[#2C211B]
                                      ">
                                        {item.name ||
                                          item.menuItem?.name ||
                                          item.product?.name ||
                                          "Item"}
                                      </p>

                                      {item.price !== undefined && (

                                        <p className="
                                          text-xs
                                          text-[#6B7355]
                                        ">
                                          ₹
                                          {Number(
                                            item.price
                                          ).toFixed(2)}
                                        </p>

                                      )}

                                    </div>

                                    <span className="
                                      text-[#6B7355]
                                      whitespace-nowrap
                                    ">
                                      × {item.quantity || 1}
                                    </span>

                                  </div>

                                )

                              )

                            ) : (

                              <span className="
                                text-sm
                                text-[#6B7355]
                              ">
                                No items
                              </span>

                            )}

                          </div>

                        </td>


                        {/* ORDER TYPE */}

                        <td className="
                          px-6
                          py-5
                        ">

                          <span className="
                            inline-flex
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            capitalize
                            bg-[#E8DDC9]
                            text-[#3F4A36]
                          ">
                            {order.orderType ||
                              "-"}
                          </span>

                        </td>


                        {/* AMOUNT */}

                        <td className="
                          px-6
                          py-5
                        ">

                          <p className="
                            font-bold
                            text-[#3F4A36]
                          ">
                            ₹
                            {Number(
                              order.total || 0
                            ).toFixed(2)}
                          </p>

                          <p className="
                            text-xs
                            text-[#6B7355]
                            mt-1
                          ">
                            Subtotal ₹
                            {Number(
                              order.subtotal || 0
                            ).toFixed(2)}
                          </p>

                          {Number(
                            order.tax || 0
                          ) > 0 && (

                            <p className="
                              text-xs
                              text-[#6B7355]
                              mt-1
                            ">
                              Tax ₹
                              {Number(
                                order.tax
                              ).toFixed(2)}
                            </p>

                          )}

                          {Number(
                            order.deliveryFee || 0
                          ) > 0 && (

                            <p className="
                              text-xs
                              text-[#6B7355]
                              mt-1
                            ">
                              Delivery ₹
                              {Number(
                                order.deliveryFee
                              ).toFixed(2)}
                            </p>

                          )}

                        </td>


                        {/* PAYMENT */}

                        <td className="
                          px-6
                          py-5
                        ">

                          <p className="
                            text-sm
                            font-medium
                            text-[#2C211B]
                            capitalize
                          ">
                            {order.payment?.method ||
                              "-"}
                          </p>

                          <span
                            className={`
                              inline-flex
                              mt-1
                              px-2.5
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                              capitalize
                              ${getPaymentStyle(
                                order.payment?.status
                              )}
                            `}
                          >
                            {order.payment?.status ||
                              "pending"}
                          </span>

                        </td>


                        {/* ==========================================
                            ORDER STATUS - CLICKABLE
                        ========================================== */}

                        <td className="
                          px-6
                          py-5
                        ">

                          {order.status?.toLowerCase() === "placed" ? (

                            <button
                              type="button"
                              onClick={() =>
                                markAsDelivered(
                                  order._id
                                )
                              }
                              className={`
                                inline-flex
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                capitalize
                                transition
                                cursor-pointer
                                hover:scale-105
                                hover:shadow-sm
                                ${getStatusStyle(
                                  order.status
                                )}
                              `}
                              title="Click to mark as delivered"
                            >
                              {order.status}
                            </button>

                          ) : (

                            <span
                              className={`
                                inline-flex
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                capitalize
                                ${getStatusStyle(
                                  order.status
                                )}
                              `}
                            >
                              {order.status || "pending"}
                            </span>

                          )}

                        </td>


                        {/* DATE */}

                        <td className="
                          px-6
                          py-5
                          text-sm
                          text-[#6B7355]
                          whitespace-nowrap
                        ">

                          {order.createdAt
                            ? new Date(
                              order.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                            : "-"}

                          {order.createdAt && (

                            <p className="
                              text-xs
                              text-[#6B7355]
                              mt-1
                            ">
                              {new Date(
                                order.createdAt
                              ).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>

                          )}

                        </td>


                        {/* ADDRESS */}

                        <td className="
                          px-6
                          py-5
                        ">

                          {order.deliveryAddress ? (

                            <div className="max-w-[220px]">

                              <p className="
                                font-medium
                                text-[#2C211B]
                              ">
                                {order.deliveryAddress.line1 ||
                                  "-"}
                              </p>

                              <p className="
                                text-sm
                                text-[#6B7355]
                                mt-1
                              ">
                                {order.deliveryAddress.city ||
                                  "-"}
                              </p>

                              {order.deliveryAddress.state && (

                                <p className="
                                  text-sm
                                  text-[#6B7355]
                                ">
                                  {order.deliveryAddress.state}
                                </p>

                              )}

                              {(
                                order.deliveryAddress.zip ||
                                order.deliveryAddress.zipCode ||
                                order.deliveryAddress.postalCode
                              ) && (

                                <p className="
                                  text-xs
                                  text-[#6B7355]
                                  mt-1
                                ">
                                  PIN:{" "}
                                  {order.deliveryAddress.zip ||
                                    order.deliveryAddress.zipCode ||
                                    order.deliveryAddress.postalCode}
                                </p>

                              )}

                            </div>

                          ) : (

                            <span className="
                              text-[#6B7355]
                            ">
                              No address
                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default Orders;
