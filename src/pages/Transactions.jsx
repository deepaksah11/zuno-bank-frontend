import TransactionStatCard from "../components/TransactionStatCard";
import TransactionCard from "../components/TransactionCard";
import AddBeneficiaryModal from "../components/AddBeneficiaryModal";
import TransferModal from "../components/TransferModal";
import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import TransactionModal from "../components/TransactionModal";
import { Cross, Loader2, X } from "lucide-react";

const Transactions = () => {

  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const {
    transactions,
    fetchTransactions,
    fetchBeneficiaries,
    isFetchingTransactions,
    selectedAccount,
    setSelectedAccount,
    user,
  } = useStore();

  useEffect(() => {
    fetchTransactions();

    if (user?.cif) {
      fetchBeneficiaries(user.cif);
    }
  }, [user]);

  const filteredTransactions = selectedAccount
    ? transactions.filter(
      (txn) =>
        txn.senderAccountNumber === selectedAccount.accountNumber ||
        txn.receiverAccountNumber === selectedAccount.accountNumber
    )
    : transactions;

  return (
    <div className="p-6">

      {/* 🔵 HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-2xl shadow-sm">

        <h1 className="text-2xl font-semibold text-[#0A2463]">
          Transaction Management
        </h1>

        <div className="flex gap-3">
          <button className="bg-[#FB8500] hover:bg-amber-600 transition-all hover:cursor-pointer text-white px-4 py-2 rounded-lg text-sm">
            Export Report
          </button>

          <button
            onClick={() => setShowBeneficiaryModal(true)}
            className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#03206e] hover:shadow-md hover:-translate-y-1 shadow-[#405fb5] hover:cursor-pointer text-white px-4 py-2 text-sm text-center rounded-lg font-medium hover:opacity-90 transition"
          >
            ＋ Add Beneficiary
          </button>

          <button onClick={() => setShowTransactionModal(true)} className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#03206e] hover:shadow-md hover:-translate-y-1 shadow-[#405fb5] hover:cursor-pointer text-white px-4 py-2 text-sm text-center rounded-lg font-medium hover:opacity-90 transition">
            ＋ New Transaction
          </button>
        </div>

      </div>

      {/* <div className=" bg-white p-2 mb-5 rounded-lg shadow-sm border-2 border-gray-200"> */}
        {selectedAccount && (
          <div className="flex justify-between bg-white p-2 mb-5 rounded-lg shadow-sm border-2 border-gray-200">
            <p className="text-sm text-gray-500 mt-1">
              Selected Account: <span className="font-medium">{selectedAccount.accountNumber}</span>
            </p>
            <div onClick={() => setSelectedAccount(null)} className=" hover:cursor-pointer">
              <X className="size-5" />
            </div>
          </div>
        )}
      {/* </div> */}

      {/* 📊 STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <TransactionStatCard
          title="Today's Deposits"
          value="₹45.2M"
          subtitle="1,247 transactions"
          color="border-green-400"
        />

        <TransactionStatCard
          title="Today's Withdrawals"
          value="₹28.8M"
          subtitle="892 transactions"
          color="border-red-400"
        />

        <TransactionStatCard
          title="Today's Transfers"
          value="₹67.5M"
          subtitle="1,403 transactions"
          color="border-orange-400"
        />

        <TransactionStatCard
          title="Pending Review"
          value="47"
          subtitle="Requires attention"
          color="border-blue-900"
        />

      </div>

      {/* 🔍 FILTERS */}
      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 grid grid-cols-5 gap-4">

        <input
          placeholder="Transaction ID, Account..."
          className="p-2 border rounded-xl text-sm"
        />

        <select className="p-2 border rounded-xl text-sm">
          <option>All Types</option>
        </select>

        <select className="p-2 border rounded-xl text-sm">
          <option>All Status</option>
        </select>

        <input type="date" className="p-2 border rounded-xl text-sm" />

        <input type="date" className="p-2 border rounded-xl text-sm" />

      </div>

      {/* 📄 TRANSACTIONS LIST */}
      <div className="space-y-4">
        {!isFetchingTransactions ? filteredTransactions.map((txn) => (
          <TransactionCard key={txn.id} txn={txn} />
        ))
          : <div className="flex justify-center items-center h-60">
            {isFetchingTransactions && <Loader2 className="size-8 animate-spin text-[#1E3A8A]" />}
          </div>
        }
      </div>

      {/* MODALS */}
      {showBeneficiaryModal && (
        <AddBeneficiaryModal onClose={() => setShowBeneficiaryModal(false)} />
      )}

      {showTransactionModal && (
        <TransactionModal onClose={() => setShowTransactionModal(false)} />
      )}

    </div>
  );
};

export default Transactions;