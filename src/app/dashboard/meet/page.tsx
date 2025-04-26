"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import {
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { useMeet } from "@/contexts/meet";
import { useToastNotification } from "@/contexts/toastNotification";
import Loading from "@/app/_components/loading";
import { LuHandshake } from "react-icons/lu";
import moment from "moment";
import Image from "next/image";

const tabItems = [
  {
    id: "Pending",
    label: "Pending Meeting",
    icon: <HiOutlineClock size={18} />,
  },
  {
    id: "Confirmed",
    label: "Upcoming Meeting",
    icon: <HiOutlineCalendar size={18} />,
  },
  {
    id: "Cancelled",
    label: "Canceled Meeting",
    icon: <HiOutlineXCircle size={18} />,
  },
  {
    id: "Completed",
    label: "Completed Meeting",
    icon: <HiOutlineCheckCircle size={18} />,
  },
];

function Meet() {
  const { meets, fetchMeets } = useMeet();
  const { addNotification } = useToastNotification();
  const [activeTab, setActiveTab] = useState("Pending");
  const [loading, setLoading] = useState(true);

  const filteredMeets = meets.filter((b) => b.status === activeTab);

  useEffect(() => {
    const loadMeets = async () => {
      try {
        setLoading(true);
        await fetchMeets();
      } catch (error: any) {
        addNotification({ message: error, error: true });
      } finally {
        setLoading(false);
      }
    };
    loadMeets();
  }, []);

  return (
    <div>
      <div className="text-red-500 text-xl md:text-2xl font-semibold mb-6">
        Meet & Greet
      </div>
      <div className="h-[50rem] w-full bg-gray-100 rounded-lg  p-4">
        <div className="flex gap-6 mt-4 border-b overflow-x-auto w-full">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 pb-2 px-3 text-lg font-bold whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-red-500 border-b-2 border-red-5text-red-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-6">
          {loading ? (
            <Loading />
          ) : filteredMeets.length > 0 ? (
            filteredMeets.map((meet) => (
              <div
                key={meet._id}
                className="rounded-2xl shadow-md border border-gray-200 mb-6 bg-white transition hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border-b border-gray-100">
                  {/* Celebrity Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <Image
                      src={meet?.celebrityId.image || ""}
                      alt="Celebrity"
                      className="object-cover h-16 w-16 rounded-full ring-2 ring-blue-100"
                      width={64}
                      height={64}
                    />
                    <div>
                      <p className="text-lg font-semibold capitalize text-gray-800">
                        {meet.celebrityId.fullName}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {meet.celebrityId.job.join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium
                      ${
                        meet.status === "Pending"
                          ? "text-yellow-700 bg-yellow-100"
                          : meet.status === "Completed"
                          ? "text-green-700 bg-green-100"
                          : "text-red-700 bg-red-100"
                      }
                    `}
                    >
                      {meet.status}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 py-5 text-sm text-gray-700">
                  <div>
                    <p className="text-gray-500 mb-1">Requested By</p>
                    <p className="font-medium capitalize">
                      {meet.firstName} {meet.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Duration</p>
                    <p className="font-medium">{meet.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Location</p>
                    <p className="font-medium capitalize">
                      {meet.state}, {meet.city}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-6">
              No {activeTab} meets available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Meet;
