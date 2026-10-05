import { useEffect, useState } from "react";
import api from "../services/api";

function Payments() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updatingPayment, setUpdatingPayment] = useState(null);


  // ==========================================
  // FETCH PAYMENTS
  // ==========================================

  const fetchPayments = async () => {

    try {

      setLoading(true);

      const response = await api.get("/admin/orders");

      setOrders(response.data.data || []);

    } catch (error) {

      console.error("Payments error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to load payments"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchPayments();

  }, []);


  // ==========================================
  // MARK PAYMENT AS PAID
  // ==========================================

  const markPaymentAsPaid = async (orderId) => {

    try {

      const confirmPayment = window.confirm(
        "Are you sure you want to mark this payment as Paid?"
      );

      if (!confirmPayment) {
        return;
      }


      setUpdatingPayment(orderId);


      await api.patch(
        `/orders/${orderId}/payment-status`,
        {
          status: "paid"
        }
      );


      alert("Payment marked as Paid successfully!");


      // Refresh payment list
      await fetchPayments();


    } catch (error) {

      console.error(
        "Payment update error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to update payment status"
      );

    } finally {

      setUpdatingPayment(null);

    }

  };


  // ==========================================
  // PAYMENT DATA
  // ==========================================

  const payments = orders.filter(
    (order) => order.payment
  );


  const filteredPayments =
    filter === "all"
      ? payments
      : payments.filter(
          (order) =>
            order.payment?.status === filter
        );


  // ==========================================
  // TOTAL REVENUE
  // ==========================================

  const totalRevenue = payments.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );


  // ==========================================
  // PAID AMOUNT
  // ==========================================

  const paidAmount = payments
    .filter(
      (order) =>
        order.payment?.status === "paid"
    )
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );


  // ==========================================
  // PENDING AMOUNT
  // ==========================================

  const pendingAmount = payments
    .filter(
      (order) =>
        order.payment?.status === "pending"
    )
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );


  // ==========================================
  // PAYMENT METHOD LABEL
  // ==========================================

  const getPaymentMethod = (method) => {

    if (!method) {
      return "Cash";
    }

    switch (method.toLowerCase()) {

      case "cash":
        return "CASH";

      case "online":
        return "ONLINE";

      case "upi":
        return "UPI";

      case "wallet":
        return "WALLET";

      case "card":
        return "CARD";

      default:
        return method.toUpperCase();

    }

  };


  return (

    <div className="min-h-screen bg-[#F3EBDD] p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8">

          <p className="text-[#C9A45C] text-xs uppercase tracking-[3px] font-bold">

            Finance Management

          </p>


          <h1 className="text-4xl sm:text-5xl font-serif text-[#2C211B] mt-2">

            Payments

          </h1>


          <p className="text-[#6B7355] mt-2">

            Track restaurant payments and revenue.

          </p>

        </div>



        {/* ==========================================
            SUMMARY CARDS
        ========================================== */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">


          {/* TOTAL REVENUE */}

          <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9] shadow-sm">

            <p className="text-[#6B7355]">
              Total Revenue
            </p>

            <p className="text-3xl font-bold text-[#3F4A36] mt-2">

              ₹{totalRevenue.toFixed(2)}

            </p>

          </div>


          {/* PAID */}

          <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9] shadow-sm">

            <p className="text-[#6B7355]">
              Paid Amount
            </p>

            <p className="text-3xl font-bold text-green-700 mt-2">

              ₹{paidAmount.toFixed(2)}

            </p>

          </div>


          {/* PENDING */}

          <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9] shadow-sm">

            <p className="text-[#6B7355]">
              Pending Amount
            </p>

            <p className="text-3xl font-bold text-[#C9A45C] mt-2">

              ₹{pendingAmount.toFixed(2)}

            </p>

          </div>

        </div>



        {/* ==========================================
            FILTER
        ========================================== */}

        <div className="bg-white rounded-2xl p-5 border border-[#E8DDC9] mb-6">

          <div className="flex flex-wrap gap-3">

            {[
              "all",
              "paid",
              "pending",
              "failed",
              "refunded"
            ].map((status) => (

              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`
                  px-5
                  py-2.5
                  rounded-xl
                  capitalize
                  font-semibold
                  transition

                  ${
                    filter === status
                      ? "bg-[#3F4A36] text-white"
                      : "bg-[#F3EBDD] text-[#3F4A36] hover:bg-[#E8DDC9]"
                  }
                `}
              >

                {status}

              </button>

            ))}

          </div>

        </div>



        {/* ==========================================
            PAYMENT TABLE
        ========================================== */}

        <div className="bg-white rounded-2xl border border-[#E8DDC9] overflow-hidden shadow-sm">


          <div className="px-6 py-5 border-b border-[#E8DDC9]">

            <h2 className="font-serif text-2xl text-[#2C211B]">

              Payment Transactions

            </h2>

          </div>



          {loading ? (

            <div className="p-12 text-center text-[#6B7355]">

              Loading payments...

            </div>

          ) : filteredPayments.length === 0 ? (

            <div className="p-12 text-center text-[#6B7355]">

              No payment records found.

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">


                <thead>

                  <tr className="bg-[#F3EBDD] text-left">

                    <th className="px-6 py-4">
                      Order
                    </th>

                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Method
                    </th>

                    <th className="px-6 py-4">
                      Amount
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                  </tr>

                </thead>



                <tbody>

                  {filteredPayments.map((order) => (

                    <tr
                      key={order._id}
                      className="border-t border-[#E8DDC9] hover:bg-[#F9F5ED]"
                    >


                      {/* ORDER */}

                      <td className="px-6 py-5 font-semibold text-[#3F4A36]">

                        {order.orderNumber || order._id}

                      </td>



                      {/* CUSTOMER */}

                      <td className="px-6 py-5">

                        <p className="font-semibold text-[#2C211B]">

                          {order.user?.name ||
                            "Customer"}

                        </p>

                        <p className="text-xs text-[#6B7355]">

                          {order.user?.email || "-"}

                        </p>

                      </td>



                      {/* METHOD */}

                      <td className="px-6 py-5 uppercase text-sm text-[#6B7355]">

                        {getPaymentMethod(
                          order.payment?.method
                        )}

                      </td>



                      {/* AMOUNT */}

                      <td className="px-6 py-5 font-bold text-[#C9A45C]">

                        ₹
                        {Number(
                          order.total || 0
                        ).toFixed(2)}

                      </td>



                      {/* STATUS */}

                      <td className="px-6 py-5">


                        {order.payment?.status === "pending" ? (

                          <button
                            onClick={() =>
                              markPaymentAsPaid(
                                order._id
                              )
                            }
                            disabled={
                              updatingPayment ===
                              order._id
                            }
                            className="
                              px-4
                              py-2
                              rounded-full
                              bg-[#E8DDC9]
                              text-[#3F4A36]
                              text-xs
                              font-semibold
                              capitalize
                              hover:bg-[#C9A45C]
                              hover:text-white
                              transition
                              cursor-pointer
                            "
                          >

                            {updatingPayment ===
                            order._id
                              ? "Updating..."
                              : "Pending"}

                          </button>

                        ) : (

                          <span
                            className={`
                              px-4
                              py-2
                              rounded-full
                              text-xs
                              font-semibold
                              capitalize

                              ${
                                order.payment?.status ===
                                "paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-[#E8DDC9] text-[#3F4A36]"
                              }
                            `}
                          >

                            {order.payment?.status ||
                              "pending"}

                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Payments;