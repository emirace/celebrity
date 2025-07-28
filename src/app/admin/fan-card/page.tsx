"use client";

import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import Loading from "../../_components/loading";
import { useFanCard } from "@/contexts/fanCard";

const AllFanCards: React.FC = () => {
  const { fanCards, fetchFanCards } = useFanCard();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadFanCards = async () => {
      try {
        setLoading(true);
        await fetchFanCards();
      } catch (error) {
        console.error("Error fetching fan cards:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFanCards();
  }, []);

  const filteredCards = fanCards.filter(
    (card) =>
      card.nickname.toLowerCase().includes(search.toLowerCase()) ||
      card.fandomTheme.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const paginated = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-red-500">
          All Fan Cards
        </h2>
      </div>
      <div className="w-full bg-gray-100 rounded-lg  p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded-md text-sm">
            {fanCards.length} Fan Cards
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by nickname or theme"
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
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Nickname</th>
                  <th className="py-3 px-4">Theme</th>
                  <th className="py-3 px-4">Celebrity ID</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              {paginated.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      No Fan Cards Found
                    </td>
                  </tr>
                </tbody>
              )}
              <tbody>
                {paginated.map((card, index) => (
                  <tr key={card._id} className="border-b">
                    <td className="py-3 px-4">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium">{card.nickname}</td>
                    <td className="py-3 px-4">{card.fandomTheme}</td>
                    {/* <td className="py-3 px-4">{card.celebrityId._id}</td> */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          card.status === "Confirmed"
                            ? "bg-green-500"
                            : card.status === "Pending"
                            ? "bg-yellow-500"
                            : card.status === "Completed"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                      >
                        {card.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {moment(card.createdAt).format("MMM D, YYYY HH:mm")}
                    </td>
                    <td className="py-3 px-4">
                      <FaTrash
                        // onClick={() => cancelFanCard(card._id)}
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
            Showing {Math.min(currentPage * itemsPerPage, filteredCards.length)}{" "}
            of {filteredCards.length} entries
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

export default AllFanCards;
