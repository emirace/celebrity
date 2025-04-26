"use client";

import Image from "next/image";
import { FaInstagram, FaYoutube, FaTiktok, FaFacebook } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-30 md:pt-0 bg-white md:max-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text Column */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl sm:text-5xl font-medium text-gray-900 leading-tight">
            Your Direct Link to Celebrity{" "}
            <span className="inline-flex gap-2 items-center">
              <Image
                src="/images/youtube.png"
                alt="Youtube"
                width={40}
                height={40}
                className="w-full h-auto object-cover"
              />{" "}
              Greetings
            </span>{" "}
            <br />& Endorsements{" "}
            <span className="inline-block align-middle ml-2">
              {" "}
              <Image
                src="/images/announce.png"
                alt="Anoune"
                width={40}
                height={40}
                className="w-full h-auto object-contain"
              />
            </span>
          </h1>

          <p className="mt-6 md:w-3/5 text-gray-500 text-lg">
            At M-Fanstar, we bring your favorite artists closer to you and we
            make it possible.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/login"
              className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
            <button className="bg-gray-100 text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
              Explore
            </button>
          </div>

          {/* Rating and Social Icons */}
          <div className="mt-8 flex flex-col gap-6 flex-wrap">
            {/* <div className="flex items-center gap-2 text-sm text-gray-700">
              <BsStarFill className="text-yellow-500" />
              <span>4.8 by Trustpilot</span>
            </div> */}
            <div className="flex gap-3 text-gray-600 text-lg">
              {/* <div className="bg-red-500 rounded-full p-2"> */}
              <FaInstagram className="text-red-500" />
              {/* </div> */}
              <FaYoutube className="text-red-500" />
              <FaTiktok className="text-red-500" />
              <FaFacebook className="text-red-500" />
            </div>
          </div>
        </div>

        {/* Image Column */}
        <div className="flex-1 relative">
          <Image
            src="/images/hero.png"
            alt="Hero Person"
            width={500}
            height={500}
            className="w-full h-auto object-cover"
          />

          {/* Video Count Badge */}
          <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-3">
            <div className="flex gap-1">
              <Image
                className="object-cover rounded-full"
                src="/images/celeb1.jpg"
                alt="1"
                width={30}
                height={30}
              />
              <Image
                className="object-cover rounded-full"
                src="/images/celeb2.avif"
                alt="2"
                width={30}
                height={30}
              />
              <Image
                className="object-cover rounded-full"
                src="/images/celeb3.avif"
                alt="3"
                width={30}
                height={30}
              />
            </div>
            <div className="text-sm flex items-end gap-2 font-medium text-gray-900">
              <span className="text-4xl">
                7<span className="text-4xl text-red-500">K</span>
              </span>
              <div className="text-gray-500 text-xs">
                Top
                <br /> Celebrities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
