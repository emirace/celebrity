import { FC } from "react";
import Image from "next/image";
import { FaClock } from "react-icons/fa";
import { MdEmail, MdOutlineMobileFriendly } from "react-icons/md";

type CommonTypes = {
  celebrityId: {
    fullName: string;
    image: string;
    job?: string[];
  };
  status: string;
  receipt?: string;
};

type MeetType = {
  type: "meet";
  firstName: string;
  lastName: string;
  duration: string;
  state: string;
  city: string;
} & CommonTypes;

type BookingType = {
  type: "booking";
  fullName: string;
  email: string;
  mobile: string;
  serviceType: string;
  datetime: string;
} & CommonTypes;

type FanCardType = {
  type: "fancard";
  fandomTheme: string;
  nickname?: string;
} & CommonTypes;

type MembershipType = {
  type: "membership";
  name: string;
  image?: string;
  price?: string;
} & CommonTypes;

export type IDetailProps = {
  data: MeetType | BookingType | FanCardType | MembershipType;
};

const Detail: FC<IDetailProps> = ({ data }) => {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Completed: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="rounded-2xl shadow-md border border-gray-200 mb-6 bg-white hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-4">
          <Image
            src={data?.celebrityId?.image || (data as { image: string }).image}
            alt="Celebrity"
            className="object-cover h-16 w-16 rounded-full ring-2 ring-blue-100"
            width={64}
            height={64}
          />
          <div>
            <p className="text-lg font-semibold capitalize text-gray-800">
              {data?.celebrityId?.fullName || (data as { name: string }).name}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {data?.celebrityId?.job?.join(", ")}
            </p>
          </div>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            statusColors[
              (data.status || "Pending") as keyof typeof statusColors
            ]
          }`}
        >
          {data.status || "Pending"}
        </span>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-5 text-sm text-gray-700">
        {data.type === "meet" && (
          <>
            <div>
              <p className="text-gray-500 mb-1">Requested By</p>
              <p className="font-medium capitalize">
                {data.firstName} {data.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Duration</p>
              <p className="font-medium">{data.duration}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Location</p>
              <p className="font-medium capitalize">
                {data.state}, {data.city}
              </p>
            </div>
          </>
        )}

        {data.type === "booking" && (
          <>
            <div>
              <p className="text-gray-500 mb-1">Full Name</p>
              <p className="font-medium capitalize">{data.fullName}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Email</p>
              <p className="font-medium flex items-center gap-1">
                <MdEmail /> {data.email}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Mobile</p>
              <p className="font-medium flex items-center gap-1">
                <MdOutlineMobileFriendly /> {data.mobile}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Service</p>
              <p className="font-medium">{data.serviceType}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Date & Time</p>
              <p className="font-medium flex items-center gap-1">
                <FaClock /> {new Date(data.datetime).toLocaleString()}
              </p>
            </div>
          </>
        )}

        {data.type === "fancard" && (
          <>
            <div>
              <p className="text-gray-500 mb-1">Theme</p>
              <p className="font-medium">{data.fandomTheme}</p>
            </div>
            {data.nickname && (
              <div>
                <p className="text-gray-500 mb-1">Nickname</p>
                <p className="font-medium">{data.nickname}</p>
              </div>
            )}
          </>
        )}
      </div>

      {data.receipt && (
        <Image
          src={data.receipt}
          alt="Receipt"
          width={112}
          height={112}
          className="w-28 h-28 object-cover bg-black rounded-xl border-4 border-white shadow-sm"
        />
      )}
    </div>
  );
};

export default Detail;
