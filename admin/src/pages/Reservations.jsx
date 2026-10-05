import { useEffect, useState } from "react";
import api from "../services/api";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/admin/reservations"
      );

      setReservations(
        response.data.data || []
      );

    } catch (error) {
      console.error(
        "Reservations error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to load reservations"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="min-h-screen bg-[#F3EBDD] p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-[#C9A45C] text-xs uppercase tracking-[3px] font-bold">
            Table Management
          </p>

          <h1 className="text-4xl sm:text-5xl font-serif text-[#2C211B] mt-2">
            Reservations
          </h1>

          <p className="text-[#6B7355] mt-2">
            Manage customer table reservations.
          </p>

        </div>


        {/* SUMMARY */}

        <div className="grid sm:grid-cols-3 gap-5 mb-7">

          <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9]">

            <p className="text-[#6B7355]">
              Total Reservations
            </p>

            <p className="text-3xl font-bold text-[#3F4A36] mt-2">
              {reservations.length}
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9]">

            <p className="text-[#6B7355]">
              Confirmed
            </p>

            <p className="text-3xl font-bold text-green-700 mt-2">
              {
                reservations.filter(
                  (item) =>
                    item.status === "confirmed"
                ).length
              }
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8DDC9]">

            <p className="text-[#6B7355]">
              Pending
            </p>

            <p className="text-3xl font-bold text-[#C9A45C] mt-2">
              {
                reservations.filter(
                  (item) =>
                    item.status === "pending"
                ).length
              }
            </p>

          </div>

        </div>


        {/* TABLE */}

        <div className="bg-white rounded-2xl border border-[#E8DDC9] overflow-hidden shadow-sm">

          <div className="px-6 py-5 border-b border-[#E8DDC9]">

            <h2 className="font-serif text-2xl text-[#2C211B]">
              Reservation List
            </h2>

          </div>

          {loading ? (

            <div className="p-12 text-center text-[#6B7355]">
              Loading reservations...
            </div>

          ) : reservations.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl">
                📅
              </div>

              <h3 className="font-serif text-2xl text-[#2C211B] mt-4">
                No Reservations
              </h3>

              <p className="text-[#6B7355] mt-2">
                No table reservations found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-[#F3EBDD] text-left">

                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Date
                    </th>

                    <th className="px-6 py-4">
                      Time
                    </th>

                    <th className="px-6 py-4">
                      Guests
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {reservations.map(
                    (reservation) => (

                      <tr
                        key={reservation._id}
                        className="border-t border-[#E8DDC9] hover:bg-[#F9F5ED]"
                      >

                        <td className="px-6 py-5">

                          <p className="font-semibold text-[#2C211B]">
                            {
                              reservation.name ||
                              reservation.user?.name ||
                              "Customer"
                            }
                          </p>

                          <p className="text-xs text-[#6B7355]">
                            {
                              reservation.email ||
                              reservation.user?.email ||
                              "-"
                            }
                          </p>

                        </td>

                        <td className="px-6 py-5 text-[#6B7355]">
                          {reservation.date
                            ? new Date(
                                reservation.date
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        <td className="px-6 py-5 text-[#6B7355]">
                          {reservation.time || "-"}
                        </td>

                        <td className="px-6 py-5 font-semibold">
                          {reservation.guests ||
                            reservation.partySize ||
                            "-"}
                        </td>

                        <td className="px-6 py-5">

                          <span className="
                            px-3
                            py-1
                            rounded-full
                            bg-[#E8DDC9]
                            text-[#3F4A36]
                            text-xs
                            font-semibold
                            capitalize
                          ">
                            {reservation.status ||
                              "pending"}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Reservations;