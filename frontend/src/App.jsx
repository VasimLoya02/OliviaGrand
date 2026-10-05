import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuDetails from "./pages/MenuDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Customers from "./pages/Customers";
import ProductDetail from "./pages/ProductDetail";
function App() {

    return (

        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex-1">

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/menu"
                        element={<Menu />}
                    />

                    <Route
                        path="/menu/:id"
                        element={<MenuDetails />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/reservations"
                        element={
                            <ProtectedRoute>
                                <Reservations />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/reviews"
                        element={
                            <ProtectedRoute>
                                <Reviews />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                    <Route path="/contact" element={<Contact />} />

                    <Route path="/about" element={<About />} />
                   
                   
                    <Route
                        path="/menu/:id"
                        element={<ProductDetail />}
                    />


                </Routes>

            </div>

            <Footer />

        </div>

    );
}

export default App;