import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Notepad = (notepad) => {
  const [notes, setNotes] = useState("");
  const [oldNotes, setOldNotes] = useState("");
  const [notesFetched, setNotesFetched] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setNotes("");
    const fetchNotes = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      try {
        const response = await fetch(
          `http://localhost:3000/api/notes/${
            notepad.notepad.padId + formattedDate
          }`
        );

        if (response.status === 204) {
          setNotesFetched(true);
          setOldNotes("");
          return null;
        }

        if (!response.ok) {
          // Attempt to get the error message from the response body
          const errorBody = await response.text(); // Using .text() to handle non-JSON responses as well
          let errorInfo;
          try {
            // Try to parse it as JSON if the error response is JSON
            const parsedBody = JSON.parse(errorBody);
            // Assuming the API returns an error in a consistent format, for example:
            // { error: "Detailed error message" }
            errorInfo = parsedBody.error || parsedBody.message;
          } catch (e) {
            // If it's not JSON or not in the expected format, use the raw text
            errorInfo = errorBody;
          }

          // Construct a detailed error message
          throw new Error(
            `Network response was not ok (Status: ${response.status} ${response.statusText}). Error: ${errorInfo}`
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
            <div>
              <DatePicker
                selected={date}
                onChange={(date) => handleDateChange(date)}
              />
            </div>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setMessage("");
              }}
              className="my-6"
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
