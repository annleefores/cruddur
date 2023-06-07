import RightSidebar from "@/components/RightSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row gap-x-3 w-full h-full">
        <div className="w-full md:max-w-[600px]">{children}</div>
        <div className="hidden md2:block w-[370px]">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
