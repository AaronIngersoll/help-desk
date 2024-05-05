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
      reject(new Error("Failed to process ticket insertion."));
    }
  });
}
