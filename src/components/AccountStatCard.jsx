const AccountStatCard = ({ title, value, subtitle, color, icon }) => {
  const Icon = icon;
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border-t-4 ${color}`}>

      <div className="flex justify-between items-center mb-3">
        <p className="text-xs uppercase text-gray-500 font-semibold">
          {title}
        </p>

        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon size={18} className="text-[#0A2463]" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#0A2463]">
        {value}
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
};

export default AccountStatCard;