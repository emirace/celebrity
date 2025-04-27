"use client";

import { useState } from "react";
import { FaCalendarAlt, FaBullhorn, FaTv } from "react-icons/fa";

const categories = [
  { name: "Event", icon: FaCalendarAlt },
  { name: "Marketing", icon: FaBullhorn },
  { name: "TV & Radio", icon: FaTv },
];

function SelectCategory({ next }: { next: (value: string) => void }) {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="p-6 ">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Select Category</h2>
        <p className="text-gray-400 mt-2">
          Choose a category to proceed. This will help us tailor the experience
          to your needs.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`p-6 flex flex-col items-center justify-center bg-white/10 rounded-lg cursor-pointer transition ${
              selected === category.name
                ? "ring-4 ring-red-500"
                : "hover:bg-white/20"
            }`}
            onClick={() => setSelected(category.name)}
          >
            <category.icon className="w-16 h-16 mb-4" />
            <span className="text-xl font-medium">{category.name}</span>
          </div>
        ))}
      </div>

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
  );
}

export default SelectCategory;
