import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

import Dashboard from "../pages/Dashboard";
import MenuManagement from "../pages/MenuManagement";
import EditMenu from "../pages/EditMenu";
import Orders from "../pages/Orders";

import Customers from "../pages/Customers";
import Payments from "../pages/Payments";
import Reports from "../pages/Reports";
import Reservations from "../pages/Reservations";
import Reviews from "../pages/Reviews";
import Settings from "../pages/Settings";


function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (

    <div className="min-h-screen bg-[#F3EBDD]">

      {/* ==========================================
          ADMIN NAVBAR
      ========================================== */}

      <AdminNavbar
        onMenuClick={() => setSidebarOpen(true)}
      />


      {/* ==========================================
          SIDEBAR + MAIN CONTENT
      ========================================== */}

      <div className="flex min-h-[calc(100vh-80px)]">

        {/* SIDEBAR */}

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />


        {/* MAIN CONTENT */}

        <main className="flex-1 min-w-0 bg-[#F3EBDD]">

          <div className="p-1 sm:p-2 lg:p-0">

            <Routes>

              {/* ==========================================
                  DASHBOARD
              ========================================== */}
              <Route
                path="/"
                element={<Dashboard />}
              />
              <Route
                path="/admin"
                element={<Dashboard />}
              />


              {/* ==========================================
                  ORDERS
              ========================================== */}

              <Route
                path="/admin/orders"
                element={<Orders />}
              />


              {/* ==========================================
                  MENU MANAGEMENT
              ========================================== */}

              <Route
                path="/admin/menu"
                element={<MenuManagement />}
              />


              {/* ADD MENU */}

              <Route
                path="/admin/menu/add"
                element={<EditMenu />}
              />


              {/* EDIT MENU */}

              <Route
                path="/admin/menu/edit/:id"
                element={<EditMenu />}
              />


              {/* ==========================================
                  CUSTOMERS
              ========================================== */}

              <Route
                path="/admin/customers"
                element={<Customers />}
              />


              {/* ==========================================
                  RESERVATIONS
              ========================================== */}

              <Route
                path="/admin/reservations"
                element={<Reservations />}
              />


              {/* ==========================================
                  PAYMENTS
              ========================================== */}

              <Route
                path="/admin/payments"
                element={<Payments />}
              />


              {/* ==========================================
                  REVIEWS
              ========================================== */}

              <Route
                path="/admin/reviews"
                element={<Reviews />}
              />


              {/* ==========================================
                  REPORTS
              ========================================== */}

              <Route
                path="/admin/reports"
                element={<Reports />}
              />


              {/* ==========================================
                  SETTINGS
              ========================================== */}

              <Route
                path="/admin/settings"
                element={<Settings />}
              />


            </Routes>

          </div>

        </main>

      </div>

    </div>

  );

}


export default AdminLayout;

