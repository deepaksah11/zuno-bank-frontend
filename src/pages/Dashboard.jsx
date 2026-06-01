import { useEffect, useState } from "react";
import ActivityPanel from "../components/ActivityPanel";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionsTable";
import { useStore } from "../store/useStore";
import UserProfileModal from "../components/UserProfileModal";
import { Loader2 } from "lucide-react";
import {
  Users,
  IndianRupee,
  Landmark,
  ArrowLeftRight
} from "lucide-react";

const calcGrowth = (current, previous) => {
  if (!previous || previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};

const Dashboard = () => {
  const { user, logout, fetchDashboardStats, isFetchingDashboardStats, dashboardStats } = useStore();
  const [openModal, setOpenModal] = useState(false);

  console.log(user);
  useEffect(() => {
    fetchDashboardStats();
  }, [])

  const customerGrowth = calcGrowth(
    dashboardStats?.totalCustomers,
    dashboardStats?.totalCustomersLastMonth
  );

  const depositGrowth = calcGrowth(
    dashboardStats?.totalDeposits,
    dashboardStats?.totalDepositsLastMonth
  );

  const transactionGrowth = calcGrowth(
    dashboardStats?.todaysTransactions,
    dashboardStats?.yesterdayTransactions
  );

  const formatChange = (value, label) => {
    const isPositive = value >= 0;
    return `${isPositive ? "↑" : "↓"} ${Math.abs(value).toFixed(1)}% ${label}`;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN").format(value);
  };

  // if (!dashboardStats) {
  //   return (
  //     <div className="flex h-screen justify-center items-center">
  //       <Loader2 className="size-10 animate-spin text-blue-600" />
  //     </div>
  //   );
  // }
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-3 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0A2463]">
          Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <input
            placeholder="Search customers, accounts..."
            className="px-4 py-1.5 border rounded-xl text-sm w-64"
          />

          <div onClick={() => setOpenModal(true)} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer transition-all">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user.name
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
              }
            </div>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role.split("_")[0]} {user.role.split("_")[1]}</p>
            </div>
          </div>

          {openModal && <UserProfileModal onClose={() => setOpenModal(false)} />}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Customers"
          value={isFetchingDashboardStats ? <Loader2 className="size-5 animate-spin" /> : dashboardStats?.totalCustomers || 0}
          change={formatChange(customerGrowth, "from last month")}
          positive={customerGrowth >= 0}
          icon={Users}
        />
        <StatCard
          title="Total Deposits"
          value={isFetchingDashboardStats ? <Loader2 className="size-5 animate-spin" /> : formatCurrency(dashboardStats?.totalDeposits || 0)}
          change={formatChange(depositGrowth, "from last month")}
          positive={depositGrowth >= 0}
          icon={IndianRupee}
        />
        <StatCard title="Active Loans" value="1,847" change="↑ 5.2% from last month" positive icon={Landmark} />
        <StatCard
          title="Today's Transactions"
          value={isFetchingDashboardStats ? <Loader2 className="size-5 animate-spin" /> : dashboardStats?.todaysTransactions || 0}
          change={formatChange(transactionGrowth, "from yesterday")}
          positive={transactionGrowth >= 0}
          icon={ArrowLeftRight}
        />
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <TransactionTable />
        </div>

        <ActivityPanel />
      </div>

    </div>
  );
};

export default Dashboard;