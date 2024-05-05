"use client";

import React, { useState, useEffect } from "react";
import { Card } from "../../ui/admin/cards";
import {
  queryNewTickets,
  queryInProgressTickets,
  queryResolvedTickets,
} from "../../lib/data";
import { Ticket } from "../../lib/definitions";
import TicketList from "../../ui/TicketList";
import TicketDetails from "../../ui/TicketDetails";

const page = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicketsCount, setNewTicketsCount] = useState(0);
  const [inProgressTicketsCount, setInProgressTicketsCount] = useState(0);
  const [resolvedTicketsCount, setresolvedTicketsCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [fetchTickets, setFetchTickets] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };
  const handleStatusUpdate = () => {
    setIsLoading(true);
    setFetchTickets((prev) => !prev);
  };
  const fetchAllTickets = async () => {
    const newTicketsData = await queryNewTickets();
    const inProgressData = await queryInProgressTickets();
    const resolvedData = await queryResolvedTickets();
    setTickets(
      inProgressData.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        description: ticket.description,
        email: ticket.email,
        status: ticket.status,
        created_at: ticket.created_at,
      }))
    );
    setSelectedTicket(resolvedData[0] as Ticket);
    setNewTicketsCount(newTicketsData.length);
    setInProgressTicketsCount(inProgressData.length);
    setresolvedTicketsCount(resolvedData.length);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAllTickets();
    if (tickets.length > 0) {
      setSelectedTicket(tickets[1]);
    }
  }, [fetchTickets]);

  return (
    <main>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="New" value={newTicketsCount} type="new" />
        <Card
          title="In Progress"
          value={inProgressTicketsCount}
          type="inProgress"
        />
        <Card title="Resolved" value={resolvedTicketsCount} type="resolved" />
      </div>
      <div className="mt-6 w-full grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {!isLoading ? (
          <>
            <TicketList tickets={tickets} onClick={handleTicketClick} />
            {selectedTicket && (
              <TicketDetails
                ticket={selectedTicket}
                handleStatusUpdate={handleStatusUpdate}
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
            <span>Loading...</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
