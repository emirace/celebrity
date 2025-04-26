"use client";

import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import Loading from "../../_components/loading";
import { useMeet } from "@/contexts/meet";
import { deleteMeet } from "@/services/meet";

const AllMeets: React.FC = () => {
  const { meets, fetchMeets } = useMeet();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadMeets = async () => {
      try {
        setLoading(true);
        await fetchMeets();
      } catch (error) {
        console.error("Error fetching meets:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMeets();
  }, []);

  const filteredMeets = meets.filter(
    (meet) =>
      meet.firstName.toLowerCase().includes(search.toLowerCase()) ||
      meet.lastName.toLowerCase().includes(search.toLowerCase()) ||
      meet.city.toLowerCase().includes(search.toLowerCase()) ||
      meet.occupation.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMeets.length / itemsPerPage);
  const paginated = filteredMeets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-red-500">
          All Meet & Greets
        </h2>
      </div>

      <div className="w-full bg-gray-100 rounded-lg  p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded-md text-sm">
            {meets.length} Meets
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, occupation or city"
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
                  <th className="py-3 px-4">Occupation</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              {paginated.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      No Meets Found
                    </td>
                  </tr>
                </tbody>
              )}
              <tbody>
                {paginated.map((meet, index) => (
                  <tr key={meet._id} className="border-b">
                    <td className="py-3 px-4">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {meet.firstName} {meet.lastName}
                    </td>
                    <td className="py-3 px-4">{meet.occupation}</td>
                    <td className="py-3 px-4">
                      <div>
                        {meet.reason.length > 30 ? (
                          <>
                            {meet.reason.slice(0, 30)}...
                            <button
                              className="text-blue-500 ml-2"
                              onClick={(e) => {
                                e.preventDefault();
                                const target = e.currentTarget.previousSibling;
                                if (target) {
                                  target.textContent =
                                    target.textContent === meet.reason
                                      ? `${meet.reason.slice(0, 30)}...`
                                      : meet.reason;
                                }
                              }}
                            >
                              {meet.reason.length > 30
                                ? "Show More"
                                : "Show Less"}
                            </button>
                          </>
                        ) : (
                          meet.reason
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {meet.address}, {meet.city}, {meet.state}
                    </td>
                    <td className="py-3 px-4">{meet.duration}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          meet.status === "Confirmed"
                            ? "bg-green-500"
                            : meet.status === "Pending"
                            ? "bg-yellow-500"
                            : meet.status === "Completed"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                      >
                        {meet.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {moment(meet.createdAt).format("MMM D, YYYY HH:mm")}
                    </td>
                    <td className="py-3 px-4">
                      <FaTrash
                        onClick={() => deleteMeet(meet._id)}
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
            Showing {Math.min(currentPage * itemsPerPage, filteredMeets.length)}{" "}
            of {filteredMeets.length} entries
          </p>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-500"
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
                    ? "bg-red-500 text-white"
                    : "text-red-500"
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
                  : "text-red-500"
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

export default AllMeets;
