"use client";
import Link from "next/link";
import { useState } from "react";

const Find = () => {
  const [padId, setPadId] = useState("");
  const [passcode, setPasscode] = useState("");

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
