"use client";

import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

export default function MeetAndGreetSuccessPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      {showMessage && <Confetti width={width} height={height} />}

      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center transition-opacity duration-500 ease-in-out transform-gpu">
        <div
          className={`transition-all duration-700 ${
            showMessage ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <FaCheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Request Submitted!
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Your Request has been Submitted successful 🎉 <br />
            Your request is currently <strong>pending approval</strong>. We'll
            notify you once it's reviewed.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition shadow-md"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
