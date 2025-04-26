"use client";

import { FaArrowLeft, FaArrowRight, FaDollarSign } from "react-icons/fa";
import Image from "next/image";
import { useToastNotification } from "@/contexts/toastNotification";
import { useEffect, useState } from "react";
import { getAllMemberships } from "@/services/membership";
import { IMembership } from "@/types/membership";
import Loading from "@/app/_components/loading";
import { useRouter } from "next/navigation";

const Membership = () => {
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState<IMembership[]>([]);
  const router = useRouter();

  const loadMembership = async () => {
    try {
      setLoading(true);
      const res = await getAllMemberships();
      setMembership(res);
    } catch (error) {
      addNotification({ message: error as string, error: true });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMembership();
  }, []);

  return (
    <section className="bg-white text-center px-6 py-28 max-w-8xl mx-auto w-full">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Member Card Registration
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
        Register now to unlock exclusive benefits and manage your membership
        with ease.
      </p>

      {/* Email Input */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <div className="relative">
          <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            placeholder="Enter coupon code"
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition">
          Confirm Coupon
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-10">
        * Your details is safe with us and will not be shared.
      </p>

      {/* Card Slider Section */}
      <div className="flex items-center justify-center gap-4">
        <button className="p-2 rounded-full border border-black">
          <FaArrowLeft />
        </button>

        <div className="flex gap-6 overflow-x-auto no-scrollbar max-w-full p-4">
          {loading ? (
            <Loading />
          ) : (
            membership.map((card, idx) => (
              <div
                onClick={() =>
                  router.push(`/payment?type=membership&id=${card._id}`)
                }
                key={idx}
                className="bg-white rounded-xl flex flex-col items-center cursor-pointer shadow-lg p-4 w-60 flex-shrink-0 text-left hover:shadow-yellow-500"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={card.image}
                    alt={card.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
                <h4 className="font-medium text-sm">{card.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-xl">{card.price}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="p-2 rounded-full border border-black">
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Membership;
