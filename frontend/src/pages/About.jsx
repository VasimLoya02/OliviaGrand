function About() {

  return (
    <div>

      <section className="bg-[#3F4A36] py-24">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-[#C9A45C] uppercase tracking-[4px]">
            About Olivia Grand
          </p>

          <h1 className="font-serif text-5xl md:text-6xl text-white mt-4">
            A Place Made for Good Moments
          </h1>

          <p className="text-white/70 mt-6 text-lg">
            Discover our story, philosophy and passion for hospitality.
          </p>

        </div>

      </section>


      <section className="bg-[#F3EBDD] py-20">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9"
            alt="Restaurant"
            className="w-full h-[450px] object-cover rounded-2xl"
          />

          <div>

            <p className="text-[#C9A45C] uppercase tracking-[4px]">
              Our Story
            </p>

            <h2 className="font-serif text-4xl text-[#2C211B] mt-3">
              Built Around Food & People
            </h2>

            <p className="text-[#6B7355] mt-6 leading-8">
              Olivia Grand was created with a simple idea:
              bring delicious food and genuine hospitality together
              in one beautiful place.
            </p>

            <p className="text-[#6B7355] mt-4 leading-8">
              We believe that a restaurant is more than a place to
              eat. It is a place where people meet, celebrate and
              create memories.
            </p>

          </div>

        </div>

      </section>


      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-[#C9A45C] uppercase tracking-[4px]">
              What We Believe
            </p>

            <h2 className="font-serif text-4xl text-[#2C211B] mt-3">
              Our Values
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-8 text-center border border-[#E8DDC9] rounded-xl">

              <div className="text-3xl text-[#C9A45C]">
                ✦
              </div>

              <h3 className="font-serif text-2xl text-[#2C211B] mt-4">
                Quality
              </h3>

              <p className="text-[#6B7355] mt-3">
                We focus on quality ingredients and careful preparation.
              </p>

            </div>


            <div className="p-8 text-center border border-[#E8DDC9] rounded-xl">

              <div className="text-3xl text-[#C9A45C]">
                ✦
              </div>

              <h3 className="font-serif text-2xl text-[#2C211B] mt-4">
                Hospitality
              </h3>

              <p className="text-[#6B7355] mt-3">
                Every guest deserves warm and respectful service.
              </p>

            </div>


            <div className="p-8 text-center border border-[#E8DDC9] rounded-xl">

              <div className="text-3xl text-[#C9A45C]">
                ✦
              </div>

              <h3 className="font-serif text-2xl text-[#2C211B] mt-4">
                Passion
              </h3>

              <p className="text-[#6B7355] mt-3">
                We put passion into every dish and every experience.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;