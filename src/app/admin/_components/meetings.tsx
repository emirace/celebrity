import { FiCalendar, FiChevronRight, FiExternalLink } from "react-icons/fi";

const meetings = [
  {
    date: "Tue, 11 Jul",
    time: "08:15 am",
    title: "Quick Daily Meeting",
    platform: "Zoom",
    icon: "🔵",
  },
  {
    date: "Tue, 11 Jul",
    time: "09:30 pm",
    title: "John Onboarding",
    platform: "Google Meet",
    icon: "🟩",
  },
  {
    date: "Tue, 12 Jul",
    time: "02:30 pm",
    title: "Call With a New Team",
    platform: "Google Meet",
    icon: "🟩",
  },
  {
    date: "Tue, 15 Jul",
    time: "04:00 pm",
    title: "Lead Designers Event",
    platform: "Zoom",
    icon: "🔵",
  },
];

const Meetings = () => {
  return (
    <div className="p-5 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-medium">My meetings</h2>
        <FiCalendar className="w-5 h-5 text-gray-500" />
      </div>

      <ul className="space-y-4">
        {meetings.map((meeting, idx) => (
          <li key={idx} className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{meeting.date}</p>
              <span>{meeting.time}</span>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-base font-medium">{meeting.title}</p>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <span className="text-sm">{meeting.icon}</span>
                <span>{meeting.platform}</span>
              </div>
            </div>
            <FiExternalLink className="w-4 h-4 text-gray-400 mt-1" />
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm text-blue-600 font-medium flex items-center gap-1 cursor-pointer">
        See all meetings <FiChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Meetings;
