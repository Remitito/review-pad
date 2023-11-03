"use client";

import Link from "next/link";
import { useState } from "react";

const Create = () => {
  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");
  const padId =
    Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;

  const createNotepad = async () => {
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          padId: padId,
          passcode: passcode,
        }),
      });
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  return (
    <>
      {padId.length > 0 ? (
        <label>{padId}</label>
      ) : (
        <div>
          <div class="mb-4">
            <label for="name">Notepad Name</label>
            <input
              id="name"
              type="text"
              placeholder="E.g. 'Steve's Physics Exam Notes'"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label for="passcode">Passcode</label>
            <input
              id="passcode"
              type="password"
              maxLength="6"
              size="6"
              placeholder="Choose a 6 digit passcode"
              value={passcode}
              onChange={(e) => {
                if (e.target.value.match(/^\d*$/)) {
                  setPasscode(e.target.value);
                }
              }}
            />
          </div>
          <Link href={`/Load/${padId}`}>
            <button onClick={() => createNotepad()}>Create</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Create;
