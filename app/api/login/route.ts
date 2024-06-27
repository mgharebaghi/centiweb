import { cookies } from "next/headers";
import { MongoClient, WithId } from "mongodb";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Admin } from "../types/types";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const db = client.db("centiweb");
    const collection = db.collection<WithId<Admin>>("admins");
    const { email, password } = await req.json();
    const document = await collection.findOne({ email: email });

    if (document) {
      if (document.password === password) {
        cookies().set("loggedin", "true", {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000), //save loged in data into cookies for 24 hours
        });
        return NextResponse.json({
          status: "success",
          description: "done",
        });
      } else {
        return NextResponse.json({
          status: "error",
          description: "password",
        });
      }
    } else {
      return NextResponse.json({
        status: "notfound",
        description: "user not found",
      });
    }
  } catch (e) {
    console.log(e);
  }
}
