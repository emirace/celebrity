"use client";

import React, { useState } from "react";

const Calendar: React.FC<{
  next: (data: { date: string; time: string }) => void;
  previous: () => void;
}> = ({ next, previous }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const availableTimes = ["09:00 AM", "12:00 PM", "03:00 PM"];

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Check if a date is available
  const isAvailableDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    // Make all days available except Saturday (6) and Sunday (0)
    return dayOfWeek !== 0 && dayOfWeek !== 6;
  };

  // Handle form submission (booking the session)
  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      next({ date: selectedDate as unknown as string, time: selectedTime });
    } else {
      alert("Please select a date and time");
    }
  };

  // Generate the calendar days for the current month
  const generateCalendar = () => {
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const calendarDays = [];
    const firstDayOfWeek = startOfMonth.getDay();

    // Add empty slots for the first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null);
    }

    // Add the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      calendarDays.push(day);
    }

    return calendarDays;
  };

  // Format the month for display (e.g., "January 2025")
  const formatMonthYear = () => {
    return `${currentMonth.toLocaleString("default", {
      month: "long",
    })} ${currentMonth.getFullYear()}`;
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Navigate to the previous month
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 pt-12">
      <h2 className="text-3xl font-bold mb-4">Select Date & Time</h2>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-70"
          onClick={handlePrevMonth}
        >
          &lt; Prev
        </button>
        <span className="text-xl font-semibold">{formatMonthYear()}</span>
        <button
          className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-70"
          onClick={handleNextMonth}
        >
          Next &gt;
        </button>
      </div>

      {/* Days of the Week Header */}
      <div className="grid grid-cols-7 gap-4 mb-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {generateCalendar().map((date, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg text-center cursor-pointer ${
              date
                ? isAvailableDate(date)
                  ? "bg-white bg-opacity-30 "
                  : "bg-white bg-opacity-10 text-black/50"
                : "bg-transparent"
            } 
            ${
              selectedDate &&
              selectedDate?.toLocaleDateString() === date?.toLocaleDateString()
                ? "border-2 border-red-500"
                : "border-2 border-gray-200 border-opacity-20"
            }`}
            onClick={() => date && handleDateClick(date)}
          >
            {date ? date.getDate() : ""}
          </div>
        ))}
      </div>

      {/* Time selection */}
      {selectedDate && isAvailableDate(selectedDate) && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Select a Time</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                className={`block w-full mb-2 py-2 text-center rounded-lg  ${
                  selectedTime === time ? "bg-red-500" : "bg-white/30 "
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-4"
      >
        Continue
      </button>
      <button
        onClick={previous}
        className="w-full py-2 border border-red-500  rounded-lg text-red-500"
      >
        Back
      </button>
    </div>
  );
};

export default Calendar;
