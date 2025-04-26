"use client";

import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import Footer from "../_components/footer";
import Loading from "../_components/loading";
import Navbar from "../_components/navbar";

export default function RootLayout({
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
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
