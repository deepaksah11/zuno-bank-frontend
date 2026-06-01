import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { Loader2 } from "lucide-react";

const TransactionTable = () => {

  const {
    transactions,
    fetchTransactions,
    isFetchingTransactions,
    selectedAccount // ✅ add this
  } = useStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const isDebit = (txn) =>
    txn.senderAccountNumber === selectedAccount?.accountNumber;

  const getAmount = (txn) => {
  if (txn.type === "DEPOSIT") return `+₹${txn.amount}`;
  if (txn.type === "WITHDRAW") return `-₹${txn.amount}`;

  return `₹${txn.amount}`; // transfer neutral
};

const getAmountColor = (txn) => {
  if (txn.type === "DEPOSIT") return "text-green-600";
  if (txn.type === "WITHDRAW") return "text-red-500";

  return "text-orange-500"; // transfer
};

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
        <h2 className="text-lg font-semibold text-[#0A2463]">
          Recent Transactions
        </h2>

        <button className="bg-[#FB8500] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 hover:bg-orange-700 transition-all">
          View All
        </button>
      </div>

      {/* Table */}
      {isFetchingTransactions ? <div className="flex justify-center items-center h-28"><Loader2 className="size-8 animate-spin text-[#1E3A8A]" /></div> :
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="p-3 text-left">Transaction ID</th>
            <th className="p-3 text-left">Account</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions
            .sort((a, b) => new Date(b.initiatedAt) - new Date(a.initiatedAt))
            .map((t, i) => (
              <tr key={i} className="border-t text-gray-600 border-gray-300 hover:bg-gray-50">

                <td className="p-4 font-medium text-[#0a2563df]">
                  {t.referenceId}
                </td>

                <td className="p-4">
                  {t.senderAccountNumber || t.receiverAccountNumber}
                </td>

                <td className="p-4">{t.type}</td>

                <td className={`p-3 font-semibold ${getAmountColor(t)} whitespace-nowrap`}>
                  {getAmount(t)}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${t.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {t.status}
                  </span>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
        </div>}
    </div>
  );
};

export default TransactionTable;