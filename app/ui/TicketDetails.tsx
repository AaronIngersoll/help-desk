import React, { useState } from "react";
import { Ticket } from "../lib/definitions";
import { updateTicketStatusById } from "../lib/data";

interface TicketDetailsProps {
  ticket: Ticket;
  handleStatusUpdate: () => void;
  handleSendEmail: (response: string) => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  ticket,
  handleStatusUpdate,
  handleSendEmail,
}) => {
  const [response, setResponse] = useState("");

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    updateTicketStatusById(ticket.id, newStatus);
    handleStatusUpdate();
  };

  const handleResponseChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setResponse(event.target.value);
  };

  const formattedDate = new Date(ticket.created_at).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const ticketStatus = ticket.status;

  return (
    <div className="w-full p-6 overflow-y-auto" style={{ width: "70vw" }}>
      <h2 className="text-2xl font-semibold">{ticket.name}</h2>
      <div className="text-gray-600 mb-4">From: {ticket.email}</div>
      <div className="border-b border-gray-300 mb-4"></div>
      <p className="text-gray-800">{ticket.description}</p>
      <div className="mt-4 flex flex-col justify-between items-center">
        <textarea
          value={response}
          onChange={handleResponseChange}
          placeholder="Enter your response..."
          rows={4} // Adjust the number of rows as needed
          className="w-full border-4 border-gray-300 px-4 py-2 rounded-md outline-none mb-2"
        />
        <button
          onClick={() => handleSendEmail(response)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto"
        >
          Send Email
        </button>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-400">{formattedDate}</div>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 px-4 py-2 rounded-md outline-none"
            onChange={handleStatusChange}
            defaultValue={ticketStatus}
          >
            <option
              value="new"
              disabled={ticket.status === "new" || ticket.status === "resolved"}
            >
              New
            </option>
            <option
              value="in progress"
              disabled={
                ticket.status === "in progress" || ticket.status === "resolved"
              }
            >
              In Progress
            </option>
            <option value="resolved" disabled={ticket.status === "resolved"}>
              Resolved
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
