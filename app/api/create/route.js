import dbConnect from "@/app/dbConnect";
import Notepad from "@/app/models/Notepad";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    const initialNote = {
      content: "Notepad created!",
      date: new Date(),
    };

    body.notes = body.notes ? [...body.notes, initialNote] : [initialNote];

    await Notepad.create(body);

    return new NextResponse(JSON.stringify({ message: "Notepad Created" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Error", err }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
