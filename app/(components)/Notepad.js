import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const Notepad = (notepad) => {
  const [day, setDay] = useState("Today's");
  const [notes, setNotes] = useState("");
  const [oldNotes, setOldNotes] = useState("");
  const [notesFetched, setNotesFetched] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/notes/${notepad.notepad.padId}`
        );

        if (response.status === 204) {
          return null;
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNotes(data[0].content);
        setOldNotes(data[0].content);
        setNotesFetched(true);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, [notepad.notepad.padId]);

  const saveNotes = () => {
    if (notes === oldNotes) {
      setMessage("Notes already saved");
      return;
    }
    fetch(`http://localhost:3000/api/notes/${notepad.notepad.padId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: notes,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        }
        setMessage(data.message);
        setOldNotes(notes);
      })
      .catch((error) => {
        console.error("Failed to save notes:", error);
      });
  };

  return (
    <>
      {!notesFetched ? (
        <Loading />
      ) : (
        <>
          <div>{notepad.notepad.name}</div>
          <div className="flex flex-col items-center my-8">
            <h3> {day} notes</h3>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setMessage("");
              }}
              className="my-6"
              placeholder={
                notes.length > 0 ? "" : "Write your first note for today..."
              }
            />
            <>
              {message.length === 0 ? (
                <button onClick={() => saveNotes()}>Save Notes</button>
              ) : (
                <label className="bg-green-100 text-green-700">{message}</label>
              )}
            </>
          </div>
        </>
      )}
    </>
  );
};

export default Notepad;
