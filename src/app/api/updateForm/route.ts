import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
// type of file to stored on json
type feedback = {
  id: number;
  title?: string;
  address?: string;
  sdate?: string;
  edate?: string;
  startTime?: string;
  endTime?: string;
};
const filePath = path.join(process.cwd(), "data/formdata.json"); //path of json file

// post request. gets called when event is added
export async function POST(request: Request) {
  try {
    const data: Partial<feedback> = await request.json();

    const existingData = fs.readFileSync(filePath, "utf8"); // reading data in json

    // if no data on the json file
    if (!existingData) {
      let empty: feedback[] = [];
      const newData: feedback = { ...data, id: 1 };
      empty.push(newData);
      fs.writeFileSync(filePath, JSON.stringify(empty));
      return NextResponse.json({ message: "added successfully" });
    }
    // if data on json file
    const upData: feedback[] = JSON.parse(existingData);
    const idofNext = upData[upData.length - 1]; //setting up correct id
    const intId = idofNext.id + 1;
    const updated: feedback = { ...data, id: intId };
    upData.push(updated);

    fs.writeFileSync(filePath, JSON.stringify(upData)); // writing file
    return NextResponse.json({ message: "added successfully" });
  } catch (error) {
    throw new Error();
  }
}

// get request gets called when initial fetching when page loads
export async function GET() {
  const existingData = fs.readFileSync(filePath, "utf8");

  if (existingData) {
    const newExistingData = JSON.parse(existingData);
    return NextResponse.json(newExistingData);
  } else {
    return NextResponse.json(null);
  }
}

// put request for updating the event
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const rawData = fs.readFileSync(filePath, "utf8");
    const datafromJson: feedback[] = JSON.parse(rawData);
    // mapping data and replacing the one that is updated
    const updatedData = datafromJson.map((item) =>
      item.id === data.id ? data : item
    );
    fs.writeFileSync(filePath, JSON.stringify(updatedData));
    return NextResponse.json({ message: "added successfully" });
  } catch (error) {
    throw new Error();
  }
}
