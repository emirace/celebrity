"use client";

import Loading from "@/app/_components/loading";
import { useUser } from "@/contexts/user";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();
  const pathname = usePathname();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loading />
      </div>
    );
  if (!user) return redirect(`/login?redirecturl=${pathname}`);
  return <div>{children}</div>;
}
