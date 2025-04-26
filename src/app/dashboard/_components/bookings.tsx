const areas = [
  { name: "Sport Skills", value: 71, icon: "🟠" },
  { name: "Blogging", value: 92, icon: "🔵" },
  { name: "Leadership", value: 33, icon: "🟠" },
  { name: "Meditation", value: 56, icon: "🟦" },
  { name: "Philosophy", value: 79, icon: "🔵" },
];

const Booking = () => {
  return (
    <div className=" p-5 mt-6">
      <h2 className="text-xl font-medium mb-1">Developed areas</h2>
      <p className="text-sm text-gray-400 mb-8">
        Most common areas of interests
      </p>

      <div className="space-y-4">
        {areas.map((area, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1 text-sm font-medium">
              <span>{area.name}</span>
              <span>{area.value}%</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-blue-500"
                style={{ width: `${area.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
