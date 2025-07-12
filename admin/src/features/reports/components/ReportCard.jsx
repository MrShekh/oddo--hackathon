import React, { useState } from "react";

const ReportCard = ({ title }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-400 text-sm"
            value={start}
            onChange={e => setStart(e.target.value)}
            placeholder="dd-mm-yyyy"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-400 text-sm"
            value={end}
            onChange={e => setEnd(e.target.value)}
            placeholder="dd-mm-yyyy"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button className="bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-indigo-800 transition-colors">Download CSV</button>
        <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition-colors">Download Excel</button>
      </div>
    </div>
  );
};

export default ReportCard; 