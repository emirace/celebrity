"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiUsers,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiBookmark,
  FiUser,
  FiDollarSign,
  FiArrowRight,
  FiMessageCircle,
} from "react-icons/fi";
import { LuHandshake } from "react-icons/lu";
import { MdCardGiftcard } from "react-icons/md";

const menuItems = [
  { name: "Users", path: "/admin", icon: <FiUsers size={20} /> },
  {
    name: "Celebrities",
    path: "/admin/celebrities",
    icon: <FiUser size={20} />,
  },
  {
    name: "Meet & Greet",
    path: "/admin/meet",
    icon: <LuHandshake size={20} />,
  },
  {
    name: "Fan Card",
    path: "/admin/fan-card",
    icon: <MdCardGiftcard size={20} />,
  },
  {
    name: "Bookings",
    path: "/admin/bookings",
    icon: <FiBookmark size={20} />,
  },
  {
    name: "Payments",
    path: "/admin/transactions",
    icon: <FiDollarSign size={20} />,
  },
  {
    name: "Support",
    path: "/admin/support",
    icon: <FiMessageCircle size={20} />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <FiSettings size={20} />,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setCollapsed(mediaQuery.matches);

    const handleResize = () => setCollapsed(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [pathname]);

  return (
    <div
      className={`bg-gray-50 h-screen transition-all duration-300 ${
        collapsed ? "w-14 md:w-24 " : "w-64"
      } flex flex-col`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between h-16 mb-8">
        <div className="p-4">
          <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">⭘</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-lg text-gray-900">
                M-Fanstar
              </span>
            )}
          </Link>
        </div>

        <div className="flex justify-end w-full  p-2 ">
          <button
            className="cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <FiChevronRight size={24} />
            ) : (
              <FiChevronLeft size={24} />
            )}
          </button>
        </div>
      </div>

      <div
        className={`flex items-center space-x-3 px-3 py-3 text-sm text-red-500 font-semibold rounded-md transition-all 
                    ${collapsed ? "justify-center" : "justify-start"}
                    `}
      >
        {!collapsed ? (
          <span>Admin Dashboard</span>
        ) : (
          <div className="text-base">A</div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-3 px-2">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <li key={idx}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-all 
              ${
                isActive
                  ? "bg-red-100 text-red-700 font-medium"
                  : "hover:bg-red-50 text-gray-800"
              }
              ${collapsed ? "justify-center" : "justify-start"}
              `}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
          <Link
            href="/dashboard"
            className={`flex items-center space-x-3 px-3 py-3 text-sm rounded-md transition-all 
                    ${collapsed ? "justify-center" : "justify-start"}
                    `}
          >
            {!collapsed ? (
              <div className="flex items-center gap-4">
                User Dashboard
                <FiArrowRight />
              </div>
            ) : (
              <div className="text-base">U</div>
            )}
          </Link>
        </ul>
      </nav>

      {/* Dark mode toggle */}
      <div className="px-2 py-4 mt-auto">
        <div
          className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-all hover:bg-red-50 text-gray-800 cursor-pointer
                    ${collapsed ? "justify-center" : "justify-start"}
                    `}
        >
          <div className="w-10 h-10 rounded-full bg-black" />
          {!collapsed && (
            <div>
              <div className="font-semibold text-red-500">Username</div>
              <div className="text-sm text-gray-400">Role</div>
            </div>
          )}
        </div>
        <div
          className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-all hover:bg-red-50 text-gray-800 cursor-pointer
                    ${collapsed ? "justify-center" : "justify-start"}
                    `}
        >
          <FiLogOut size={20} />
          {!collapsed && <span>Log Out</span>}
        </div>
      </div>
    </div>
  );
}
