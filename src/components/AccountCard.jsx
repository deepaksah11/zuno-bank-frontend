import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const AccountCard = ({ acc }) => {
  const { setSelectedAccount } = useStore();
  const navigate = useNavigate();

  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-2 transition-all border-t-4 ${acc.status === "ACTIVE" ? " border-green-400" : "border-red-600"}`}>

      {/* TOP */}
      <div className="flex justify-between mb-4">

        <span className={`text-xs px-3 py-1 rounded font-semibold
          ${acc.accountType === "SAVINGS" ? "bg-green-100 text-green-700" :
            acc.accountType === "CURRENT" ? "bg-yellow-100 text-yellow-700" :
              "bg-blue-100 text-blue-700"}
        `}>
          {acc.accountType.toUpperCase()}
        </span>

        <span className={`text-xs px-3 py-1 rounded font-semibold
          ${acc.status === "ACTIVE" ? "bg-green-100 text-green-700" :
            "bg-red-100 text-red-600"}
        `}>
          {acc.status}
        </span>

      </div>

      {/* ACCOUNT */}
      <h3 className="font-bold text-[#0A2463] text-lg">
        {acc.accountNumber}
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        {acc.customerName}
      </p>

      {/* BALANCE */}
      <p className="text-xs text-gray-400 uppercase">
        Available Balance
      </p>

      <h2 className="text-2xl font-bold text-[#0A2463] mb-4">
        ₹{acc.balance}
      </h2>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-lg text-sm font-medium">
          View Details
        </button>

        <button onClick={() => {
          setSelectedAccount(acc);
          navigate("/transactions");
        }} className="flex-1 py-2 bg-[#FB8500] hover:bg-amber-600 hover:cursor-pointer text-white rounded-lg text-sm font-medium">
          Transactions
        </button>
      </div>

    </div>
  );
};

export default AccountCard;