import { useState } from "react";
import api from "../services/api";

function Reservations() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);


      // ==========================================
      // GET LOGIN TOKEN
      // ==========================================

      const token = localStorage.getItem("token");


      if (!token) {

        alert("Please login first to reserve a table.");

        return;

      }


      // ==========================================
      // CHECK FORM DATA
      // ==========================================

      if (
        !formData.name ||
        !formData.phone ||
        !formData.date ||
        !formData.time ||
        !formData.guests
      ) {

        alert("Please fill all required fields.");

        return;

      }


      // ==========================================
      // CHECK DATE
      // ==========================================

      const today = new Date()
        .toISOString()
        .split("T")[0];


      if (formData.date < today) {

        alert("Please select today or a future date.");

        return;

      }


      // ==========================================
      // CHECK AVAILABLE TABLES
      // ==========================================

      const availabilityResponse = await api.get(
        "/reservations/availability",
        {
          params: {
            date: formData.date,
            timeSlot: formData.time,
            partySize: Number(formData.guests),
          },
        }
      );


      const availabilityData =
        availabilityResponse.data;


      const availableTables =
        availabilityData.data || [];


      // ==========================================
      // NO TABLE AVAILABLE
      // ==========================================

      if (availableTables.length === 0) {

        alert(
          "Sorry, no table is available for this date and time."
        );

        return;

      }


      // ==========================================
      // SELECT FIRST AVAILABLE TABLE
      // ==========================================

      const selectedTable =
        availableTables[0];


      // ==========================================
      // RESERVATION DATA
      // ==========================================

      const reservationData = {

        tableId: selectedTable._id,

        partySize: Number(formData.guests),

        date: formData.date,

        timeSlot: formData.time,

        contactPhone: formData.phone,

        specialRequests:
          `Reservation for ${formData.name}`,

      };


      console.log(
        "Sending reservation:",
        reservationData
      );


      // ==========================================
      // SEND RESERVATION TO BACKEND
      // ==========================================

      const response = await api.post(
        "/reservations",
        reservationData
      );


      console.log(
        "Reservation response:",
        response.data
      );


      // ==========================================
      // SUCCESS
      // ==========================================

      alert(
        "Table reserved successfully!"
      );


      // ==========================================
      // RESET FORM
      // ==========================================

      setFormData({

        name: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",

      });


    } catch (error) {

      console.error(
        "Reservation error:",
        error
      );


      // ==========================================
      // BACKEND ERROR
      // ==========================================

      alert(
        error.response?.data?.message ||
        "Unable to reserve table. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="bg-[#F3EBDD] min-h-screen py-20">

      <div className="max-w-4xl mx-auto px-6">


        <div className="text-center mb-12">

          <p className="text-[#C9A45C] uppercase tracking-[4px]">

            Reservations

          </p>


          <h1 className="font-serif text-5xl text-[#2C211B] mt-3">

            Book Your Table

          </h1>


          <p className="text-[#6B7355] mt-4">

            Reserve your table at Olivia Grand.

          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm"
        >

          <div className="grid md:grid-cols-2 gap-5">


            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
            />


            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
            />


            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
            />


            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
            />


            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="md:col-span-2 px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
            >

              <option value="1">
                1 Guest
              </option>

              <option value="2">
                2 Guests
              </option>

              <option value="3">
                3 Guests
              </option>

              <option value="4">
                4 Guests
              </option>

              <option value="5">
                5 Guests
              </option>

              <option value="6">
                6 Guests
              </option>

              <option value="7">
                7 Guests
              </option>

              <option value="8">
                8 Guests
              </option>

            </select>

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full mt-7 bg-[#3F4A36] text-white py-3 rounded-md hover:bg-[#2C211B] transition disabled:opacity-60"
          >

            {loading
              ? "Checking & Reserving..."
              : "Reserve Table"}

          </button>


        </form>

      </div>

    </div>

  );

}

export default Reservations;

