"use client";

import Image from "next/image";
import React from "react";

const ConnectWithCeleb = () => {
  return (
    <div className="bg-gray-50 rounded-3xl p-10 md:px-20 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left gap-8">
      {/* Left Image */}
      <div className="w-40 h-40 relative rotate-[-10deg] shadow-lg rounded-2xl overflow-hidden">
        <Image
          src="/images/connect.webp"
          alt="Kids Party"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center md:items-start">
        <p className="text-sm text-gray-400 mb-2">Become a Contributor</p>
        <h2 className="text-3xl font-semibold leading-tight text-gray-900 mb-4">
          Connect with Celebrities
          <br />
          Like Never
          <br />
          Before
        </h2>
        <p className="text-gray-500 max-w-md mb-4">
          Our platform provides a unique opportunity to engage directly with
          your favorite celebrities in a personal and meaningful way.
        </p>
        <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
          Join as a Contributor
        </button>
      </div>

      {/* Right Image */}
      <div className="w-40 h-40 relative rotate-[10deg] shadow-lg rounded-2xl overflow-hidden">
        <Image
          src="/images/connect2.webp"
          alt="Skincare"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default ConnectWithCeleb;
