import RightSidebar from "@/components/RightSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-x-3 w-full h-full">
      <div className="w-full md:w-max-[600px]">{children}</div>
      {/* <div className="hidden lg:block w-[370px]">
        <RightSidebar />
      </div> */}
    </div>
  );
}
