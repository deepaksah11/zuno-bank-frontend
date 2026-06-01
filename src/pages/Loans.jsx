import LoanStatCard from "../components/LoanStatCard";
import LoanCard from "../components/LoanCard";
import { Construction } from "lucide-react";

const Loans = () => {

  const loans = [
    {
      id: "LOAN-10001",
      name: "Rajesh Kumar",
      amount: "5,00,000",
      status: "Pending",
      type: "Personal Loan",
      date: "Mar 28, 2026",
      tenure: "5 Years",
      interest: "8.5% p.a",
    },
    {
      id: "LOAN-10002",
      name: "Priya Sharma",
      amount: "25,00,000",
      status: "Active",
      type: "Home Loan",
      date: "Jan 15, 2025",
      tenure: "20 Years",
      interest: "7.2% p.a",
      outstanding: "23,45,000",
      progress: 6,
    },
    {
      id: "LOAN-10003",
      name: "Amit Patel",
      amount: "10,00,000",
      status: "Active",
      type: "Car Loan",
      date: "Sep 10, 2024",
      tenure: "7 Years",
      interest: "9.0% p.a",
      outstanding: "7,85,000",
      progress: 21,
    },
  ];

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0A2463]">
          Loan Management
        </h1>

        <button className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#03206e] hover:shadow-md hover:-translate-y-1 shadow-[#405fb5] hover:cursor-pointer text-white px-4 py-2 text-sm text-center rounded-lg font-medium hover:opacity-90 transition">
          ＋ New Loan Application
        </button>
      </div>

      <div className="flex flex-col items-center justify-center h-[70vh] bg-white rounded-2xl shadow-sm">

        {/* ICON */}
        <div className="bg-blue-100 p-5 rounded-full mb-4">
          <Construction className="size-10 text-blue-600" />
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Loan Module Coming Soon
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm text-center max-w-md">
          We're working on building a powerful loan management system.
          Stay tuned — it will be available soon 🚀
        </p>

        {/* OPTIONAL BADGE */}
        <span className="mt-4 px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
          Under Development
        </span>

      </div>


      {/* <div className="grid grid-cols-4 gap-4 mb-6">

        <LoanStatCard
          title="Active Loans"
          value="1,847"
          subtitle="Total Outstanding: ₹156.8M"
          color="border-green-400"
        />

        <LoanStatCard
          title="Pending Approval"
          value="124"
          subtitle="Amount Requested: ₹18.5M"
          color="border-orange-400"
        />

        <LoanStatCard
          title="Approved This Month"
          value="289"
          subtitle="Total Amount: ₹24.3M"
          color="border-blue-900"
        />

        <LoanStatCard
          title="Overdue/Defaulted"
          value="47"
          subtitle="Recovery Amount: ₹3.2M"
          color="border-red-400"
        />

      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 grid grid-cols-4 gap-4">

        <input
          placeholder="Loan ID, customer name..."
          className="p-3 border rounded-xl text-sm"
        />

        <select className="p-3 border rounded-xl text-sm">
          <option>All Types</option>
        </select>

        <select className="p-3 border rounded-xl text-sm">
          <option>All Status</option>
        </select>

        <select className="p-3 border rounded-xl text-sm">
          <option>All Amounts</option>
        </select>

      </div>

      <div className="space-y-4">
        {loans.map((loan, i) => (
          <LoanCard key={i} loan={loan} />
        ))}
      </div> */}

    </div>
  );
};

export default Loans;