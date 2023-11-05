import { Inter } from "next/font/google";
import { Advent_Pro } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
        className={`flex flex-col text-center justify-center my-48 ${inter.className}`}
      >
        <div className="flex justify-center items-center">
          <Link href={"/"}>
            <h1
              className={`text-7xl hover:text-8xl transition-all duration-200 h-24 ${advent_pro.className}`}
            >
              Reviewpad
            </h1>
          </Link>
        </div>
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
