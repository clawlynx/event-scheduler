import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type feedback = {
  id: number;
  title?: string;
  address?: string;
  sdate?: string;
  edate?: string;
  startTime?: string;
  endTime?: string;
};
const filePath = path.join(process.cwd(), "data/formdata.json");

export async function POST(request: Request) {
  try {
    const data: Partial<feedback> = await request.json();

    const existingData = fs.readFileSync(filePath, "utf8");
    if (!existingData) {
      let empty: feedback[] = [];
      const newData: feedback = { ...data, id: 1 };
      empty.push(newData);
      fs.writeFileSync(filePath, JSON.stringify(empty));
      return NextResponse.json({ message: "added successfully" });
    }

    const upData: feedback[] = JSON.parse(existingData);
    const idofNext = upData[upData.length - 1];
    const intId = idofNext.id + 1;
    const updated: feedback = { ...data, id: intId };
    upData.push(updated);

    fs.writeFileSync(filePath, JSON.stringify(upData));
    return NextResponse.json({ message: "added successfully" });
  } catch (error) {
    throw new Error();
  }
}

export async function GET() {
  const existingData = fs.readFileSync(filePath, "utf8");

  if (existingData) {
    const newExistingData = JSON.parse(existingData);
    return NextResponse.json(newExistingData);
  } else {
    return NextResponse.json(null);
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const rawData = fs.readFileSync(filePath, "utf8");
    const datafromJson: feedback[] = JSON.parse(rawData);
    const updatedData = datafromJson.map((item) =>
      item.id === data.id ? data : item
    );
    fs.writeFileSync(filePath, JSON.stringify(updatedData));
    return NextResponse.json({ message: "added successfully" });
  } catch (error) {
    throw new Error();
  }
}
