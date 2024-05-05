"use server";

import { sql } from "@vercel/postgres";

export async function insertTicket(ticket: {
  name: string;
  email: string;
  description: string;
}) {
  return new Promise((resolve, reject) => {
    try {
      // Execute the SQL insert command using the ticket details
      sql`INSERT INTO tickets (name, email, description) VALUES (
                ${ticket.name}, 
                ${ticket.email}, 
                ${ticket.description}
            )`
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.error("Database Error:", err);
          reject(new Error("Failed to insert ticket."));
        });
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  });
}

export async function queryNewTickets() {
  try {
    const { rows } =
      await sql`SELECT * FROM tickets WHERE status = 'new' ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error("Unexpected Error:", error);
    throw new Error("Failed to gather tickets");
  }
}
export async function queryResolvedTickets() {
  try {
    const { rows } =
      await sql`SELECT * FROM tickets WHERE status = 'resolved'  ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error("Unexpected Error:", error);
    throw new Error("Failed to gather tickets");
  }
}
export async function queryInProgressTickets() {
  try {
    const { rows } =
      await sql`SELECT * FROM tickets WHERE status = 'in progress'  ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error("Unexpected Error:", error);
    throw new Error("Failed to gather tickets");
  }
}
export async function updateTicketStatusById(
  ticketId: string,
  newStatus: string
) {
  try {
    const { rows } = await sql`
      UPDATE tickets
      SET status = ${newStatus}
      WHERE id = ${ticketId}
      RETURNING *`;
    if (rows.length === 0) {
      throw new Error(`Ticket with ID ${ticketId} not found.`);
    }
    return rows[0];
  } catch (error) {
    console.error("Unexpected Error:", error);
    throw new Error("Failed to update ticket status.");
  }
}
