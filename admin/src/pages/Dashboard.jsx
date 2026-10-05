import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalItems: 0,
    availableItems: 0,
    unavailableItems: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState(null);


  // ==========================================
  // FETCH DASHBOARD DATA
  // ==========================================

  useEffect(() => {

    fetchDashboardData();

  }, []);


  const fetchDashboardData = async () => {

    try {

      setLoading(true);
      setError("");

      // ==========================================
      // MENU DATA
      // ==========================================

      const menuResponse = await api.get("/menu");

      const items =
        menuResponse.data?.data || [];

      const availableItems =
        items.filter(
          (item) => item.isAvailable
        ).length;


      // ==========================================
      // ADMIN DASHBOARD DATA
      // ==========================================

      const dashboardResponse =
        await api.get("/admin/dashboard");

      const dashboardData =
        dashboardResponse.data?.data || {};


      // ==========================================
      // ALL USERS
      // ==========================================

      const usersResponse =
        await api.get("/admin/users");

      const usersData =
        usersResponse.data?.data || [];


      // ==========================================
      // ALL ORDERS
      // ==========================================

      const ordersResponse =
        await api.get("/admin/orders");

      const ordersData =
        ordersResponse.data?.data || [];


      // ==========================================
      // SET DASHBOARD STATS
      // ==========================================

      setStats({

        totalUsers:
          usersResponse.data?.count ||
          usersData.length,

        totalOrders:
          ordersResponse.data?.count ||
          ordersData.length,

        totalRevenue:
          Math.round(dashboardData.totalRevenue || 0),

        totalItems:
          items.length,

        availableItems:
          availableItems,

        unavailableItems:
          items.length - availableItems,

      });


      // ==========================================
      // RECENT ORDERS
      // ==========================================

      setRecentOrders(
        ordersData.slice(0, 5)
      );


      // ==========================================
      // REGISTERED USERS
      // ==========================================

      setUsers(
        usersData.slice(0, 10)
      );


    } catch (error) {

      console.error(
        "Dashboard error:",
        error
      );

      if (error.response?.status === 401) {

        setError(
          "Authentication failed. Please login again."
        );

      } else {

        setError(
          error.response?.data?.message ||
          "Failed to load dashboard data."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // COMPLETE ORDER
  // ==========================================

  const completeOrder = async (orderId) => {

    try {

      // Prevent multiple clicks
      setUpdatingOrder(orderId);


      // ==========================================
      // UPDATE BACKEND STATUS
      // ==========================================

      const response = await api.patch(
        `/orders/${orderId}/status`,
        {
          status: "delivered"
        }
      );


      if (!response.data?.success) {

        alert(
          response.data?.message ||
          "Unable to complete order."
        );

        return;

      }


      // ==========================================
      // UPDATE FRONTEND WITHOUT REFRESH
      // ==========================================

      setRecentOrders((previousOrders) =>

        previousOrders.map((order) => {

          if (order._id === orderId) {

            return {
              ...order,
              status: "delivered"
            };

          }

          return order;

        })

      );


    } catch (error) {

      console.error(
        "Complete order error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to update order status."
      );

    } finally {

      setUpdatingOrder(null);

    }

  };


  // ==========================================
  // DISPLAY STATUS
  // ==========================================

  const getDisplayStatus = (status) => {

    if (status === "delivered") {
      return "Completed";
    }

    if (status === "placed") {
      return "Placed";
    }

    if (status === "out-for-delivery") {
      return "Out for Delivery";
    }

    if (!status) {
      return "Placed";
    }

    return status
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );

  };


  // ==========================================
  // DASHBOARD CARDS
  // ==========================================

  const cards = [

    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
    },

    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: "🧾",
    },

    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: "₹",
    },

    {
      title: "Total Menu Items",
      value: stats.totalItems,
      icon: "☷",
    },

    {
      title: "Available Items",
      value: stats.availableItems,
      icon: "✓",
    },

    {
      title: "Unavailable Items",
      value: stats.unavailableItems,
      icon: "!",
    },

  ];


  return (

    <div>

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8">

        <h1 className="text-2xl md:text-3xl font-bold text-[#2C211B]">
          Admin Dashboard
        </h1>

        <p className="text-[#6B7355] mt-1">
          Welcome to Olivia Grand Admin Panel
        </p>

      </div>


      {/* ==========================================
          ERROR
      ========================================== */}

      {error && (

        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">

          {error}

        </div>

      )}


      {loading ? (

        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

          <p className="text-[#6B7355]">
            Loading dashboard...
          </p>

        </div>

      ) : (

        <>

          {/* ==========================================
              STATISTICS CARDS
          ========================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

            {cards.map((card) => (

              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dfd0] hover:shadow-md transition"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      {card.title}
                    </p>

                    <h2 className="text-3xl font-bold text-[#2C211B] mt-2">
                      {card.value}
                    </h2>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#F3EBDD] text-[#3F4A36] flex items-center justify-center text-xl font-bold">
                    {card.icon}
                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* ==========================================
              RECENT ORDERS
          ========================================== */}

          <div className="bg-white rounded-2xl shadow-sm border border-[#e8dfd0] mt-8 overflow-hidden">

            <div className="px-6 py-5 border-b border-[#e8dfd0]">

              <h2 className="text-xl font-bold text-[#2C211B]">
                Recent Orders
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest customer orders
              </p>

            </div>


            {recentOrders.length === 0 ? (

              <div className="p-8 text-center text-gray-500">
                No orders found.
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-[#F3EBDD]">

                    <tr>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#2C211B]">
                        Order
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#2C211B]">
                        Customer
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#2C211B]">
                        Total
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#2C211B]">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {recentOrders.map((order) => (

                      <tr
                        key={order._id}
                        className="border-t border-[#eee5d8] hover:bg-[#faf8f3] transition"
                      >

                        {/* ORDER */}

                        <td className="px-6 py-4">

                          <span className="font-semibold text-[#3F4A36]">
                            {order.orderNumber || "N/A"}
                          </span>

                        </td>


                        {/* CUSTOMER */}

                        <td className="px-6 py-4">

                          <div>

                            <p className="font-medium text-[#2C211B]">
                              {order.user?.name ||
                                "Unknown Customer"}
                            </p>

                            <p className="text-xs text-gray-500">
                              {order.user?.email || ""}
                            </p>

                          </div>

                        </td>


                        {/* TOTAL */}

                        <td className="px-6 py-4 font-semibold text-[#C9A45C]">

                          ₹{order.total || 0}

                        </td>


                        {/* STATUS */}

                        <td className="px-6 py-4">

                          {order.status === "placed" ? (

                            <button
                              type="button"
                              onClick={() =>
                                completeOrder(order._id)
                              }
                              disabled={
                                updatingOrder === order._id
                              }
                              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#F3EBDD] text-[#3F4A36] hover:bg-[#C9A45C] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                              {updatingOrder === order._id
                                ? "Updating..."
                                : "Placed"}

                            </button>

                          ) : (

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-[#F3EBDD] text-[#3F4A36]"
                              }`}
                            >

                              {getDisplayStatus(
                                order.status
                              )}

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


          {/* ==========================================
              REGISTERED USERS
          ========================================== */}

          <div className="bg-white rounded-2xl shadow-sm border border-[#e8dfd0] mt-8 overflow-hidden">

            <div className="px-6 py-5 border-b border-[#e8dfd0]">

              <h2 className="text-xl font-bold text-[#2C211B]">
                Registered Users
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Customers registered on Olivia Grand
              </p>

            </div>


            {users.length === 0 ? (

              <div className="p-8 text-center text-gray-500">
                No registered users found.
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-[#F3EBDD]">

                    <tr>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#2C211B]">
                        Name
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#2C211B]">
                        Email
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#2C211B]">
                        Phone
                      </th>

                      <th className="text-left px-6 py-4 text-sm font-semibold text-[#2C211B]">
                        Role
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {users.map((user) => (

                      <tr
                        key={user._id}
                        className="border-t border-[#eee5d8] hover:bg-[#faf8f3] transition"
                      >

                        <td className="px-6 py-4">

                          <p className="font-medium text-[#2C211B]">
                            {user.name || "N/A"}
                          </p>

                        </td>


                        <td className="px-6 py-4 text-gray-600">

                          {user.email || "N/A"}

                        </td>


                        <td className="px-6 py-4 text-gray-600">

                          {user.phone || "N/A"}

                        </td>


                        <td className="px-6 py-4">

                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3F4A36] text-white capitalize">

                            {user.role || "customer"}

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </>

      )}

    </div>

  );

}

export default Dashboard;

