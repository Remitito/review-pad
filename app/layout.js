import { Inter } from "next/font/google";
import { Advent_Pro } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { GiNotebook } from "react-icons/gi";

const inter = Inter({ subsets: ["latin"] });
const advent_pro = Advent_Pro({ subsets: ["latin"] });

export const metadata = {
  title: "Reviewpad",
  description: "A notepad organised for quick reviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col h-full text-center justify-center ${inter.className}`}
      >
        <Link href={"/"}>
          <div className="flex justify-center items-center text-7xl hover:text-8xl transition-all duration-200 my-16 ">
            <h1 className={advent_pro.className}>Reviewpad</h1>
            <GiNotebook className="text-blue-600" />
          </div>
        </Link>

        <div className="w-full min-h-full">{children}</div>
      </body>
    </html>
  );
}
