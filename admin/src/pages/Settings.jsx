import { useState } from "react";

function Settings() {
  const [restaurant, setRestaurant] = useState({
    name: "Olivia Grand",
    email: "admin@oliviagrand.com",
    phone: "",
    address: "",
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    reservations: true,
    reviews: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRestaurant((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleNotification = (name) => {
    setNotifications((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "restaurantSettings",
      JSON.stringify(restaurant)
    );

    localStorage.setItem(
      "notificationSettings",
      JSON.stringify(notifications)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F3EBDD] p-4 sm:p-6 lg:p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-[#C9A45C] text-xs uppercase tracking-[3px] font-bold">
            System Configuration
          </p>

          <h1 className="text-4xl sm:text-5xl font-serif text-[#2C211B] mt-2">
            Settings
          </h1>

          <p className="text-[#6B7355] mt-2">
            Manage your restaurant administration settings.
          </p>

        </div>


        <form onSubmit={handleSave} className="space-y-6">

          {/* RESTAURANT INFORMATION */}

          <div className="bg-white rounded-2xl border border-[#E8DDC9] shadow-sm p-6 sm:p-8">

            <h2 className="font-serif text-2xl text-[#2C211B]">
              Restaurant Information
            </h2>

            <p className="text-[#6B7355] mt-1">
              Basic restaurant details.
            </p>


            <div className="grid md:grid-cols-2 gap-5 mt-7">

              <div>

                <label className="block text-sm font-semibold text-[#2C211B] mb-2">
                  Restaurant Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={restaurant.name}
                  onChange={handleChange}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#E8DDC9]
                    outline-none
                    focus:border-[#C9A45C]
                  "
                />

              </div>


              <div>

                <label className="block text-sm font-semibold text-[#2C211B] mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={restaurant.email}
                  onChange={handleChange}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#E8DDC9]
                    outline-none
                    focus:border-[#C9A45C]
                  "
                />

              </div>


              <div>

                <label className="block text-sm font-semibold text-[#2C211B] mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={restaurant.phone}
                  onChange={handleChange}
                  placeholder="Restaurant phone"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#E8DDC9]
                    outline-none
                    focus:border-[#C9A45C]
                  "
                />

              </div>


              <div>

                <label className="block text-sm font-semibold text-[#2C211B] mb-2">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={restaurant.address}
                  onChange={handleChange}
                  placeholder="Restaurant address"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-[#E8DDC9]
                    outline-none
                    focus:border-[#C9A45C]
                  "
                />

              </div>

            </div>

          </div>


          {/* NOTIFICATIONS */}

          <div className="bg-white rounded-2xl border border-[#E8DDC9] shadow-sm p-6 sm:p-8">

            <h2 className="font-serif text-2xl text-[#2C211B]">
              Notifications
            </h2>

            <p className="text-[#6B7355] mt-1">
              Choose which notifications you want to receive.
            </p>


            <div className="space-y-4 mt-7">

              {[
                {
                  key: "newOrders",
                  title: "New Orders",
                  description:
                    "Receive notifications when a new order is placed.",
                },
                {
                  key: "reservations",
                  title: "Reservations",
                  description:
                    "Receive notifications for new table reservations.",
                },
                {
                  key: "reviews",
                  title: "Customer Reviews",
                  description:
                    "Receive notifications when customers leave reviews.",
                },
              ].map((item) => (

                <div
                  key={item.key}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    p-4
                    rounded-xl
                    bg-[#F9F5ED]
                  "
                >

                  <div>

                    <h3 className="font-semibold text-[#2C211B]">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#6B7355] mt-1">
                      {item.description}
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      handleNotification(item.key)
                    }
                    className={`
                      relative
                      w-14
                      h-7
                      rounded-full
                      transition
                      flex-shrink-0
                      ${
                        notifications[item.key]
                          ? "bg-[#3F4A36]"
                          : "bg-[#D9CCB7]"
                      }
                    `}
                  >

                    <span
                      className={`
                        absolute
                        top-1
                        w-5
                        h-5
                        bg-white
                        rounded-full
                        transition
                        ${
                          notifications[item.key]
                            ? "left-8"
                            : "left-1"
                        }
                      `}
                    />

                  </button>

                </div>

              ))}

            </div>

          </div>


          {/* SAVE */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {saved && (

              <p className="text-green-700 font-semibold">
                ✓ Settings saved successfully
              </p>

            )}

            <button
              type="submit"
              className="
                sm:ml-auto
                bg-[#3F4A36]
                text-white
                px-8
                py-3.5
                rounded-xl
                font-semibold
                hover:bg-[#2C211B]
                transition
              "
            >
              Save Settings
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Settings;