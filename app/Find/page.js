"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Find = () => {
  const [padId, setPadId] = useState("");
  const [passcode, setPasscode] = useState("");
  const router = useRouter();

  const passcodeCheck = async () => {
    if (padId.length == 8 && passcode.length == 6) {
      try {
        const response = await fetch("/api/load", {
          method: "POST",
          body: JSON.stringify({
            padId: padId,
            passcode: passcode,
          }),
        });
        if (response.ok) {
          router.push(`/Load/${padId}`);
        } else {
          // Password was wrong
        }
      } catch (error) {
        console.error("There was an error:", error);
      }
    } else {
      // Input error
    }
  };

  return (
    <>
      <div>
        <div className="mb-4">
          <label>Notepad ID</label>
          <input
            id="padId"
            type="text"
            placeholder="E.g. 26515812"
            value={padId}
            onChange={(e) => setPadId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label>Passcode</label>
          <input
            id="passcode"
            type="password"
            maxLength="6"
            size="6"
            placeholder="E.g. 654321"
            value={passcode}
            onChange={(e) => {
              if (e.target.value.match(/^\d*$/)) {
                setPasscode(e.target.value);
              }
            }}
          />
        </div>
        {/* <Link href={`/Load/${padId}`}> */}
        <button onClick={() => passcodeCheck()}>Load Notepad</button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default Find;
