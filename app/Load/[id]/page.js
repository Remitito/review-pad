"use client";

import { useState, useEffect } from "react";
import Notepad from "@/app/(components)/Notepad";

const Load = ({ params }) => {
  const [notepad, setNotepad] = useState();
  const [padId, setPadId] = useState();
  const [passcode, setPasscode] = useState();

  useEffect(() => {
    setPadId(params.id);
  }, []);

  const loadNotepad = () => {
    fetch(`http://localhost:3000/api/load/${padId}`, {
      method: "POST",
      body: JSON.stringify({
        passcode: passcode,
      }),
    })
      .then((res) => res.json())
      .then((data) => setNotepad(data.notepad));
  };

  return (
    <>
      {notepad ? (
        <div>
          <Notepad notepad={notepad.notepad} />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label>Pad ID</label>
            <input
              disabled={true}
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
          <button onClick={() => loadNotepad()}>Hi</button>
        </div>
      )}
    </>
  );
};

export default Load;
