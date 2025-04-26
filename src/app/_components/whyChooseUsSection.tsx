import Image from "next/image";
import React from "react";
import { RiArrowRightUpLine } from "react-icons/ri";

const features = [
  {
    title: "Meet Your Favorite Celebrities",
    description:
      "Get exclusive opportunities to meet and interact with your favorite stars through our platform.",
  },
  {
    title: "Fan Cards for Exclusive Perks",
    description:
      "Unlock special privileges and rewards with personalized fan cards designed for true fans.",
  },
  {
    title: "Secure and Hassle-Free Bookings",
    description:
      "Book meet-and-greets, events, and personalized messages with ease and complete security.",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="bg-[#f6f6f6] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-medium mb-10">
          Bridging the Gap <br className="hidden sm:block" /> Between Artists
          and Fans
        </h2>

        <div className="relative rounded-3xl overflow-hidden">
          {/* Background image */}
          <img
            src="/images/whyus.png"
            alt="Fans and Artists"
            className="w-full h-full object-cover"
          />

          {/* Top Right Floating Card */}
          <div className="hidden md:block md:absolute top-5 right-5 bg-white rounded-2xl p-5 shadow-xl w-72 z-10">
            <p className="text-lg font-medium leading-tight mb-4">
              Offering a unique <br /> and unforgettable <br /> experience.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/experience.jpg"
                  alt="Experience"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-xs font-medium">NEW EXPERIENCE</span>
              </div>
              <RiArrowRightUpLine className="w-5 h-5" />
            </div>
          </div>

          {/* Bottom Feature Section */}
          <div className="md:absolute bottom-0 left-0 right-0 bg-black md:bg-black/60 text-white p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10">
            {features.map((feature, idx) => (
              <div key={idx} className="md:w-1/3">
                {idx === 0 && (
                  <button className="text-xs mb-2 px-3 py-1 rounded-full bg-white/90 text-black">
                    Why Choose Us
                  </button>
                )}
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
