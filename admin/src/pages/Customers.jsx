import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/customers");

      setCustomers(response.data.data || []);
    } catch (error) {
      console.error("Customers error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to load customers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const value = search.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(value) ||
      customer.email?.toLowerCase().includes(value) ||
      customer.phone?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-[#F3EBDD] p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

          <div>

            <p className="text-[#C9A45C] text-xs uppercase tracking-[3px] font-bold">
              Customer Management
            </p>

            <h1 className="text-4xl sm:text-5xl font-serif text-[#2C211B] mt-2">
              Customers
            </h1>

            <p className="text-[#6B7355] mt-2">
              Manage all registered restaurant customers.
            </p>

          </div>

          <div className="bg-white rounded-2xl px-6 py-4 border border-[#E8DDC9] shadow-sm">

            <p className="text-sm text-[#6B7355]">
              Total Customers
            </p>

            <p className="text-3xl font-bold text-[#3F4A36] mt-1">
              {customers.length}
            </p>

          </div>

        </div>


        {/* SEARCH */}

        <div className="bg-white rounded-2xl p-5 border border-[#E8DDC9] shadow-sm mb-6">

          <input
            type="text"
            placeholder="Search customer by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-[#E8DDC9]
              outline-none
              focus:border-[#C9A45C]
              text-[#2C211B]
            "
          />

        </div>


        {/* TABLE */}

        <div className="bg-white rounded-2xl border border-[#E8DDC9] shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-[#E8DDC9]">

            <h2 className="font-serif text-2xl text-[#2C211B]">
              All Customers
            </h2>

          </div>

          {loading ? (

            <div className="p-12 text-center text-[#6B7355]">
              Loading customers...
            </div>

          ) : filteredCustomers.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl mb-4">
                👥
              </div>

              <h3 className="font-serif text-2xl text-[#2C211B]">
                No Customers Found
              </h3>

              <p className="text-[#6B7355] mt-2">
                No matching customers are available.
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
                      Email
                    </th>

                    <th className="px-6 py-4">
                      Phone
                    </th>

                    <th className="px-6 py-4">
                      Role
                    </th>

                    <th className="px-6 py-4">
                      Joined
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredCustomers.map((customer) => (

                    <tr
                      key={customer._id}
                      className="
                        border-t
                        border-[#E8DDC9]
                        hover:bg-[#F9F5ED]
                        transition
                      "
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="
                            w-11
                            h-11
                            rounded-full
                            bg-[#C9A45C]
                            text-[#2C211B]
                            flex
                            items-center
                            justify-center
                            font-bold
                          ">
                            {customer.name
                              ?.charAt(0)
                              ?.toUpperCase() || "C"}
                          </div>

                          <div>

                            <p className="font-semibold text-[#2C211B]">
                              {customer.name || "Unknown"}
                            </p>

                            <p className="text-xs text-[#6B7355]">
                              Customer
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5 text-[#6B7355]">
                        {customer.email || "-"}
                      </td>

                      <td className="px-6 py-5 text-[#6B7355]">
                        {customer.phone || "-"}
                      </td>

                      <td className="px-6 py-5">

                        <span className="
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          bg-[#E8DDC9]
                          text-[#3F4A36]
                        ">
                          {customer.role || "customer"}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-sm text-[#6B7355]">
                        {customer.createdAt
                          ? new Date(
                              customer.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Customers;