import dbConnect from "@/app/dbConnect";
import Notepad from "@/app/models/Notepad";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const notepad = await Notepad.findOne({
      padId: params.id,
      "notes.date": {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (notepad) {
      const todaysNotes = notepad.notes.filter((note) => {
        const noteDate = new Date(note.date);
        return noteDate >= startOfDay && noteDate <= endOfDay;
      });

      if (todaysNotes.length > 0) {
        return new NextResponse(JSON.stringify(todaysNotes), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        return new NextResponse(null, { status: 204 });
      }
    } else {
      return new NextResponse(null, { status: 204 });
    }
  } catch (err) {
    console.error("Error fetching today's notes for padId", padId, err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error: err }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req, { params }) {
  await dbConnect();
  const body = await req.json();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const notepad = await Notepad.findOne({ padId: params.id });

    if (!notepad) {
      return new NextResponse(
        JSON.stringify({ message: "No notepad with that ID" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    let todaysNote = notepad.notes.find((note) => {
      const noteDate = new Date(note.date);
      noteDate.setHours(0, 0, 0, 0);
      return noteDate.getTime() === today.getTime();
    });

    if (todaysNote) {
      todaysNote.content = body.content;
    } else {
      todaysNote = {
        content: body.content,
        date: new Date(),
      };
      notepad.notes.push(todaysNote);
    }

    await notepad.save();

    return new NextResponse(
      JSON.stringify({ message: "Notes updated successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Server Error:", err.stack);
    return new NextResponse(
      JSON.stringify({
        message: "Error processing your request",
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
