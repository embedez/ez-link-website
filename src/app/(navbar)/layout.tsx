import type { Metadata } from "next";
import { Navbar } from "@/components/internal/navbar";

export const metadata: Metadata = {
  title: "Chance's Template - Next App",
  description: "Anouther nextjs template made by Chance",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"min-h-screen flex flex-col"}>
      <Navbar />
      {children}
    </div>
  );
}
