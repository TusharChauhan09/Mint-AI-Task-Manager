import React from "react";

const SideComponent = () => {
  const features = [
    {
      id: 1,
      title: "Smart task categorization",
      icon: (
        <svg
          className="w-5 h-5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Deadline predictions",
      icon: (
        <svg
          className="w-5 h-5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Work-life balance optimization",
      icon: (
        <svg
          className="w-5 h-5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Time Saving Badge */}
      <div className="inline-flex items-center space-x-2 bg-emerald-50 rounded-full px-4 py-2 mb-6">
        <svg
          className="w-5 h-5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm text-emerald-800">
          Save 10+ hours every week
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Focus on What Matters Most
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-8">
        MintTask's AI understands which tasks are most important and helps you
        organize your day for maximum productivity and minimal stress.
      </p>

      {/* Features List */}
      <div className="space-y-6">
        {features.map((feature) => (
          <div key={feature.id+100} className="flex items-center space-x-3">
            <div className="flex-shrink-0 bg-emerald-100 rounded-full p-2">
              {feature.icon}
            </div>
            <span className="text-lg text-gray-700">{feature.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideComponent;
