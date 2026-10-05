import { useState } from "react";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

  };


  const handleSubmit = (event) => {

    event.preventDefault();

    console.log("Contact Form:", formData);

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  };


  return (
    <div>

      <section className="bg-[#3F4A36] py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-[#C9A45C] uppercase tracking-[4px]">
            Get In Touch
          </p>

          <h1 className="font-serif text-5xl text-white mt-4">
            We'd Love to Hear From You
          </h1>

          <p className="text-white/70 mt-5">
            Questions, feedback or special requests?
            Contact the Olivia Grand team.
          </p>

        </div>

      </section>


      <section className="bg-[#F3EBDD] py-16">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-xl text-center">

              <div className="text-2xl text-[#C9A45C]">
                ☎
              </div>

              <h3 className="font-serif text-xl text-[#2C211B] mt-3">
                Call Us
              </h3>

              <p className="text-[#6B7355] mt-2">
                +91 8866* *2660
              </p>

            </div>


            <div className="bg-white p-6 rounded-xl text-center">

              <div className="text-2xl text-[#C9A45C]">
                ✉
              </div>

              <h3 className="font-serif text-xl text-[#2C211B] mt-3">
                Email
              </h3>

              <p className="text-[#6B7355] mt-2">
                hello@oliviagrand.com
              </p>

            </div>


            <div className="bg-white p-6 rounded-xl text-center">

              <div className="text-2xl text-[#C9A45C]">
                ⌂
              </div>

              <h3 className="font-serif text-xl text-[#2C211B] mt-3">
                Address
              </h3>

              <p className="text-[#6B7355] mt-2">
                Bhavnagar, Gujarat, India
              </p>

            </div>


            <div className="bg-white p-6 rounded-xl text-center">

              <div className="text-2xl text-[#C9A45C]">
                ◷
              </div>

              <h3 className="font-serif text-xl text-[#2C211B] mt-3">
                Opening Hours
              </h3>

              <p className="text-[#6B7355] mt-2">
                11 AM - 11 PM
              </p>

            </div>

          </div>

        </div>

      </section>


      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-14">

            <div>

              <p className="text-[#C9A45C] uppercase tracking-[4px]">
                Send a Message
              </p>

              <h2 className="font-serif text-4xl text-[#2C211B] mt-3">
                Contact Our Team
              </h2>

              <p className="text-[#6B7355] mt-5 leading-7">
                Have a question or special request? Fill out the
                form and our team will get back to you.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
              />


              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
              />


              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
              />


              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 border border-[#E8DDC9] rounded-md outline-none focus:border-[#C9A45C]"
              ></textarea>


              <button
                type="submit"
                className="bg-[#3F4A36] text-white px-7 py-3 rounded-md hover:bg-[#2C211B] transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;