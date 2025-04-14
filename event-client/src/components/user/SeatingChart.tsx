import React, { useState } from "react";

interface Section {
  id: string;
  type: "floor" | "lower" | "upper";
  x: number;
  y: number;
}

const sections: Section[] = [
  { id: "A1", type: "floor", x: 250, y: 250 },
  { id: "A2", type: "floor", x: 310, y: 250 },
  { id: "A3", type: "floor", x: 370, y: 250 },
  { id: "B1", type: "floor", x: 250, y: 300 },
  { id: "B2", type: "floor", x: 310, y: 300 },
  { id: "B3", type: "floor", x: 370, y: 300 },
  { id: "C1", type: "floor", x: 250, y: 350 },
  { id: "C2", type: "floor", x: 310, y: 350 },
  { id: "C3", type: "floor", x: 370, y: 350 },
  { id: "D1", type: "floor", x: 310, y: 400 },
  { id: "D2", type: "floor", x: 370, y: 400 },
  { id: "101", type: "lower", x: 160, y: 270 },
  { id: "102", type: "lower", x: 160, y: 320 },
  { id: "103", type: "lower", x: 160, y: 370 },
  { id: "104", type: "lower", x: 160, y: 420 },
  { id: "105", type: "lower", x: 440, y: 270 },
  { id: "106", type: "lower", x: 440, y: 320 },
  { id: "107", type: "lower", x: 440, y: 370 },
  { id: "108", type: "lower", x: 440, y: 420 },
  { id: "109", type: "lower", x: 440, y: 270 },
  { id: "110", type: "lower", x: 440, y: 320 },
  { id: "111", type: "lower", x: 440, y: 370 },
  { id: "112", type: "lower", x: 440, y: 420 },
  { id: "113", type: "lower", x: 440, y: 370 },
  { id: "401", type: "upper", x: 50, y: 270 },
  { id: "402", type: "upper", x: 50, y: 320 },
  { id: "403", type: "upper", x: 50, y: 370 },
  { id: "404", type: "upper", x: 50, y: 420 },
];

const colors: Record<string, string> = {
  floor: "bg-blue-500",
  lower: "bg-red-600",
  upper: "bg-yellow-400",
};

const SeatingChart: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <div className="relative mx-auto h-[600px] w-[700px] rounded-lg p-4">
      <div className="absolute top-[50px] left-[300px] rounded bg-black px-4 py-2 text-lg font-bold text-white">
        STAGE
      </div>
      {sections.map((section) => (
        <div
          key={section.id}
          onClick={() => setSelectedSection(section.id)}
          className={`absolute flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-lg border font-bold text-white transition-all ${
            colors[section.type]
          } ${selectedSection === section.id ? "scale-110 border-4 border-black" : "border border-gray-300"}`}
          style={{ left: section.x, top: section.y }}
        >
          {section.id}
        </div>
      ))}
    </div>
  );
};

export default SeatingChart;
