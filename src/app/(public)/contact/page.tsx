"use client";

import { useSetting } from "@/contexts/setting";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import Chat from "./_component/chat";

const Contact = () => {
  const { settings } = useSetting();
  console.log(settings);
  return (
    <div className="max-w-[75rem] mx-auto px-4 pt-28">
      <section className="px-6 py-12">
        <div className="max-w-4xl">
          <h2 className="text-6xl font-extrabold text-gray-900">
            Let’s connect and get to know each other
          </h2>
          <p className="text-gray-600 mt-2">
            Passage its ten led hearted removal cordial. Preference any
            astonished unreserved.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {/* Call Us */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center items-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
              <FaPhone className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold">Call us</h3>
            <p className="text-gray-600 mt-2">
              Reach out via phone for quick assistance.
            </p>
            <div className="mt-4 flex justify-center space-x-3">
              <a
                href="tel:+123456789"
                className="px-3 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm"
              >
                +(222) 6543 677
              </a>
              <a
                href="tel:+2224567586"
                className="px-3 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm"
              >
                +(222) 4567 586
              </a>
            </div>
          </div>

          {/* Email Us */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center items-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
              <FaEnvelope className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold">Email us</h3>
            <p className="text-gray-600 mt-2">
              Send us an email for inquiries.
            </p>
            <a
              href={`mailto:${settings.mail.name || "example@gmail.com"}`}
              className="mt-4 text-red-500 underline block"
            >
              {settings.mail.name || "example@gmail.com"}
            </a>
          </div>

          {/* Social Media */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition relative">
            <div className="flex justify-center items-center w-14 h-14 bg-orange-100 rounded-full mx-auto mb-4">
              <FaEnvelope className="text-orange-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold">Social media</h3>
            <p className="text-gray-600 mt-2">
              Connect with us on social platforms.
            </p>
            <div className="mt-4 flex justify-center space-x-3">
              <FaFacebook className="text-blue-600 text-xl cursor-pointer" />
              <FaInstagram className="text-pink-500 text-xl cursor-pointer" />
              <FaTwitter className="text-blue-400 text-xl cursor-pointer" />
              <FaLinkedin className="text-blue-700 text-xl cursor-pointer" />
            </div>
            {/* Decorative Star */}
            <div className="absolute -top-5 -right-5 text-orange-400 text-3xl">
              ✺
            </div>
          </div>
        </div>
      </section>
      <section className=" py-12 flex flex-col md:flex-row items-center gap-10 mb-16">
        {/* Left Image */}
        <div className="flex-1">
          <img
            src={"/images/support.avif"}
            alt="Traveler"
            className="w-full  mx-auto"
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 bg-gray-100 p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-gray-900">Send us message</h2>

          {/* Form */}
          <form className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your name *
                </label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address *
                </label>
                <input
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile number *
              </label>
              <input
                type="tel"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message *
              </label>
              <textarea
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded"
                required
              />
              <span>
                By submitting this form you agree to our terms and conditions.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Chat />
    </div>
  );
};

export default Contact;
