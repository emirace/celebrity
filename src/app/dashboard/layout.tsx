"use client";

import Sidebar from "./_components/sidebar";
import { useUser } from "@/contexts/user";
import Loading from "../_components/loading";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loading />
      </div>
    );
  if (!user) return redirect("/login");
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex flex-row w-full h-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-col w-full h-full overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
