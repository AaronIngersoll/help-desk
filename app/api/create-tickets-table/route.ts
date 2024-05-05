import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
    CREATE TABLE tickets (
      id SERIAL PRIMARY KEY,
      name TEXT,
      email TEXT,
      description TEXT,
      status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in progress', 'resolved')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
