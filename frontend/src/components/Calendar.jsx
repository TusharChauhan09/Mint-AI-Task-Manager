import React, { useState } from "react";

const Calendar = () => {
  const [currentDate] = useState(new Date());
  const [tasks] = useState([
    {
      id: 1,
      title: "PHP Project",
      time: "10:00 AM",
      completed: true,
    },
    { id: 2, title: "React Project",
       time: "1:30 PM",
       completed: false 
    },
    {
      id: 3,
      title: "OS Project",
      time: "3:00 PM",
      completed: false,
    },
  ]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const generateCalendarDays = () => {
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDate.getDate();
      const isHighlighted = [5, 10, 15, 18, 22].includes(day); // Example highlighted dates

      calendarDays.push(
        <div
          key={`day-${day}`}
          className={`h-10 w-10 flex items-center justify-center rounded-full
            ${isToday ? "bg-emerald-600 text-white" : ""}
            ${isHighlighted && !isToday ? "bg-emerald-50" : ""}
            hover:bg-emerald-100 cursor-pointer transition-colors`}
        >
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Task Calendar</h2>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-7 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div
              key={`day-${index}`}
              className="h-10 flex items-center justify-center text-sm text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Today's Tasks</h3>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  task.completed
                    ? "bg-emerald-600 border-emerald-600"
                    : "border-gray-300"
                }`}
              >
                {task.completed && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-xs text-gray-400">{task.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
