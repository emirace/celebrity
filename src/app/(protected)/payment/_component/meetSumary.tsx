import { IMeet } from "@/types/meet";
import { FiBox, FiUser } from "react-icons/fi";
import Image from "next/image";

const MeetSumary = ({ meet }: { meet: IMeet | null }) => {
  return (
    <div className="w-full space-y-4">
      {/* Fare Summary */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold">Meet Summary</h2>

        <div className="flex justify-between text-gray-700">
          <span>
            Fee <span className="text-gray-400">ⓘ</span>
          </span>
          <span className="font-medium">${meet?.celebrityId.meetFee}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span className="font-medium">+ $0</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Other Services</span>
          <span className="font-medium">$0</span>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Fee</span>
          <span>${meet?.celebrityId.meetFee}</span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="border border-gray-300 rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-bold">Your Meet & Greet</h2>

        <Image
          src={meet?.celebrityId.image || ""}
          alt="Passport"
          className="object-cover h-20 w-20 rounded-lg"
          width={80}
          height={80}
        />

        <div className="space-y-2">
          <p className="text-gray-500 flex items-center space-x-2">
            <FiUser className="text-gray-600" />
            <span className="capitalize">{meet?.celebrityId.fullName}</span>
          </p>
          <p className="text-gray-500 flex items-center space-x-2">
            <FiBox className="text-gray-600" />
            <span className="capitalize">
              {meet?.celebrityId.job.join(", ")}
            </span>
          </p>
        </div>

        <hr className="border-gray-300" />
      </div>
    </div>
  );
};

export default MeetSumary;
