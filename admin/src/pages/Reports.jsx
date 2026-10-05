import { useEffect, useState } from "react";
import api from "../services/api";

function Reports() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const [ordersResponse, customersResponse] =
        await Promise.all([
          api.get("/admin/orders"),
          api.get("/admin/customers"),
        ]);

      setOrders(
        ordersResponse.data.data || []
      );

      setCustomers(
        customersResponse.data.data || []
      );

    } catch (error) {
      console.error("Reports error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to load reports"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) =>
      ["served", "delivered"].includes(
        order.status
      )
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      !["served", "delivered", "cancelled"].includes(
        order.status
      )
  ).length;

  const cancelledOrders = orders.filter(
    (order) =>
      order.status === "cancelled"
  ).length;

  const averageOrderValue =
    totalOrders > 0
      ? totalRevenue / totalOrders
      : 0;

  return (
    <div className="min-h-screen bg-[#F3EBDD] p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-[#C9A45C] text-xs uppercase tracking-[3px] font-bold">
            Business Intelligence
          </p>

          <h1 className="text-4xl sm:text-5xl font-serif text-[#2C211B] mt-2">
            Reports & Analytics
          </h1>

          <p className="text-[#6B7355] mt-2">
            Overview of your restaurant performance.
          </p>

        </div>


        {loading ? (

          <div className="bg-white rounded-2xl p-12 text-center">
            Loading reports...
          </div>

        ) : (

          <>

            {/* MAIN CARDS */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9] shadow-sm">

                <p className="text-[#6B7355]">
                  Revenue
                </p>

                <p className="text-3xl font-bold text-[#3F4A36] mt-2">
                  ₹{totalRevenue.toFixed(2)}
                </p>

              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9] shadow-sm">

                <p className="text-[#6B7355]">
                  Total Orders
                </p>

                <p className="text-3xl font-bold text-[#2C211B] mt-2">
                  {totalOrders}
                </p>

              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9] shadow-sm">

                <p className="text-[#6B7355]">
                  Customers
                </p>

                <p className="text-3xl font-bold text-[#2C211B] mt-2">
                  {customers.length}
                </p>

              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9] shadow-sm">

                <p className="text-[#6B7355]">
                  Average Order
                </p>

                <p className="text-3xl font-bold text-[#C9A45C] mt-2">
                  ₹{averageOrderValue.toFixed(2)}
                </p>

              </div>

            </div>


            {/* ORDER PERFORMANCE */}

            <div className="grid lg:grid-cols-2 gap-6 mt-6">

              <div className="bg-white rounded-2xl p-7 border border-[#E8DDC9] shadow-sm">

                <h2 className="font-serif text-2xl text-[#2C211B]">
                  Order Performance
                </h2>

                <div className="space-y-5 mt-7">

                  <div className="flex justify-between">
                    <span className="text-[#6B7355]">
                      Completed Orders
                    </span>

                    <span className="font-bold text-green-700">
                      {completedOrders}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#6B7355]">
                      Pending Orders
                    </span>

                    <span className="font-bold text-[#C9A45C]">
                      {pendingOrders}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#6B7355]">
                      Cancelled Orders
                    </span>

                    <span className="font-bold text-red-600">
                      {cancelledOrders}
                    </span>
                  </div>

                </div>

              </div>


              {/* RESTAURANT INSIGHTS */}

              <div className="bg-[#3F4A36] rounded-2xl p-7 text-white shadow-sm">

                <p className="text-[#C9A45C] text-xs uppercase tracking-[3px]">
                  Restaurant Insight
                </p>

                <h2 className="font-serif text-3xl mt-3">
                  Business Overview
                </h2>

                <p className="text-white/70 mt-4 leading-7">
                  Monitor your orders, customers,
                  revenue and overall restaurant
                  activity from one place.
                </p>

                <div className="mt-7">

                  <p className="text-white/60 text-sm">
                    Total Business Value
                  </p>

                  <p className="text-4xl font-bold text-[#C9A45C] mt-2">
                    ₹{totalRevenue.toFixed(2)}
                  </p>

                </div>

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Reports;