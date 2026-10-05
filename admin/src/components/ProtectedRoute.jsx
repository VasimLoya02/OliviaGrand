import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("adminToken");

  // Agar admin login nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar login hai to page show karo
  return children;
}

export default ProtectedRoute;

