"use client";

import Image from "next/image";
import { FiArrowRight, FiClock, FiSearch, FiShield } from "react-icons/fi";
import Meetings from "./_components/meetings";
import { useUser } from "@/contexts/user";
import Link from "next/link";

const Dashboard = () => {
  const { user, count } = useUser();
  return (
    <section className="p-4 bg-gray-100 rounded-lg text-gray-900 font-sans">
      <div className="flex flex-col md:flex-row  gap-4 h-full">
        <div className=" md:w-2/3 border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 md:pr-4 h-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-4  md:items-center justify-center md:justify-between mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                Welcome, {user?.username}
              </h1>
              <p className="text-sm text-gray-500">
                Your personal dashboard overview
              </p>
            </div>
            <div className="flex  items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200  focus:outline-none"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">👤</span>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="flex flex-col md:flex-row  gap-4">
            {/* Profile Card */}
            <div className="bg-white p-4 rounded-2xl col-span-1 md:w-2/5">
              <div className="flex flex-col items-center ">
                <div className="relative w-28 h-28 mb-3 bg-black overflow-hidden rounded-full ">
                  {user?.image && (
                    <Image
                      src={user?.image}
                      alt="Kristin Watson"
                      width={112}
                      height={112}
                      className="object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                    ★
                  </div>
                </div>
                <h3 className="text-lg font-medium">{user?.fullName}</h3>
                <p className="text-xs text-gray-400">Nill</p>
                <div className="flex flex-col w-full mt-6 ">
                  <Link
                    href="/dashboard/meet"
                    className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-3"
                  >
                    <span>Meet & Greet</span>
                    <span className="text-gray-400">{count.meet}</span>
                  </Link>
                  <Link
                    href="/dashboard/fab-card"
                    className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-3"
                  >
                    <span>Fan Card</span>
                    <span className="text-gray-400">{count.fancard}</span>
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-3"
                  >
                    <span>Booking</span>
                    <span className="text-gray-400">{count.bookings}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:w-3/5">
              <div className="flex gap-4">
                {/* Prioritized Tasks */}
                <div className="flex-1 flex flex-col justify-between h-64 bg-gradient-to-br from-[#fad0c4] to-[#ffd1ff] p-5 rounded-2xl col-span-1">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-medium">MemberShip Status</h4>
                    <FiClock className="w-5 h-5 text-gray-700" />
                  </div>

                  {user?.membership?.name ? (
                    <div>
                      <div className="relative w-full h-36 mb-4">
                        <Image
                          src={user.membership.image}
                          alt={"member"}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="text-center">{user.membership.name}</div>
                    </div>
                  ) : (
                    <div>
                      <div>No Membership Status</div>
                      <Link
                        href={"/membership"}
                        className="flex items-center gap-2"
                      >
                        Apply
                        <FiArrowRight />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Additional Tasks */}
                <div className="flex-1 h-64 flex flex-col justify-between bg-gradient-to-br from-[#b2fefa] to-[#0ed2f7] p-5 rounded-2xl col-span-1">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-medium">Security Profile</h4>
                    <FiShield className="w-5 h-5 text-gray-700" />
                  </div>
                  {user?.security ? (
                    <div>
                      <div className="text-4xl font-semibold">100%</div>
                      <p className="text-sm text-green-700">Active</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl font-semibold">0%</div>
                      <p className="text-sm text-red-700">Inactive</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Trackers Connected */}
              <div className="bg-gray-200 p-5 rounded-2xl col-span-1 flex justify-between">
                <div className="">
                  <h4 className="text-sm font-medium mb-2">
                    Celebrity connected
                  </h4>
                  <p className="text-sm text-gray-500 ">3 active connections</p>
                </div>
                <div className="flex gap-3">
                  <Image
                    src="/icons/slack.png"
                    alt="Slack"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icons/trello.png"
                    alt="Trello"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icons/jira.png"
                    alt="Jira"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          <Meetings />
          {/* <Booking /> */}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
