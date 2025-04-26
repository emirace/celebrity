"use client";

import { FaArrowLeft, FaArrowRight, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

const cards = [
  {
    title: "Corporate Premium Elite",
    image: "/cards/corporate-premium.png",
  },
  {
    title: "Business Premium Elite",
    image: "/cards/business-premium.png",
  },
  {
    title: "Business Platinum Plus",
    image: "/cards/business-platinum.png",
  },
];

const Events = () => {
  return (
    <section className="bg-white text-center px-6 py-20 md:px-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        More Powerful Than Platinum
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
        Gain Complete Command Over Your Company’s Expenses, Ensuring Absolute
        Transparency In Real-Time.
      </p>

      {/* Email Input */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            placeholder="Enter your email address"
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition">
          Apply Now
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-10">
        * We Never Use Any Email For Sales, It`&apos;`s Private
      </p>

      {/* Card Slider Section */}
      <div className="flex items-center justify-center gap-4">
        <button className="p-2 rounded-full border border-black">
          <FaArrowLeft />
        </button>

        <div className="flex gap-6 overflow-x-auto no-scrollbar max-w-full">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-4 w-60 flex-shrink-0 text-left"
            >
              <div className="relative w-full h-36 mb-4">
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h4 className="font-medium text-sm">{card.title}</h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-xl">UMO</span>
                <div className="w-5 h-5 bg-black rounded-full" />
                <div className="w-5 h-5 bg-black rounded-full ml-[-10px]" />
              </div>
            </div>
          ))}
        </div>

        <button className="p-2 rounded-full border border-black">
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Events;
