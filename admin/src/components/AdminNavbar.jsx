import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // ==========================================
  // GET LOGGED-IN ADMIN
  // ==========================================

  const getAdminUser = () => {
    try {
      const storedUser = localStorage.getItem("adminUser");

      if (storedUser) {
        return JSON.parse(storedUser);
      }

      return null;
    } catch (error) {
      console.error("Admin user parse error:", error);
      return null;
    }
  };

  const adminUser = getAdminUser();

  // ==========================================
  // ADMIN DETAILS
  // ==========================================

  const adminName =
    adminUser?.name ||
    adminUser?.username ||
    adminUser?.fullName ||
    "Admin";

  const adminEmail =
    adminUser?.email ||
    "admin@oliviagrand.com";

  const adminRole =
    adminUser?.role ||
    "Administrator";

  // First letter for avatar
  const profileLetter = adminName
    .charAt(0)
    .toUpperCase();

  // ==========================================
  // CLOSE PROFILE WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/login");
  };

  // ==========================================
  // PROFILE PAGE
  // ==========================================

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/admin/settings");
  };

  return (
    <header className="h-16 bg-[#2C211B] text-white flex items-center justify-between px-4 md:px-6 shadow-md relative z-50">

      {/* ==========================================
          LEFT SIDE
      ========================================== */}

      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}

        <button
          onClick={onMenuClick}
          className="lg:hidden text-2xl hover:text-[#C9A45C] transition"
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* BRAND */}

        <div>
          <h1 className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-[#F8F1E5]">
            Olivia Grand
          </h1>

          <p className="font-serif text-lg font-semibold tracking-wide text-[#2C211B] truncate">
            Admin Panel
          </p>
        </div>

      </div>


      {/* ==========================================
          RIGHT SIDE
      ========================================== */}

      <div className="flex items-center gap-3">

        {/* ==========================================
            PROFILE
        ========================================== */}

        <div
          ref={profileRef}
          className="relative"
        >

          {/* PROFILE BUTTON */}

          <button
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
            className="
              w-10
              h-10
              rounded-full
              bg-[#C9A45C]
              text-[#2C211B]
              flex
              items-center
              justify-center
              font-bold
              text-lg
              border-2
              border-[#E0BD76]
              hover:bg-[#E0BD76]
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-[#C9A45C]/50
            "
            aria-label="Admin profile"
          >
            {profileLetter}
          </button>


          {/* ==========================================
              PROFILE DROPDOWN
          ========================================== */}

          {profileOpen && (

            <div
              className="
                absolute
                right-0
                top-14
                w-72
                bg-white
                text-[#2C211B]
                rounded-2xl
                shadow-2xl
                border
                border-[#E8DDC9]
                overflow-hidden
              "
            >

              {/* PROFILE HEADER */}

              <div
                className="
                  bg-[#F3EBDD]
                  px-5
                  py-5
                  border-b
                  border-[#E8DDC9]
                "
              >

                <div className="flex items-center gap-3">

                  {/* LARGE AVATAR */}

                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-[#C9A45C]
                      text-[#2C211B]
                      flex
                      items-center
                      justify-center
                      text-xl
                      font-bold
                      border-2
                      border-[#E0BD76]
                      flex-shrink-0
                    "
                  >
                    {profileLetter}
                  </div>


                  {/* NAME */}

                  <div className="min-w-0">

                    <p className="font-bold text-lg truncate">
                      {adminName}
                    </p>

                    <p className="text-xs text-[#6B7355] mt-1">
                      {adminRole}
                    </p>

                  </div>

                </div>

              </div>


              {/* PROFILE DETAILS */}

              <div className="px-5 py-4">

                {/* EMAIL */}

                <div className="mb-4">

                  <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#C9A45C]">
                    Email
                  </p>

                  <p className="text-sm font-medium text-[#2C211B] mt-1 break-all">
                    {adminEmail}
                  </p>

                </div>


                {/* ROLE */}

                <div className="mb-4">

                  <p className="text-xs text-[#6B7355] uppercase tracking-wide">
                    Role
                  </p>

                  <span
                    className="
                      inline-flex
                      mt-1
                      px-3
                      py-1
                      rounded-full
                      bg-[#F3EBDD]
                      text-[#3F4A36]
                      text-xs
                      font-semibold
                      capitalize
                      tracking-wide
                    "
                  >
                    {adminRole}
                  </span>

                </div>


                {/* DIVIDER */}

                <div className="border-t border-[#E8DDC9] my-3"></div>


                {/* SETTINGS / PROFILE */}

                <button
                  onClick={handleProfile}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-lg
                    text-left
                    text-sm
                    font-semibold
                    text-[#3F4A36]
                    hover:bg-[#F3EBDD]
                    transition
                  "
                >
                  <span className="text-lg">
                    ⚙
                  </span>

                  Profile & Settings
                </button>


                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-lg
                    text-left
                    text-sm
                    font-semibold
                    text-red-600
                    hover:bg-red-50
                    transition
                  "
                >
                  <span className="text-lg">
                    ↪
                  </span>

                  Logout
                </button>

              </div>

            </div>

          )}

        </div>


        {/* ==========================================
            LOGOUT BUTTON
            DESKTOP
        ========================================== */}

        <button
          onClick={handleLogout}
          className="
            hidden
            sm:block
            bg-[#C9A45C]
            text-[#2C211B]
            px-4
            py-2
            rounded-lg
            font-semibold
            hover:bg-[#E0BD76]
            transition
          "
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default AdminNavbar;

