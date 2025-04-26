"use client";

import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import Loading from "../../_components/loading";
import { useBooking } from "@/contexts/booking";

const AllBookings: React.FC = () => {
  const { bookings, fetchBookings } = useBooking();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        await fetchBookings();
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceType.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginated = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-red-500">
          All Bookings
        </h2>
      </div>
      <div className=" w-full bg-gray-100 rounded-lg  p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="bg-text-500/10 text-text-500 px-3 py-1 rounded-md text-sm">
            {bookings.length} Bookings
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search name, email, or service"
              className="border w-full border-gray-300 rounded-md py-2 pl-8 pr-3 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-2 top-3 text-gray-500" />
          </div>
          <button className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            Sort by <IoIosArrowDown className="ml-2" />
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto min-h-96 whitespace-nowrap">
            <table className="border-collapse w-full">
              <thead>
                <tr className="bg-gray-200 text-left text-gray-600">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Datetime</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              {paginated.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      No Bookings Found
                    </td>
                  </tr>
                </tbody>
              )}
              <tbody>
                {paginated.map((booking, index) => (
                  <tr key={booking._id} className="border-b">
                    <td className="py-3 px-4">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {booking.fullName}
                    </td>
                    <td className="py-3 px-4">{booking.email}</td>
                    <td className="py-3 px-4">{booking.mobile}</td>
                    <td className="py-3 px-4">{booking.serviceType}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          booking.status === "Confirmed"
                            ? "bg-green-500"
                            : booking.status === "Pending"
                            ? "bg-yellow-500"
                            : booking.status === "Completed"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {moment(booking.datetime).format("MMM D, YYYY HH:mm")}
                    </td>
                    <td className="py-3 px-4">
                      {moment(booking.createdAt).format("MMM D, YYYY HH:mm")}
                    </td>
                    <td className="py-3 px-4">
                      <FaTrash
                        // onClick={() => cancelBooking(booking._id)}
                        className="text-red-500 text-xl cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between items-center mt-4 text-sm">
          <p>
            Showing{" "}
            {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of{" "}
            {filteredBookings.length} entries
          </p>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-text-500"
              }`}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-text-500 text-white"
                    : "text-text-500"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-text-500"
              }`}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
