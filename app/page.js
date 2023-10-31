import { Advent_Pro } from "next/font/google";
import Link from "next/link";

const advent_pro = Advent_Pro({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full">
      <div>
        <h1 className={`${advent_pro.className} text-7xl h-24`}>Reviewpad</h1>
        <p className="text-xl">A notepad organised for quick reviews</p>
      </div>
      <div className="mt-7 flex flex-row place-content-center">
        <Link href="/Load">
          <button>Load Notepad</button>
        </Link>
        <Link href="/Create">
          <button>Create Notepad</button>
        </Link>
      </div>
    </div>
  );
}
