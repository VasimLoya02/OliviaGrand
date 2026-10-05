function Reviews() {

  return (
    <div className="bg-[#F3EBDD] min-h-screen py-20">

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">

          <p className="text-[#C9A45C] uppercase tracking-[4px]">
            Guest Reviews
          </p>

          <h1 className="font-serif text-5xl text-[#2C211B] mt-3">
            What Our Guests Say
          </h1>

        </div>


        <div className="grid md:grid-cols-3 gap-7 mt-12">

          <div className="bg-white p-7 rounded-xl">

            <div className="text-[#C9A45C]">
              ★★★★★
            </div>

            <p className="text-[#6B7355] mt-4">
              Wonderful food and excellent service.
            </p>

            <h3 className="font-semibold text-[#2C211B] mt-5">
              Guest
            </h3>

          </div>


          <div className="bg-white p-7 rounded-xl">

            <div className="text-[#C9A45C]">
              ★★★★★
            </div>

            <p className="text-[#6B7355] mt-4">
              Beautiful atmosphere and delicious food.
            </p>

            <h3 className="font-semibold text-[#2C211B] mt-5">
              Guest
            </h3>

          </div>


          <div className="bg-white p-7 rounded-xl">

            <div className="text-[#C9A45C]">
              ★★★★★
            </div>

            <p className="text-[#6B7355] mt-4">
              Very friendly and professional service.
            </p>

            <h3 className="font-semibold text-[#2C211B] mt-5">
              Guest
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reviews;