"use client";

import { useState } from "react";

interface SelectCategoryProps {
  next: (value: string) => void;
  previous: () => void;
  options: string[];
}

function SelectService({ next, previous, options }: SelectCategoryProps) {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Select Service</h2>
        <p className="text-gray-400 mt-2">
          Choose a service to proceed. This will help us tailor the experience
          to your needs.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {options.map((option) => (
          <div
            key={option}
            className={`p-6 flex items-center bg-white/10 rounded-lg cursor-pointer transition ${
              selected === option ? "ring-2 ring-red-500" : "hover:bg-white/20"
            }`}
            onClick={() => setSelected(option)}
          >
            <div
              className={`w-4 h-4 rounded mr-4 ${
                selected === option ? "bg-red-500" : "bg-white/40"
              }`}
            />
            <span className="text-xl font-medium">{option}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          className={`mt-8 px-6 py-3 rounded-md border border-red-500 text-red-500 font-semibold transition ${
            !selected ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
          disabled={!selected}
          onClick={() => previous()}
        >
          Back
        </button>
        <button
          className={`mt-8 px-6 py-3 rounded-md bg-red-500 text-white font-semibold transition ${
            !selected ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
          disabled={!selected}
          onClick={() => next(selected)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SelectService;
