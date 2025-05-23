"use client";

import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import Loading from "../_components/loading";
import AuthNav from "./_components/authNav";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      redirect("/dashboard");
    }
  }, [loading]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loading />
      </div>
    );

  return (
    <div>
      <AuthNav />
      {children}
    </div>
  );
}
