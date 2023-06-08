import RightSidebar from "@/components/RightSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <section className="h-full w-full">
      <div className="flex flex-row gap-x-2">
        <div className="w-full h-full md:w-[600px]">{children}</div>
        <div className="hidden lg:block w-[370px]">
          <RightSidebar />
        </div>
      </div>
    </section>
=======
    <>
      <div className="flex flex-row gap-x-2 w-full h-full">
        <div className="w-screen sm:w-[600px]">{children}</div>
        <div className="hidden hideRightBar:block w-[370px]">
          <RightSidebar />
        </div>
      </div>
    </>
>>>>>>> frontend-dev
  );
}
