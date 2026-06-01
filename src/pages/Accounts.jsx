import AccountStatCard from "../components/AccountStatCard";
import AccountCard from "../components/AccountCard";
import { useStore } from "../store/useStore";
import { useEffect } from "react";
import {
  Loader2,
  RefreshCcw,
  IndianRupee,
  CreditCard,
  Landmark
} from "lucide-react";

const Accounts = () => {

  const { accountsAndStats, fetchAccounts, refreshAccounts, isFetchingAccounts } = useStore();

  const accounts = accountsAndStats?.accounts || [];

  const totalSavingAccounts = accountsAndStats?.totalSavingAccounts || 0;
  const totalSavingBalance = accountsAndStats?.totalSavingBalance || 0;

  const totalCurrentAccounts = accountsAndStats?.totalCurrentAccounts || 0;
  const totalCurrentBalance = accountsAndStats?.totalCurrentBalance || 0;

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (isFetchingAccounts) return (
    <div className="flex h-screen justify-center items-center">
      <Loader2 className='size-10 animate-spin text-blue-600' />
    </div>
  )

  return (
    <div className="p-6">

      {/* 🔵 HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0A2463]">
          Account Management
        </h1>

        {/* ✅ Refresh button */}
        <button
          onClick={refreshAccounts}
          className="flex items-center text-sm text-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium hover:bg-blue-200 hover:cursor-pointer transition"
        >
          <RefreshCcw className="size-4"/> Refresh
        </button>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <AccountStatCard
          title="Savings Accounts"
          value={totalSavingAccounts}
          subtitle={`Total Balance: ₹${totalSavingBalance}`}
          color="border-green-400"
          icon={IndianRupee}
        />

        <AccountStatCard
          title="Current Accounts"
          value={totalCurrentAccounts}
          subtitle={`Total Balance: ₹${totalCurrentBalance}`}
          color="border-orange-400"
          icon={CreditCard}
        />

        <AccountStatCard
          title="Fixed Deposits"
          value="1,700"
          subtitle="Total Balance: ₹56.2M"
          color="border-blue-900"
          icon={Landmark}
        />
      </div>

      {/* 🔍 FILTERS */}
      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 grid grid-cols-4 gap-4">

        <input
          placeholder="Account number, customer name..."
          className="p-2 border rounded-xl text-sm"
        />

        <select className="p-2 border rounded-xl text-sm">
          <option>All Types</option>
        </select>

        <select className="p-2 border rounded-xl text-sm">
          <option>All Status</option>
        </select>

        <select className="p-2 border rounded-xl text-sm">
          <option>All Ranges</option>
        </select>

      </div>

      {/* 🧾 ACCOUNT CARDS */}
      <div className="grid grid-cols-3 gap-4">
        {accounts.map((acc, i) => (
          <AccountCard key={i} acc={acc} />
        ))}
      </div>

    </div>
  );
};

export default Accounts;