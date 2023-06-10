import LeftSidebar from "@/components/LeftSidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ProvideAuth } from "@/hooks/useAuth";

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
        <ProvideAuth>
          <div className="max-w-[700px] md:max-w-[800px] lg:max-w-[1065px] xl:max-w-[1265px] flex flex-row  w-full h-full">
            <div className="h-full">
              <LeftSidebar />
            </div>
            <div className="flex-1 h-full">{children}</div>
          </div>
        </ProvideAuth>
      </body>
    </html>
  );
}
