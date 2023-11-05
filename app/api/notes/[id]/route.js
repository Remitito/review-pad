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
      return new NextResponse(
        JSON.stringify({ message: "Notepad not found." }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  const newNote = {
    content: body.content,
    date: new Date(),
  };

  try {
    const notepad = await Notepad.findById(params.id);

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

    notepad.notes.push(newNote);

    await notepad.save();

    return new NextResponse(
      JSON.stringify({ message: "Notes added successfully" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Error processing your request", err }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
