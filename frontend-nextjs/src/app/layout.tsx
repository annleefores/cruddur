import LeftSidebar from "@/components/LeftSidebar";
import "./globals.css";
import { Inter } from "next/font/google";

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
      <body className={`${inter.className} flex justify-center w-full`}>
        <div className="max-w-[1270px] w-full">
          <LeftSidebar>{children}</LeftSidebar>
        </div>
      </body>
    </html>
  );
}