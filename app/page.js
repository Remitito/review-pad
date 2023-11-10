"use client";

import Link from "next/link";
import { useState } from "react";
import Loading from "./(components)/Loading";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!loading ? (
        <div className="w-full">
          <div>
            <p className="text-xl">A notepad organised for quick reviews</p>
          </div>
          <div className="mt-7 flex flex-row place-content-center">
            <Link href="/Load/find">
              <button onClick={() => setLoading(true)}>Existing Notepad</button>
            </Link>
            <Link href="/Create">
              <button onClick={() => setLoading(true)}>New Notepad</button>
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
