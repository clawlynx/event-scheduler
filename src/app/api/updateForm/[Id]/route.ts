/***********************************************************************dynamic api route for deleting based on id **************************************************************/

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
// type of data to be filled on json
type feedback = {
  id?: number;
  title?: string;
  address?: string;
  sdate?: string;
  edate?: string;
  startTime?: string;
  endTime?: string;
};
//file route of the json file
const filePath = path.join(__dirname, "data/formdata.json");
export async function DELETE(request: Request) {
  try {
    const Id = request.url.slice(request.url.lastIndexOf("/") + 1);
    const oriId: number = parseInt(Id);
    console.log(Id);
    const rawData = fs.readFileSync(filePath, "utf8"); //reading file from json file
    const data: feedback[] = JSON.parse(rawData);
    const updatedData = data.filter((item: feedback) => item.id != oriId); // filtering the json file and excluding the deleted
    fs.writeFileSync(filePath, JSON.stringify(updatedData)); //writing updata data to json file
    return NextResponse.json({ message: "added successfully" });
  } catch (error) {
    throw new Error();
  }
}
