"Use Client";

import React, { useState, FormEvent } from "react";
import { insertTicket } from "./lib/data";
export default function TicketForm({ notify }: { notify: () => void }) {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const ticket = {
      name: formData.get("ticketname") as string,
      email: formData.get("email") as string,
      description: formData.get("description") as string,
    };
    if (
      !ticket.name.trim() ||
      !ticket.email.trim() ||
      !ticket.description.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await insertTicket(ticket);
      const formElement = document.getElementById(
        "ticket-form"
      ) as HTMLFormElement;
      formElement.reset();
      notify();
    } catch (error) {
      console.error("Failed to insert ticket:", error);
    }
  };
  const onCancel = () => {
    const formElement = document.getElementById(
      "ticket-form"
    ) as HTMLFormElement;
    formElement.reset();
  };
  return (
    <form id="ticket-form" onSubmit={onSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Ticket Form
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will help us better assist you.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="Ticket Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ticket Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="ticketname"
                    id="ticketname"
                    autoComplete="ticketname"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Broken Button"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description of Ticket
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about what you need help with.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
