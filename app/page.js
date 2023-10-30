import Image from "next/image";
import { Advent_Pro } from "next/font/google";

const advent_pro = Advent_Pro({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full">
      <div>
        <h1 className={`${advent_pro.className} text-7xl h-24`}>Reviewpad</h1>
        <p className="text-xl">A notepad organised for quick reviews</p>
      </div>
      <div className="mt-7 flex flex-row place-content-center">
        <div>
          <button className="text-white bg-blue-600 hover:bg-blue-800 text-2xl p-3 rounded-lg mx-5 w-12/12">
            Load Notepad
          </button>
        </div>
        <button className="text-white bg-blue-600 hover:bg-blue-800 text-2xl p-3 rounded-lg">
          New Notepad
        </button>
      </div>
    </div>
  );
}
