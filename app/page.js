import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <div>
        <p className="text-xl">A notepad organised for quick reviews</p>
      </div>
      <div className="mt-7 flex flex-row place-content-center">
        <Link href="/Find">
          <button>Existing Notepad</button>
        </Link>
        <Link href="/Create">
          <button>New Notepad</button>
        </Link>
      </div>
    </div>
  );
}
