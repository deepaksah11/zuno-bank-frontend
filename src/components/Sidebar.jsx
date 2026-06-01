import { Link, useLocation } from "react-router-dom";
import { useStore } from "../store/useStore";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ArrowLeftRight,
  Landmark,
  UserCog,
  Building2,
  CheckCircle,
  ClipboardList
} from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();

  const { user } = useStore();

  const role = user.role;

  const menu = {
    SUPER_ADMIN: ["Dashboard", "Customers", "Accounts", "Transactions", "Loans", "Staff", "Branches"],
    ADMIN: ["Dashboard", "Customers", "Accounts", "Transactions", "Loans", "Staff"],
    BRANCH_MANAGER: ["Dashboard", "Customers", "Accounts", "Transactions", "Loans", "Approvals"],
    RELATIONSHIP_OFFICER: ["Dashboard", "Customers", "Onboarding"],
    LOAN_OFFICER: ["Dashboard", "Loans", "Customers"],
    TELLER: ["Dashboard", "Transactions", "Accounts"],
    SUPPORT_AGENT: ["Dashboard", "Customers"]
  };

  const navMap = {
    Dashboard: { path: "/", icon: LayoutDashboard },
    Customers: { path: "/customers", icon: Users },
    Accounts: { path: "/accounts", icon: CreditCard },
    Transactions: { path: "/transactions", icon: ArrowLeftRight },
    Loans: { path: "/loans", icon: Landmark },
    Staff: { path: "/staff", icon: UserCog },
    Branches: { path: "/branches", icon: Building2 },
    Approvals: { path: "/approvals", icon: CheckCircle },
    Onboarding: { path: "/onboarding", icon: ClipboardList },
  };

  const allowedMenu = menu[role] || [];
  return (
    <aside className="fixed left-0 top-0 w-[230px] h-screen bg-gradient-to-b from-[#0A2463] to-[#1E3A8A] py-8 shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-50">

      {/* Logo */}
      <div className="text-white text-2xl font-bold px-6 mb-12 flex items-center gap-3">
        <div className="w-9 h-11 rounded-lg">
          <img className="" src="/logo-zuno.png" alt="" />
        </div>
        <span className="text-lg">ZUNO BANK</span>
      </div>

      <ul>
        {allowedMenu.map((itemName) => {
          const item = navMap[itemName];
          const Icon = item.icon;

          return (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-6 py-2.5 transition-all font-medium border-l-3 hover:border-[#FB8500] ${pathname === item.path
                  ? "bg-white/10 text-white border-[#FB8500]"
                  : "text-white/70 hover:bg-white/10 hover:text-white border-transparent"
                  }`}
              >

                <Icon className={`${pathname === item.path ? "text-[#FB8500]" : ""}`} size={18} />
                {itemName}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;