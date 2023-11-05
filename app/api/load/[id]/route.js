import dbConnect from "@/app/dbConnect";
import Notepad from "@/app/models/Notepad";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();

  const padId = params.id;

  const notepad = await Notepad.findOne({ padId: padId });
  return NextResponse.json({ notepad }, { status: 200 });
}

export async function POST(req, { params }) {
  await dbConnect();

  try {
    const body = await req.json();
    const notepad = await Notepad.findOne({ padId: params.id });

    if ((notepad.passcode = body.passcode)) {
      return NextResponse.json({ notepad }, { status: 200 });
    } else {
      NextResponse.json({ message: "It's not a match" }, { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
