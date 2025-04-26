"use client";

import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import Loading from "../_components/loading";
import AuthNav from "./_components/authNav";

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
  if (user) return redirect("/dashboard");

  return (
    <div>
      <AuthNav />
      {children}
    </div>
  );
}
