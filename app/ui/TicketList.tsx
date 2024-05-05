import React from "react";
import { Ticket } from "../lib/definitions";

interface TicketListProps {
  tickets: Ticket[];
  onClick: (ticket: Ticket) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onClick }) => {
  return (
    <div
      className="container mx-auto border-r border-gray-300 p-1"
      style={{ overflowY: "auto", maxHeight: "800px" }}
    >
      <div className="grid grid-cols-1 gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onClick(ticket)}
          >
            {ticket.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
