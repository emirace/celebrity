"use client";

import Modal from "@/app/_components/modal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import CelebrityForm from "./_components/celebrityForm";
import { IUser } from "@/types/user";
import { useToastNotification } from "@/contexts/toastNotification";
import { deleteCelebrity, fetchCelebrities } from "@/services/user";
import Loading from "@/app/_components/loading";
import moment from "moment";

function Celebrities() {
  const { addNotification } = useToastNotification();
  const [search, setSearch] = useState("");
  const [celebrities, setCelebrities] = useState<IUser[]>([]);
  const [selectedCelebrity, setSelectedCelebrity] = useState<IUser | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);

  const loadCelebrities = async () => {
    try {
      setLoading(true);
      const res = await fetchCelebrities({ search, page });
      setCelebrities(res.celebrities);
    } catch (error) {
      console.error("Error fetching celebrities:", error);
      addNotification({
        message: error as string,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCelebrities();
  }, [search, page]);

  const handleEdit = (celebrity: IUser) => {
    setSelectedCelebrity(celebrity);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCelebrity(id);
      setCelebrities((prevCelebrities) =>
        prevCelebrities.filter((celebrity: IUser) => celebrity._id !== id)
      );
      addNotification({
        message: "Celebrity deleted successfully",
        error: false,
      });
    } catch (error) {
      addNotification({
        message: error as string,
        error: true,
      });
    }
  };

  return (
    <div>
      <div className="text-red-500 text-2xl md:text-4xl font-semibold mb-6">
        Celebrities
      </div>
      <div className="min-h-[50rem] w-full bg-gray-100 rounded-lg  p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Celebrities..."
              className="bg-gray-200 w-full md:w-1/2 rounded-md py-2 pl-8 pr-3 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-2 top-3 text-gray-500" />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Add Celebrity
          </button>
        </div>
        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loading />
            </div>
          ) : celebrities.length <= 0 ? (
            <div className="">No Celebrity Available</div>
          ) : (
            celebrities.map((celebrity) => (
              <div
                key={celebrity._id}
                className="relative rounded-xl border border-gray-300 mb-4 overflow-hidden transition-shadow duration-300 flex flex-col sm:flex-row"
              >
                {/* Top Right Icons */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={() => handleEdit(celebrity)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                  >
                    <FiEdit className="text-gray-600" size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(celebrity._id)}
                    className="p-2 bg-white rounded-full shadow hover:bg-red-100 transition"
                  >
                    <FiTrash2 className="text-red-600" size={18} />
                  </button>
                </div>

                {/* Image Section */}
                <div className="relative w-full sm:w-1/3 h-64 sm:h-auto border-b sm:border-b-0 sm:border-r border-gray-200">
                  <Image
                    src={celebrity.image || ""}
                    alt={`Celebrity ${celebrity.fullName}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-none"
                  />
                </div>

                {/* Details Section */}
                <div className="w-full sm:w-2/3 p-4 sm:p-6 flex flex-col gap-6">
                  {/* Grid 1 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-base font-semibold text-gray-800 capitalize">
                        {celebrity.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Profession</p>
                      <p className="text-base font-semibold text-gray-800 capitalize">
                        {celebrity.job.join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* Grid 2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-base font-semibold text-gray-800">
                        {celebrity.age}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-base font-semibold text-gray-800">
                        {moment(celebrity.dob).format("MMMM Do, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p className="text-base font-semibold text-gray-800 capitalize">
                        {celebrity.nationality}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-base font-semibold capitalize">
                        {celebrity.gender}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Meeting Fee</p>
                      <p className="text-base font-semibold text-gray-800">
                        ${celebrity.meetFee}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Booking Fee</p>
                      <p className="text-base font-semibold ">
                        ${celebrity.bookingFee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CelebrityForm
          onClose={() => setIsModalOpen(false)}
          celebrity={selectedCelebrity!}
          loadCelebrities={loadCelebrities}
        />
      </Modal>
    </div>
  );
}

export default Celebrities;
