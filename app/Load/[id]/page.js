"use client";

import { useState, useEffect } from "react";
import Notepad from "@/app/(components)/Notepad";
import Loading from "@/app/(components)/Loading";

const Load = ({ params }) => {
  const [notepad, setNotepad] = useState();
  const [padId, setPadId] = useState("");
  const [idAsParam, setIdAsParam] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (params.id !== "find" && params.id.length == 8) {
      setPadId(params.id);
      setIdAsParam(true);
    }
    setLoaded(true);
  }, []);

  const loadNotepad = () => {
    if (padId.length !== 8) {
      setMessage("Please enter your notepad's 8-digit ID");
      return;
    }
    if (passcode.length !== 6) {
      setMessage("Please enter your notepad's 6-digit passcode");
      return;
    }
    fetch(`https://review-pad.vercel.app/api/load/${padId}`, {
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
      {loaded ? (
        <>
          {notepad ? (
            <div>
              <Notepad notepad={notepad} />
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label>Pad ID</label>
                <input
                  placeholder="E.g. 26515812"
                  value={padId}
                  onChange={(e) => {
                    setPadId(e.target.value);
                    setMessage("");
                  }}
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
                      setMessage("");
                    }
                  }}
                />
              </div>
              <div>
                {message.length > 0 ? (
                  <label>{message}</label>
                ) : (
                  <button onClick={() => loadNotepad()}>Open Notepad</button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Load;
