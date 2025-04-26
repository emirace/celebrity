import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

function AuthNav() {
  return (
    <div className="fixed z-30 flex inset-x-0 top-8 px-6 sm:px-14 sm:top-8 justify-between items-center">
      <Link href={"../"} className="bg-white p-2 rounded-full">
        <FaArrowLeftLong className="text-black text-base cursor-pointer" />
      </Link>
      <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">⭘</span>
        </div>
        <span className="font-semibold text-lg text-gray-900">FanStar</span>
      </Link>
    </div>
  );
}

export default AuthNav;
