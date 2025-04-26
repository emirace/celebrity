"use client";

import CelebrityCard from "./celebrityCard";
import { useToastNotification } from "@/contexts/toastNotification";
import { fetchCelebrities } from "@/services/user";
import { IUser } from "@/types/user";
import { useState, useEffect } from "react";
import Loading from "@/app/_components/loading";
import { FiSearch } from "react-icons/fi";

const CelebrityGrid = () => {
  const { addNotification } = useToastNotification();
  const [search, setSearch] = useState("");
  const [celebrities, setCelebrities] = useState<IUser[]>([]);
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
  return (
    <div className=" p-4 md:p-8 md:px-28  max-w-7xl mx-auto">
      <div className="relative flex-1  mb-6">
        <input
          type="text"
          placeholder="Search Celebrities..."
          className="bg-gray-100 w-full  rounded-full py-2 pl-8 pr-3 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FiSearch className="absolute left-2 top-3 text-gray-500" />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64 w-full">
          <Loading />
        </div>
      ) : celebrities.length <= 0 ? (
        <div className="">No Celebrity Available</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {celebrities.map((celeb, index) => (
            <CelebrityCard key={index} celeb={celeb} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CelebrityGrid;
