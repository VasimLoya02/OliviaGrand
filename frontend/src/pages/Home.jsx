import { Link } from "react-router-dom";

function Home() {

  return (
    <div>

      {/* ================= HERO SECTION ================= */}

      <section className="bg-[#F3EBDD] min-h-[calc(100vh-108px)]">

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}

            <div>

              <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm font-semibold mb-5">
                Welcome to Olivia Grand
              </p>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#2C211B] leading-tight">

                Taste the

                <span className="block text-[#3F4A36]">
                  Art of Fine Dining
                </span>

              </h1>

              <p className="mt-6 text-[#6B7355] text-lg max-w-xl">

                Experience delicious cuisine, elegant surroundings
                and warm hospitality at Olivia Grand Hotel &
                Restaurant.

              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  to="/menu"
                  className="bg-[#3F4A36] text-white px-7 py-3 rounded-md hover:bg-[#2C211B] transition"
                >
                  Explore Menu
                </Link>

                <Link
                  to="/reservations"
                  className="border border-[#C9A45C] text-[#2C211B] px-7 py-3 rounded-md hover:bg-[#C9A45C] hover:text-white transition"
                >
                  Book a Table
                </Link>

              </div>

            </div>


            {/* RIGHT IMAGE */}

            <div className="relative">

              <div className="absolute -inset-4 border border-[#C9A45C] rounded-2xl"></div>

              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                alt="Olivia Grand Restaurant"
                className="relative w-full h-[450px] lg:h-[550px] object-cover rounded-2xl"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= STORY SECTION ================= */}

      <section className="bg-white py-20">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm font-semibold">
            Our Story
          </p>

          <h2 className="font-serif text-4xl md:text-5xl text-[#2C211B] mt-3">
            Where Food Meets Hospitality
          </h2>

          <div className="w-16 h-[2px] bg-[#C9A45C] mx-auto my-6"></div>

          <p className="text-[#6B7355] text-lg leading-8">

            Olivia Grand is a place where traditional flavours meet
            modern culinary creativity. From carefully selected
            ingredients to warm hospitality, every detail is designed
            to make your visit memorable.

          </p>

          <Link
            to="/about"
            className="inline-block mt-7 text-[#3F4A36] font-semibold border-b-2 border-[#C9A45C] pb-1"
          >
            Discover Our Story →
          </Link>

        </div>

      </section>


      {/* ================= SIGNATURE DISHES ================= */}

      <section className="bg-[#F3EBDD] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm">
              From Our Kitchen
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#2C211B] mt-3">
              Signature Dishes
            </h2>

            <p className="text-[#6B7355] mt-4">
              A selection of our chef's favourite creations.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition">

              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554"
                alt="Signature dish"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between gap-4">

                  <h3 className="font-serif text-2xl text-[#2C211B]">
                    Royal Platter
                  </h3>

                  <span className="text-[#C9A45C] font-semibold">
                    ₹499
                  </span>

                </div>

                <p className="text-[#6B7355] mt-3">
                  A delicious combination of carefully selected
                  flavours prepared by our chefs.
                </p>

              </div>

            </div>


            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition">

              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                alt="Pizza"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between gap-4">

                  <h3 className="font-serif text-2xl text-[#2C211B]">
                    Grand Special Pizza
                  </h3>

                  <span className="text-[#C9A45C] font-semibold">
                    ₹399
                  </span>

                </div>

                <p className="text-[#6B7355] mt-3">
                  Fresh ingredients, rich flavours and our signature
                  preparation.
                </p>

              </div>

            </div>


            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition">

              <img
                src="https://images.unsplash.com/photo-1551024506-0bccd828d307"
                alt="Dessert"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between gap-4">

                  <h3 className="font-serif text-2xl text-[#2C211B]">
                    Royal Dessert
                  </h3>

                  <span className="text-[#C9A45C] font-semibold">
                    ₹249
                  </span>

                </div>

                <p className="text-[#6B7355] mt-3">
                  A sweet ending crafted specially for our guests.
                </p>

              </div>

            </div>

          </div>


          <div className="text-center mt-10">

            <Link
              to="/menu"
              className="inline-block bg-[#3F4A36] text-white px-7 py-3 rounded-md hover:bg-[#2C211B] transition"
            >
              View Full Menu
            </Link>

          </div>

        </div>

      </section>


      {/* ================= EXPERIENCE ================= */}

      <section className="bg-[#3F4A36] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <div className="text-white">

              <div className="text-[#C9A45C] text-4xl mb-4">
                ✦
              </div>

              <h3 className="font-serif text-2xl">
                Fine Cuisine
              </h3>

              <p className="text-white/70 mt-3">
                Carefully prepared dishes using quality ingredients.
              </p>

            </div>


            <div className="text-white">

              <div className="text-[#C9A45C] text-4xl mb-4">
                ✦
              </div>

              <h3 className="font-serif text-2xl">
                Elegant Ambience
              </h3>

              <p className="text-white/70 mt-3">
                A beautiful environment for memorable moments.
              </p>

            </div>


            <div className="text-white">

              <div className="text-[#C9A45C] text-4xl mb-4">
                ✦
              </div>

              <h3 className="font-serif text-2xl">
                Warm Hospitality
              </h3>

              <p className="text-white/70 mt-3">
                Friendly service that makes every guest feel special.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm">
                Why Olivia Grand
              </p>

              <h2 className="font-serif text-4xl md:text-5xl text-[#2C211B] mt-3">
                More Than Just a Meal
              </h2>

              <p className="text-[#6B7355] mt-6 leading-7">

                Every visit to Olivia Grand is designed to be an
                experience. From the first welcome to the final bite,
                we focus on quality, comfort and memorable service.

              </p>

              <div className="mt-8 space-y-5">

                <div className="flex gap-4">

                  <span className="text-[#C9A45C] text-xl">
                    ✓
                  </span>

                  <div>

                    <h3 className="font-semibold text-[#2C211B]">
                      Fresh Ingredients
                    </h3>

                    <p className="text-[#6B7355]">
                      Quality ingredients selected for every dish.
                    </p>

                  </div>

                </div>


                <div className="flex gap-4">

                  <span className="text-[#C9A45C] text-xl">
                    ✓
                  </span>

                  <div>

                    <h3 className="font-semibold text-[#2C211B]">
                      Professional Service
                    </h3>

                    <p className="text-[#6B7355]">
                      Friendly and attentive hospitality.
                    </p>

                  </div>

                </div>


                <div className="flex gap-4">

                  <span className="text-[#C9A45C] text-xl">
                    ✓
                  </span>

                  <div>

                    <h3 className="font-semibold text-[#2C211B]">
                      Comfortable Atmosphere
                    </h3>

                    <p className="text-[#6B7355]">
                      A relaxing space for family and friends.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
              alt="Restaurant interior"
              className="w-full h-[500px] object-cover rounded-2xl"
            />

          </div>

        </div>

      </section>


      {/* ================= CHEF ================= */}

      <section className="bg-[#F3EBDD] py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
              alt="Our Chef"
              className="w-full h-[500px] object-cover rounded-2xl"
            />

            <div>

              <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm">
                Meet Our Chef
              </p>

              <h2 className="font-serif text-4xl md:text-5xl text-[#2C211B] mt-3">
                Crafted With Passion
              </h2>

              <p className="text-[#6B7355] mt-6 leading-8">

                Our kitchen is guided by passion, creativity and a
                respect for authentic flavours. Every dish is prepared
                with attention to detail and presented with care.

              </p>

              <p className="font-serif text-2xl text-[#3F4A36] mt-6">
                Chef Alexander
              </p>

              <p className="text-[#C9A45C] mt-1">
                Executive Chef
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= REVIEWS ================= */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm">
              Guest Reviews
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#2C211B] mt-3">
              What Our Guests Say
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-7">

            <div className="bg-[#F3EBDD] p-7 rounded-xl">

              <div className="text-[#C9A45C] text-lg">
                ★★★★★
              </div>

              <p className="text-[#6B7355] mt-5">
                "Wonderful food, beautiful ambience and excellent
                service. We had a great evening."
              </p>

              <h3 className="font-semibold text-[#2C211B] mt-5">
                Rahul Mehta
              </h3>

            </div>


            <div className="bg-[#F3EBDD] p-7 rounded-xl">

              <div className="text-[#C9A45C] text-lg">
                ★★★★★
              </div>

              <p className="text-[#6B7355] mt-5">
                "The atmosphere was elegant and the food was
                absolutely delicious."
              </p>

              <h3 className="font-semibold text-[#2C211B] mt-5">
                Priya Shah
              </h3>

            </div>


            <div className="bg-[#F3EBDD] p-7 rounded-xl">

              <div className="text-[#C9A45C] text-lg">
                ★★★★★
              </div>

              <p className="text-[#6B7355] mt-5">
                "A lovely place for family dinner. The staff was
                welcoming and professional."
              </p>

              <h3 className="font-semibold text-[#2C211B] mt-5">
                Amit Patel
              </h3>

            </div>

          </div>

        </div>

      </section>


      {/* ================= RESERVATION CTA ================= */}

      <section className="bg-[#2C211B] py-20">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <p className="text-[#C9A45C] uppercase tracking-[4px] text-sm">
            Your Table Awaits
          </p>

          <h2 className="font-serif text-4xl md:text-5xl text-white mt-4">
            Make Your Evening Special
          </h2>

          <p className="text-white/70 mt-5 max-w-2xl mx-auto">

            Reserve your table and enjoy an unforgettable dining
            experience at Olivia Grand.

          </p>

          <Link
            to="/reservations"
            className="inline-block mt-8 bg-[#C9A45C] text-[#2C211B] px-8 py-3 rounded-md font-semibold hover:bg-[#E0C98D] transition"
          >
            Reserve Your Table
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;