import dbConnect from "@/app/dbConnect";
import Notepad from "@/app/models/Notepad";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const notepad = await Notepad.findOne({ padId: body.padId });

    if ((notepad.passcode = body.passcode)) {
      return NextResponse.json({ message: "It's a Match" }, { status: 201 });
    } else {
      NextResponse.json({ message: "It's not a match" }, { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
