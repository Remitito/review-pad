import dbConnect from "@/app/dbConnect";
import Notepad from "@/app/models/Notepad";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();

  const padId = params.id;

  const notepad = await Notepad.findOne({ padId: padId });
  return NextResponse.json({ notepad }, { status: 200 });
}
