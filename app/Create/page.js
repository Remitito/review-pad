"use client";

import axios from "axios";
import { useState } from "react";

const Create = () => {
  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");

  const createNotepad = async () => {
    try {
      const response = await fetch("/api/notepad", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          passcode: passcode,
        }),
      });
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  return (
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
          placeholder="Choose a 6 character alphanumeric passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />
      </div>
      <button onClick={() => createNotepad()}>Create</button>
    </div>
  );
};

export default Create;
