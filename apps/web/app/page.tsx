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
      <Header />
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
      startAt: new Date(2023, 6, 28),
      endAt: new Date(2023, 7, 1),
    },
    {
      title: "Design review",
      startAt: new Date(),
      endAt: new Date(),
    },
    {
      title: "Hockey game",
      startAt: new Date(),
      endAt: new Date(),
    },
    {
      title: "Hockey game",
      startAt: new Date(),
      endAt: new Date(),
    },
  ]);

  const addEvent = () => {
    setEvents([
      ...events,
      {
        title: "Date night",
        startAt: new Date(2023, 6, 28),
        endAt: new Date(2023, 7, 1),
      },
    ]);
  };

  return (
    <div>
      <Calendar
        events={events}
        // customHeader={<CustomHeader addEvent={addEvent} />}
        header={false}
        eventLimit={3}
        dayContainerClickable
        borderColor="red"
        todayClassName="bg-red-600"
        todayContainerClassName="bg-red-200"
        dayContainerClassName="bg-red-50 hover:bg-red-100"
        className="shadow-none min-h-screen rounded-none border-0"
        timeContainerClassName="bg-red-50 text-red-600 py-0"
        timeGridClassName="border-0"
        eventClassName="bg-red-500 hover:bg-red-400 text-white text-xs"
        eventLimitClassName="text-xs font-normal text-red-800"
      />
    </div>
  );
}
