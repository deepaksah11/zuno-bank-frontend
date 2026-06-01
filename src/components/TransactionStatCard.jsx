const TransactionStatCard = ({ title, value, subtitle, color }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border-t-4 ${color}`}>
      
      <p className="text-xs uppercase text-gray-500 font-semibold mb-2">
        {title}
      </p>

      <h2 className="text-2xl font-bold text-[#0A2463]">
        {value}
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
};

export default TransactionStatCard;