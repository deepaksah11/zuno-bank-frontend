import { useState } from "react";
import TransferModal from "./TransferModal";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";

const TransactionModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("transfer");

  const tabStyle = (tab) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      activeTab === tab
        ? "bg-[#1E3A8A] text-white"
        : "bg-gray-100 text-gray-600"
    }`;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[500px] shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0A2463]">
            New Transaction
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setActiveTab("transfer")} className={tabStyle("transfer")}>
            Transfer
          </button>
          <button onClick={() => setActiveTab("deposit")} className={tabStyle("deposit")}>
            Deposit
          </button>
          <button onClick={() => setActiveTab("withdraw")} className={tabStyle("withdraw")}>
            Withdraw
          </button>
        </div>

        {/* CONTENT */}
        {activeTab === "transfer" && <TransferModal onClose={onClose} />}
        {activeTab === "deposit" && <DepositForm onClose={onClose} />}
        {activeTab === "withdraw" && <WithdrawForm onClose={onClose} />}

      </div>
    </div>
  );
};

export default TransactionModal;