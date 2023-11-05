import React, { useEffect } from "react";

const Notepad = (notepad) => {
  useEffect(() => {
    console.log(notepad);
  }, []);
  return (
    <>
      <h1>Hi</h1>
      <div>{notepad.name}</div>
      <div>{notepad.padId}</div>
    </>
  );
};

export default Notepad;
