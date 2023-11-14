import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Notepad = (notepad) => {
  const [notes, setNotes] = useState("");
  const [oldNotes, setOldNotes] = useState("");
  const [notesFetched, setNotesFetched] = useState(false);
  const [message, setMessage] = useState("");
  const [notepadId, setNotepadId] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setNotes("");
    const fetchNotes = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      try {
        const response = await fetch(
          `https://review-e7t3l1733-remititos-projects.vercel.app/api/notes/${
            notepad.notepad.padId + formattedDate
          }`
        );

        if (response.status === 204) {
          setNotesFetched(true);
          setOldNotes("");
          setNotepadId(notepad.notepad.padId);
          return null;
        }

        if (!response.ok) {
          throw new Error(
            `Network response was not ok (Status: ${response.status} ${response.statusText})`
          );
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
  }, [notepad.notepad.padId, date]);

  const handleDateChange = (date) => {
    setDate(date);
    setMessage("");
    setNotesFetched(false);
  };

  const saveNotes = () => {
    if (notes === oldNotes) {
      setMessage("Notes already saved");
      return;
    }
    fetch(
      `https://review-e7t3l1733-remititos-projects.vercel.app/api/notes/${notepad.notepad.padId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: notes,
        }),
      }
    )
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
          <div className="flex flex-col items-center">
            <div className="flex flex-row justify-around items-center">
              <label style={{ width: "50%" }}>{notepad.notepad.name}</label>
              <div style={{ width: "50%" }}>
                <DatePicker
                  selected={date}
                  onChange={(date) => handleDateChange(date)}
                />
              </div>
            </div>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setMessage("");
              }}
              style={{ height: "50vh" }}
              className="my-6 w-4/5"
              placeholder={
                oldNotes.length > 0
                  ? ""
                  : `Write your first note for ${date.toDateString()}...`
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
