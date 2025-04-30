"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import {
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { useBooking } from "@/contexts/booking";
import { useToastNotification } from "@/contexts/toastNotification";
import Loading from "@/app/_components/loading";
import { LuHandshake } from "react-icons/lu";
import moment from "moment";
import Link from "next/link";

const tabItems = [
  {
    id: "Pending",
    label: "Pending Booking",
    icon: <HiOutlineClock size={18} />,
  },
  {
    id: "Confirmed",
    label: "Upcoming Booking",
    icon: <HiOutlineCalendar size={18} />,
  },
  {
    id: "Cancelled",
    label: "Canceled Booking",
    icon: <HiOutlineXCircle size={18} />,
  },
  {
    id: "Completed",
    label: "Completed Booking",
    icon: <HiOutlineCheckCircle size={18} />,
  },
];

function Booking() {
  const { bookings, fetchBookings } = useBooking();
  const { addNotification } = useToastNotification();
  const [activeTab, setActiveTab] = useState("Pending");
  const [loading, setLoading] = useState(true);

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        await fetchBookings();
      } catch (error) {
        addNotification({ message: error as string, error: true });
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-red-500 text-xl md:text-2xl font-semibold">
          My Bookings
        </div>
        <Link
          href="/booking"
          className="bg-red-500 p-3 py-2 text-white rounded-lg"
        >
          Book Now
        </Link>
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
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking._id} className="border  rounded-lg mb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      <LuHandshake />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold"></h3>
                      <p className="text-gray-500 text-sm">Booking ID:</p>
                    </div>
                  </div>
                  <button className="md:ml-auto px-4 py-2 text-red-500 bg-red-5text-red-500/10 rounded-md">
                    Manage Booking
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3 text-sm text-gray-700 p-4">
                  <div>
                    <p className="text-gray-500">Departure time</p>
                    <p className="font-semibold">
                      {moment(booking.createdAt).format("ddd DD MMM hh:mm A")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Arrival time</p>
                    <p className="font-semibold">
                      {moment(booking.createdAt).format("ddd DD MMM hh:mm A")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Booked by</p>
                    <p className="font-semibold">{booking.userId}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-6">
              No {activeTab} bookings available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
