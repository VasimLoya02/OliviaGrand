import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import AddMenuItem from "./pages/AddMenuItem";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ==========================================
            ADMIN LOGIN
        ========================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ==========================================
            ADD MENU ITEM
        ========================================== */}

        <Route
          path="/menu/add"
          element={
            <ProtectedRoute>
              <AddMenuItem />
            </ProtectedRoute>
          }
        />


        {/* ==========================================
            ADMIN PANEL
        ========================================== */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />


        {/* ==========================================
            404
        ========================================== */}

        <Route
          path="*"
          element={
            <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center">

              <div className="text-center">

                <h1 className="text-6xl font-serif text-[#2C211B]">
                  404
                </h1>

                <p className="mt-3 text-[#6B7355]">
                  Page not found
                </p>

              </div>

            </div>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;