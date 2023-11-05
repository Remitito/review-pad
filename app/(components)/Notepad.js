import React, { useEffect, useState } from "react";

const Notepad = (notepad) => {
  const [day, setDay] = useState("Today's");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/notes/${notepad.notepad.padId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setNotes(data[0].content);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, [notepad.notepad.padId]);

  const saveNotes = () => {
    fetch(`http://localhost:3000/api/notes/${notepad.notepad.padId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: notes,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Saved notes:", data);
      })
      .catch((error) => {
        console.error("Failed to save notes:", error);
      });
  };

  return (
    <>
      <div>{notepad.notepad.name}</div>
      <div className="flex flex-col items-center my-8">
        <h3> {day} notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="my-6"
        ></textarea>
        <button onClick={() => saveNotes()}>Save Notes</button>
      </div>
    </>
  );
};

export default Notepad;
