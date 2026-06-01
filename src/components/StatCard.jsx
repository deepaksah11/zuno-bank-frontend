// components/StatCard.jsx
const StatCard = ({ title, value, change, positive, icon }) => {
  const Icon = icon;
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border-t-4 border-orange-400 hover:shadow-lg hover:-translate-y-1 transition-all">

      <div className="flex justify-between items-center mb-4">
        <p className="text-xs uppercase text-gray-500 font-semibold tracking-wide">
          {title}
        </p>

        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
          <Icon className="size-4.5" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#0A2463] mb-2">
        {value}
      </h2>

      <p className={`text-xs font-medium ${positive ? "text-green-600" : "text-red-500"}`}>
        {change}
      </p>
    </div>
  );
};

export default StatCard;