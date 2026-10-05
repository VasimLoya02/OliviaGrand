import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {

  const links = [

    {
      name: "Dashboard",
      path: "/admin",
      icon: "⌂",
    },

    {
      name: "Orders",
      path: "/admin/orders",
      icon: "🛒",
    },

    {
      name: "Menu Management",
      path: "/admin/menu",
      icon: "☷",
    },

    {
      name: "Customers",
      path: "/admin/customers",
      icon: "♟",
    },

    {
      name: "Reservations",
      path: "/admin/reservations",
      icon: "▣",
    },

    {
      name: "Payments",
      path: "/admin/payments",
      icon: "₹",
    },

    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: "★",
    },

    {
      name: "Reports & Analytics",
      path: "/admin/reports",
      icon: "▥",
    },

  ];


  const managementLinks = [


    {
      name: "Settings",
      path: "/admin/settings",
      icon: "⚙",
    },

  ];


  return (

    <>

      {/* MOBILE OVERLAY */}

      {isOpen && (

        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-40
            lg:hidden
          "
        ></div>

      )}


      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          lg:sticky
          top-0
          left-0
          z-50

          w-[270px]
          h-screen

          flex
          flex-col

          bg-gradient-to-b
          from-[#283322]
          via-[#222B1E]
          to-[#192016]

          text-[#F3EBDD]

          border-r
          border-[#C9A45C]/20

          shadow-[8px_0_30px_rgba(44,33,27,0.12)]

          transform
          transition-transform
          duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >


        {/* BRAND */}

        <div className="
          px-5
          py-6
          border-b
          border-white/10
        ">

          <div className="flex items-center gap-3">

            <div className="
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-[#D6B86A]
              to-[#B89148]
              text-[#2C211B]
              text-xl
              shadow-lg
            ">
              🍽
            </div>


            <div>

              <h2 className="
                font-serif
                text-xl
                font-bold
                text-[#F8F1E5]
                tracking-wide
              ">
                Olivia Grand
              </h2>

              <p className="
                mt-0.5
                text-[10px]
                uppercase
                tracking-[2.5px]
                text-[#C9A45C]
              ">
                Admin Management
              </p>

            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="
          flex-1
          overflow-y-auto
          px-3
          py-5
        ">


          {/* MAIN */}

          <p className="
            px-3
            mb-3
            text-[10px]
            font-bold
            uppercase
            tracking-[2px]
            text-white/40
          ">
            Main Menu
          </p>


          <div className="space-y-1.5">

            {links.map((link) => (

              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) => `

                  group

                  flex
                  items-center
                  gap-3

                  w-full

                  px-3.5
                  py-3

                  rounded-xl

                  text-sm

                  transition-all
                  duration-200

                  ${
                    isActive

                      ? `
                        bg-gradient-to-r
                        from-[#C9A45C]
                        to-[#B9914B]

                        text-[#2C211B]

                        font-semibold

                        shadow-lg

                        translate-x-0.5
                      `

                      : `
                        text-white/70

                        hover:bg-white/[0.06]

                        hover:text-white

                        hover:translate-x-1
                      `
                  }

                `}
              >

                <span className="
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  text-base
                ">
                  {link.icon}
                </span>

                <span className="flex-1">
                  {link.name}
                </span>

              </NavLink>

            ))}

          </div>


          {/* MANAGEMENT */}

          <div className="mt-8">

            <p className="
              px-3
              mb-3
              text-[10px]
              font-bold
              uppercase
              tracking-[2px]
              text-white/40
            ">
              Management
            </p>


            <div className="space-y-1.5">

              {managementLinks.map((link) => (

                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={({ isActive }) => `

                    group

                    flex
                    items-center
                    gap-3

                    w-full

                    px-3.5
                    py-3

                    rounded-xl

                    text-sm

                    transition-all
                    duration-200

                    ${
                      isActive

                        ? `
                          bg-gradient-to-r
                          from-[#C9A45C]
                          to-[#B9914B]

                          text-[#2C211B]

                          font-semibold

                          shadow-lg
                        `

                        : `
                          text-white/70

                          hover:bg-white/[0.06]

                          hover:text-white

                          hover:translate-x-1
                        `
                    }

                  `}
                >

                  <span className="
                    w-8
                    h-8
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    text-base
                  ">
                    {link.icon}
                  </span>

                  <span>
                    {link.name}
                  </span>

                </NavLink>

              ))}

            </div>

          </div>

        </nav>


        {/* ADMIN PROFILE */}

        <div className="
          p-4
          border-t
          border-white/10
        ">

          <div className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            bg-white/[0.05]
            border
            border-white/[0.06]
          ">

            <div className="
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-full
              bg-[#C9A45C]
              text-[#2C211B]
              font-bold
            ">
              A
            </div>

            <div className="min-w-0">

              <p className="
                text-sm
                font-semibold
                text-[#F8F1E5]
                truncate
              ">
                Administrator
              </p>

              <p className="
                text-[11px]
                text-white/45
                mt-0.5
              ">
                Restaurant Admin
              </p>

            </div>

            <span className="
              ml-auto
              w-2
              h-2
              rounded-full
              bg-emerald-400
            "></span>

          </div>

        </div>

      </aside>

    </>

  );

}

export default Sidebar;