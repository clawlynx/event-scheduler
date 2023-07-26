import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type feedback = {
  id?: number;
  title?: string;
  address?: string;
  sdate?: string;
  edate?: string;
  startTime?: string;
  endTime?: string;
};
const filePath = path.join(process.cwd(), "data/formdata.json");
export async function DELETE(request: Request) {
  try {
    const Id = request.url.slice(request.url.lastIndexOf("/") + 1);
    const oriId: number = parseInt(Id);
    console.log(Id);
    const rawData = fs.readFileSync(filePath, "utf8");
    const data: feedback[] = JSON.parse(rawData);
    const updatedData = data.filter((item: feedback) => item.id != oriId);
    fs.writeFileSync(filePath, JSON.stringify(updatedData));
    return NextResponse.json({ message: "added successfully" });
  } catch (error) {
    throw new Error();
  }
}
