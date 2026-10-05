import { Link } from "react-router-dom";

function NotFound() {

  return (
    <div className="min-h-screen bg-[#F3EBDD] flex items-center justify-center px-6">

      <div className="text-center">

        <p className="text-[#C9A45C] text-7xl font-serif">
          404
        </p>

        <h1 className="font-serif text-4xl text-[#2C211B] mt-4">
          Page Not Found
        </h1>

        <p className="text-[#6B7355] mt-4">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-7 bg-[#3F4A36] text-white px-7 py-3 rounded-md"
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;