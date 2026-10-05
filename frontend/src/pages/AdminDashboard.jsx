import { Link } from "react-router-dom";

function AdminDashboard() {

  const cards = [

    {
      title: "Orders",
      icon: "🛒",
      description: "View and manage customer orders.",
      path: "/admin/orders",
    },

    {
      title: "Menu",
      icon: "🍽️",
      description: "Manage restaurant menu items.",
      path: "/admin/menu",
    },

    {
      title: "Customers",
      icon: "👥",
      description: "View registered customers.",
      path: "/admin/customers",
    },

    {
      title: "Reservations",
      icon: "📅",
      description: "Manage table reservations.",
      path: "/admin/reservations",
    },

    {
      title: "Payments",
      icon: "💳",
      description: "Monitor customer payments.",
      path: "/admin/payments",
    },

    {
      title: "Reviews",
      icon: "⭐",
      description: "Manage customer reviews.",
      path: "/admin/reviews",
    },

    {
      title: "Analytics",
      icon: "📊",
      description: "View restaurant performance.",
      path: "/admin/reports",
    },

    {
      title: "Staff",
      icon: "👨‍🍳",
      description: "Manage restaurant staff.",
      path: "/admin/staff",
    },

  ];


  return (

    <div className="
      min-h-screen
      bg-[#F3EBDD]
      p-5
      sm:p-8
      lg:p-10
    ">

      <div className="max-w-7xl mx-auto">


        {/* HEADER */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-end
          md:justify-between
          gap-5
        ">

          <div>

            <p className="
              text-[#C9A45C]
              text-xs
              uppercase
              tracking-[4px]
              font-bold
            ">
              Administration
            </p>

            <h1 className="
              font-serif
              text-4xl
              sm:text-5xl
              text-[#2C211B]
              mt-2
            ">
              Admin Dashboard
            </h1>

            <p className="
              text-[#6B7355]
              mt-3
            ">
              Manage your restaurant from one place.
            </p>

          </div>


          <div className="
            bg-[#283322]
            text-[#F3EBDD]
            rounded-2xl
            px-5
            py-4
            shadow-lg
          ">

            <p className="text-xs text-white/50">
              System Status
            </p>

            <div className="flex items-center gap-2 mt-1">

              <span className="
                w-2.5
                h-2.5
                rounded-full
                bg-emerald-400
              "></span>

              <span className="font-semibold">
                All Systems Operational
              </span>

            </div>

          </div>

        </div>


        {/* QUICK STATS */}

        <div className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
          mt-10
        ">

          <div className="bg-white rounded-2xl p-5 border border-[#E8DDC9]">

            <p className="text-sm text-[#6B7355]">
              Today's Orders
            </p>

            <p className="
              text-3xl
              font-bold
              text-[#2C211B]
              mt-2
            ">
              —
            </p>

          </div>


          <div className="bg-white rounded-2xl p-5 border border-[#E8DDC9]">

            <p className="text-sm text-[#6B7355]">
              Revenue
            </p>

            <p className="
              text-3xl
              font-bold
              text-[#3F4A36]
              mt-2
            ">
              ₹—
            </p>

          </div>


          <div className="bg-white rounded-2xl p-5 border border-[#E8DDC9]">

            <p className="text-sm text-[#6B7355]">
              Customers
            </p>

            <p className="
              text-3xl
              font-bold
              text-[#2C211B]
              mt-2
            ">
              —
            </p>

          </div>


          <div className="bg-white rounded-2xl p-5 border border-[#E8DDC9]">

            <p className="text-sm text-[#6B7355]">
              Reservations
            </p>

            <p className="
              text-3xl
              font-bold
              text-[#C9A45C]
              mt-2
            ">
              —
            </p>

          </div>

        </div>


        {/* MANAGEMENT CARDS */}

        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
          mt-8
        ">

          {cards.map((card) => (

            <Link
              key={card.path}
              to={card.path}
              className="
                group
                bg-white
                rounded-2xl
                p-6
                border
                border-[#E8DDC9]
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <div className="
                w-12
                h-12
                rounded-xl
                bg-[#F3EBDD]
                flex
                items-center
                justify-center
                text-2xl
                group-hover:bg-[#C9A45C]
                transition
              ">
                {card.icon}
              </div>


              <h2 className="
                font-serif
                text-2xl
                text-[#2C211B]
                mt-5
              ">
                {card.title}
              </h2>


              <p className="
                text-sm
                text-[#6B7355]
                mt-2
                leading-6
              ">
                {card.description}
              </p>


              <div className="
                mt-5
                text-sm
                font-semibold
                text-[#3F4A36]
              ">
                Open →
              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;