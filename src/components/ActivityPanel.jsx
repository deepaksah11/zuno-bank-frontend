// components/ActivityPanel.jsx
const ActivityPanel = () => {
  const activities = [
    {
      time: "2 minutes ago",
      text: "New customer registration: Neha Gupta",
    },
    {
      time: "15 minutes ago",
      text: "Loan approved for Rahul Mehta - ₹5,00,000",
    },
    {
      time: "1 hour ago",
      text: "Account created: ACC-8901",
    },
    {
      time: "2 hours ago",
      text: "Large transaction flagged for review - #TXN",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <h2 className="text-lg font-semibold text-[#0A2463] mb-4 border-b border-gray-300 pb-3">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="pl-4 border-l-3 border-gray-200 hover:border-[#FB8500] hover:bg-gray-200/40 p-2 py-4 transition-all">
            <p className="text-xs text-gray-400 mb-1">{a.time}</p>
            <p className="text-sm text-gray-700">{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPanel;