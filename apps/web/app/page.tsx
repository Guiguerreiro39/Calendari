"use client";

import { Calendar, Header, HeaderDate, MonthSwitcher } from "calendari";
import "../styles/tailwind.css";
import "calendari/dist/styles.css";
import { useState } from "react";

const CustomHeaderV2 = ({ addEvent }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <HeaderDate className="text-red-600" />
      <div className="space-x-4 flex">
        <MonthSwitcher
          className="bg-red-50 border-red-600"
          todayClassName="text-red-600 hover:bg-red-200"
          arrowsClassName="text-red-400 hover:bg-red-200"
        />
        <button
          className="bg-red-500 px-4 py-1 rounded-md text-white"
          onClick={addEvent}
        >
          Add event
        </button>
      </div>
    </div>
  );
};

const CustomHeader = ({ addEvent }) => {
  return (
    <div className="flex items-center w-full gap-4">
      <div className="w-full">
        <Header />
      </div>
      <button
        className="bg-red-500 px-4 py-1 rounded-md text-white whitespace-nowrap"
        onClick={addEvent}
      >
        Add event
      </button>
    </div>
  );
};

export default function Page() {
  const [events, setEvents] = useState([
    {
      title: "Date night",
      date: new Date(),
    },
    {
      title: "Design review",
      date: new Date(2023, 6, 12),
    },
    {
      title: "Hockey game",
      date: new Date(),
    },
  ]);

  const addEvent = () => {
    setEvents([
      ...events,
      {
        title: "Date night",
        date: new Date(2023, 6, 11),
      },
    ]);
  };

  return (
    <div className="m-8">
      <Calendar
        events={events}
        borderColor="red"
        customHeader={<CustomHeader addEvent={addEvent} />}
      />
    </div>
  );
}
