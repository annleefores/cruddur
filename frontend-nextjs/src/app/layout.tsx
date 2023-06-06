import LeftSidebar from "@/components/LeftSidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import RightSidebar from "@/components/RightSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cruddur",
  description: "Ephemeral micro-blogging platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex justify-center w-full h-full `}>
        <div className="max-w-[700px] md:max-w-[800px] lg:max-w-[1065px] xl:max-w-[1265px] flex flex-row sm:gap-x-3 w-full h-full">
          <div className="xl:w-[275px] h-full">
            <LeftSidebar />
          </div>
          <div className="w-full md:w-[600px] h-full">{children}</div>
          <div className="hidden lg:block w-[370px] h-full">
            <RightSidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
