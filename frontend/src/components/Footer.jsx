import { Link } from "react-router-dom";

function Footer() {

  return (
    <footer className="bg-[#2C211B] text-white">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="font-serif text-2xl text-[#C9A45C]">
              Olivia Grand
            </h2>

            <p className="text-white/60 mt-4 leading-7">
              Fine dining, elegant surroundings and warm
              hospitality.
            </p>

          </div>


          <div>

            <h3 className="font-semibold">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 mt-4">

              <Link
                to="/"
                className="text-white/60 hover:text-[#C9A45C]"
              >
                Home
              </Link>

              <Link
                to="/menu"
                className="text-white/60 hover:text-[#C9A45C]"
              >
                Menu
              </Link>

              <Link
                to="/about"
                className="text-white/60 hover:text-[#C9A45C]"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-white/60 hover:text-[#C9A45C]"
              >
                Contact
              </Link>

            </div>

          </div>


          <div>

            <h3 className="font-semibold">
              Restaurant
            </h3>

            <div className="flex flex-col gap-3 mt-4 text-white/60">

              <p>
                11 AM - 11 PM
              </p>

              <p>
                Bhavnagar, Gujarat
              </p>

              <p>
                +91 8866* *2660
              </p>

            </div>

          </div>


          <div>

            <h3 className="font-semibold">
              Book a Table
            </h3>

            <p className="text-white/60 mt-4">
              Reserve your table for a memorable dining experience.
            </p>

            <Link
              to="/reservations"
              className="inline-block mt-5 bg-[#C9A45C] text-[#2C211B] px-5 py-3 rounded-md font-semibold"
            >
              Reserve Now
            </Link>

          </div>

        </div>


        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/50 text-sm">

          © 2026 Olivia Grand Hotel & Restaurant.

        </div>

      </div>

    </footer>
  );
}

export default Footer;