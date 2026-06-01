import { useStore } from "../store/useStore";

const TransactionCard = ({ txn }) => {

  const { selectedAccount } = useStore();

  const isDebit =
    txn.senderAccountNumber === selectedAccount?.accountNumber;

  // 🔁 Format Type
  const getType = () => {
    if (txn.type === "IMPS" || txn.type === "NEFT" || txn.type === "RTGS") {
      return "Transfer";
    }
    return txn.type;
  };

  // 💰 Format Amount
  const getAmount = () => {
    if (!selectedAccount) return `₹${txn.amount}`;

    if (txn.type === "DEPOSIT") return `+₹${txn.amount}`;
    if (txn.type === "WITHDRAW") return `-₹${txn.amount}`;

    // 🔥 Transfer logic
    return isDebit ? `-₹${txn.amount}` : `+₹${txn.amount}`;
  };

  // 🎨 Amount Color
  const getAmountColor = () => {
    if (txn.type === "DEPOSIT") return "text-green-600";
    if (txn.type === "WITHDRAW") return "text-red-500";

    return isDebit ? "text-red-500" : "text-green-600";
  };

  // 🎨 Border Color
  const getBorder = () => {
    if (txn.type === "DEPOSIT") return "border-green-400";
    if (txn.type === "WITHDRAW") return "border-red-400";

    return isDebit ? "border-red-400" : "border-green-400";
  };

  // 📅 Time
  const formatTime = () => {
    return txn.completedAt || txn.initiatedAt || "N/A";
  };

  // 👤 Customer Name
  const getCustomer = () => {
    return txn.receiverName || "Self";
  };

  // 🏷 Status Style
  const getStatusStyle = () => {
    return txn.status === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  const getDirection = () => {
    if (txn.type === "DEPOSIT") return "IN";
    if (txn.type === "WITHDRAW") return "OUT";
    return "TRANSFER";
  };

  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${getBorder()}`}>

      {/* TOP */}
      <div className="flex justify-between mb-4">

        <div>
          <h3 className="font-semibold text-[#0A2463]">
            #{txn.referenceId || txn.id}
          </h3>
          <p className="text-xs text-gray-400">
            {formatTime()}
          </p>
        </div>

        <div className="text-right">
          <h2 className={`text-lg font-bold ${getAmountColor()}`}>
            {getAmount()}
          </h2>

          <span className={`text-xs px-3 py-1 rounded font-semibold ${getStatusStyle()}`}>
            {txn.status}
          </span>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-4 gap-4 text-sm">

        <div>
          <p className="text-xs text-gray-400 uppercase">Receiver</p>
          <p className="font-medium">{getCustomer()}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">From Account</p>
          <p className="font-medium">{txn.senderAccountNumber}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Type</p>
          <span className="text-xs px-2 py-1 rounded font-semibold bg-gray-100">
            {getType()}
          </span>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase">Reference</p>
          <p className="font-medium">{txn.referenceId}</p>
        </div>

      </div>
    </div>
  );
};

export default TransactionCard;