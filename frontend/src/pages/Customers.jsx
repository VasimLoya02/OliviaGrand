import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // FETCH CUSTOMERS
  // ==========================================

  const fetchCustomers = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/admin/customers"
      );

      console.log(
        "Customers:",
        response.data
      );

      setCustomers(
        response.data.data || []
      );

    } catch (error) {

      console.error(
        "Customer fetch error:",
        error
      );

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


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#F3EBDD] p-6">

        <div className="max-w-7xl mx-auto">

          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

            <p className="text-[#6B7355]">
              Loading customers...
            </p>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="min-h-screen bg-[#F3EBDD] p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <p
              className="
                text-[#C9A45C]
                text-xs
                uppercase
                tracking-[3px]
                font-semibold
              "
            >
              Customer Management
            </p>

            <h1
              className="
                font-serif
                text-4xl
                sm:text-5xl
                text-[#2C211B]
                mt-2
              "
            >
              Customers
            </h1>

            <p className="text-[#6B7355] mt-2">
              Manage your restaurant customers.
            </p>

          </div>


          {/* CUSTOMER COUNT */}

          <div
            className="
              bg-white
              rounded-2xl
              px-6
              py-4
              shadow-sm
              border
              border-[#E8DDC9]
            "
          >

            <p className="text-sm text-[#6B7355]">
              Total Customers
            </p>

            <p
              className="
                text-3xl
                font-bold
                text-[#3F4A36]
                mt-1
              "
            >
              {customers.length}
            </p>

          </div>

        </div>


        {/* ==========================================
            CUSTOMER TABLE
        ========================================== */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-[#E8DDC9]
            overflow-hidden
          "
        >

          {/* TABLE HEADER */}

          <div
            className="
              px-6
              py-5
              border-b
              border-[#E8DDC9]
            "
          >

            <h2
              className="
                font-serif
                text-2xl
                text-[#2C211B]
              "
            >
              All Customers
            </h2>

          </div>


          {customers.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl mb-4">
                👥
              </div>

              <h3
                className="
                  font-serif
                  text-2xl
                  text-[#2C211B]
                "
              >
                No Customers Found
              </h3>

              <p className="text-[#6B7355] mt-2">
                No customer accounts are available.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr
                    className="
                      bg-[#F3EBDD]
                      text-left
                    "
                  >

                    <th className="px-6 py-4 text-sm font-semibold text-[#2C211B]">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-[#2C211B]">
                      Email
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-[#2C211B]">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-[#2C211B]">
                      Role
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-[#2C211B]">
                      Joined
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {customers.map((customer) => (

                    <tr
                      key={customer._id}
                      className="
                        border-t
                        border-[#E8DDC9]
                        hover:bg-[#F9F5ED]
                        transition
                      "
                    >

                      {/* CUSTOMER */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div
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
                            "
                          >
                            {customer.name
                              ?.charAt(0)
                              ?.toUpperCase() || "C"}
                          </div>

                          <div>

                            <p
                              className="
                                font-semibold
                                text-[#2C211B]
                              "
                            >
                              {customer.name || "Unknown"}
                            </p>

                            <p
                              className="
                                text-xs
                                text-[#6B7355]
                              "
                            >
                              Customer
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td
                        className="
                          px-6
                          py-5
                          text-[#6B7355]
                        "
                      >
                        {customer.email || "-"}
                      </td>


                      {/* PHONE */}

                      <td
                        className="
                          px-6
                          py-5
                          text-[#6B7355]
                        "
                      >
                        {customer.phone || "-"}
                      </td>


                      {/* ROLE */}

                      <td className="px-6 py-5">

                        <span
                          className="
                            inline-flex
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            bg-[#E8DDC9]
                            text-[#3F4A36]
                          "
                        >
                          {customer.role}
                        </span>

                      </td>


                      {/* JOINED */}

                      <td
                        className="
                          px-6
                          py-5
                          text-sm
                          text-[#6B7355]
                        "
                      >
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
