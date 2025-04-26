"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import { fetchAllUsers } from "@/services/user";
import { IUser } from "@/types/user";
import Loading from "../_components/loading";

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchAllUsers();
        setUsers(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredUsers = (users || []).filter(
    (user) =>
      (user.fullName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (user.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (user.nationality ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginated = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-red-500">
          All Users
        </h2>
      </div>

      <div className="min-h-[50rem] w-full bg-gray-100 rounded-lg  p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm">
            {users.length} Users
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search name, email, nationality"
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
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Nationality</th>
                  <th className="py-3 px-4">Gender</th>
                  <th className="py-3 px-4">DOB</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((user, index) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-3 px-4">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <img
                        src={user.image || "/default-avatar.png"}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">{user.fullName}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.mobile}</td>
                    <td className="py-3 px-4">{user.nationality}</td>
                    <td className="py-3 px-4 capitalize">{user.gender}</td>
                    <td className="py-3 px-4">
                      {moment(user.dob).format("MMM D, YYYY")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          user.role === "admin"
                            ? "bg-purple-500"
                            : user.role === "celebrity"
                            ? "bg-pink-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <FaTrash
                        // onClick={() => deleteUser(user._id)}
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
            Showing {Math.min(currentPage * itemsPerPage, filteredUsers.length)}{" "}
            of {filteredUsers.length} entries
          </p>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary"
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
                    ? "bg-primary text-white"
                    : "text-primary"
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
                  : "text-primary"
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

export default AllUsers;
