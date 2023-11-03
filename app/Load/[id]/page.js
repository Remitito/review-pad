"use client";

import { useState, useEffect } from "react";

const Load = ({ params }) => {
  const [notepad, setNotepad] = useState();

  useEffect(() => {
    const padId = params.id;
    fetch(`http://localhost:3000/api/load/${padId}`)
      .then((res) => res.json())
      .then((data) => setNotepad(data.notepad));
  }, []);

  return (
    <>
      {notepad ? (
        <div>
          <h1>{notepad.name}</h1>
          <button onClick={() => console.log("hello")}>Hi</button>
        </div>
      ) : (
        <div>Nah</div>
      )}
    </>
  );
};

export default Load;
