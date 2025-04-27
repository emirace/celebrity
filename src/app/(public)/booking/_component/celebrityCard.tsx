import { IUser } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { FaStar } from "react-icons/fa";

const CelebrityCard: FC<{ celeb: IUser }> = ({ celeb }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden relative group transition hover:shadow-xl hover:scale-105 duration-300">
      <div className="relative w-full h-72">
        <Image
          src={celeb.image || ""}
          alt={celeb.username}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 text-xs rounded-md capitalize">
          {celeb.job.join(", ")}
        </div>
      </div>

      <div className="p-4 space-y-2 relative">
        <h3 className="text-xl font-semibold capitalize">{celeb.fullName}</h3>

        <div className="absolute top-4 right-4 flex items-center text-yellow-500 text-sm font-medium">
          <FaStar className="mr-1" />
          5.0
        </div>
        <Link
          href={`/booking/${celeb._id}`}
          className="flex justify-center items-center mt-4 bg-black text-white hover:bg-gray-900 rounded-lg font-medium p-2 w-full transition cursor-pointer"
        >
          Book New
        </Link>
      </div>
    </div>
  );
};

export default CelebrityCard;
