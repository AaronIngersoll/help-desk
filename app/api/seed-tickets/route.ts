import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

export async function GET(request: Request) {
  const defaultData = [
    {
      name: faker.lorem.words,
      email: faker.internet.email(),
      description: faker.lorem.sentences,
      status: "new",
    },
    {
      name: faker.lorem.words,
      email: faker.internet.email(),
      description: faker.lorem.sentences,
      status: "new",
    },
    {
      name: faker.lorem.words,
      email: faker.internet.email(),
      description: faker.lorem.sentences,
      status: "new",
    },
    {
      name: faker.lorem.words,
      email: faker.internet.email(),
      description: faker.lorem.sentences,
      status: "new",
    },
    {
      name: faker.lorem.words,
      email: faker.internet.email(),
      description: faker.lorem.sentences,
      status: "in progress",
    },
    {
      name: faker.lorem.words,
      email: faker.internet.email(),
      description: faker.lorem.sentences,
      status: "in progress",
    },
    {
      name: faker.lorem.words,
      email: faker.internet.email(),
      description: faker.lorem.sentences,
      status: "resolved",
    },
    {
      name: faker.lorem.words,
      email: faker.internet.email(),
      description: faker.lorem.sentences,
      status: "resolved",
    },
  ];
  try {
    for (const ticket of defaultData) {
      await sql`INSERT INTO tickets (name, email, description, status) VALUES (
        ${ticket.name()}, 
        ${ticket.email}, 
        ${ticket.description()}, 
        ${ticket.status}
        )`;
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const tickets = await sql`SELECT * FROM tickets`;
  return NextResponse.json({ tickets }, { status: 200 });
}
