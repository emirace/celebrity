"use client";

import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import Loading from "../_components/loading";
import Sidebar from "./_components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loading color="red-500" />
      </div>
    );
  if (!user) return redirect("/login");
  if (user.role !== "Admin") return redirect("/dashboard");

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex flex-row w-full h-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-col w-full h-full overflow-y-auto p-2 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
