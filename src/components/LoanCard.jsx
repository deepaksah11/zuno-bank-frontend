const LoanCard = ({ loan }) => {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
      loan.status === "Pending"
        ? "border-orange-400"
        : loan.status === "Active"
        ? "border-green-400"
        : "border-blue-900"
    }`}>

      {/* TOP */}
      <div className="flex justify-between items-center mb-4">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
            {loan.name[0]}
          </div>

          <div>
            <p className="font-semibold text-[#0A2463]">
              {loan.name}
            </p>
            <p className="text-xs text-gray-400">
              {loan.id}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase">Loan Amount</p>
          <h2 className="font-bold text-[#0A2463]">
            ₹{loan.amount}
          </h2>
        </div>

        <span className={`px-3 py-1 text-xs rounded font-semibold ${
          loan.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          {loan.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-5 gap-4 text-sm mb-4">

        <div>
          <p className="text-xs text-gray-400 uppercase">Loan Type</p>
          <p>{loan.type}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Date</p>
          <p>{loan.date}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Tenure</p>
          <p>{loan.tenure}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Interest</p>
          <p>{loan.interest}</p>
        </div>

        {loan.status === "Active" && (
          <div>
            <p className="text-xs text-gray-400 uppercase">Outstanding</p>
            <p>{loan.outstanding}</p>
          </div>
        )}

      </div>

      {/* PROGRESS (only active loans) */}
      {loan.status === "Active" && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-1">Repayment Progress</p>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-400 rounded"
              style={{ width: `${loan.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex gap-3">

        <button className="px-4 py-2 bg-gray-100 rounded text-sm">
          View Details
        </button>

        {loan.status === "Pending" && (
          <>
            <button className="px-4 py-2 bg-green-500 text-white rounded text-sm">
              Approve
            </button>

            <button className="px-4 py-2 bg-red-500 text-white rounded text-sm">
              Reject
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default LoanCard;