import { Navbar } from "@/components/internal/navbar";

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
