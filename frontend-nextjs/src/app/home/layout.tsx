import RightSidebar from "@/components/RightSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-x-2 w-full h-full">
      <div className="w-screen sm:w-[600px]">{children}</div>
      <div className="hidden flex-grow lg:block">
        <RightSidebar />
      </div>
    </div>
  );
}
