import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Loader2 } from "lucide-react";
import RejectionReasonModal from "../components/RejectionReasonModal";

const Approvals = () => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const {
    pendingCustomers,
    fetchPendingCustomers,
    approveCustomer,
    rejectCustomer,
    isLoadingApprovals,
  } = useStore();

  useEffect(() => {
    fetchPendingCustomers();
  }, []);

  if (isLoadingApprovals) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* 🔵 HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0A2463]">
          Approval Management
        </h1>

        <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm">
          Refresh
        </button>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-yellow-400">
          <p className="text-sm text-gray-500">Pending Approvals</p>
          <h2 className="text-xl font-semibold">
            {pendingCustomers.length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-green-400">
          <p className="text-sm text-gray-500">Approved Today</p>
          <h2 className="text-xl font-semibold">--</h2>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-red-400">
          <p className="text-sm text-gray-500">Rejected Today</p>
          <h2 className="text-xl font-semibold">--</h2>
        </div>

      </div>

      {/* 🔍 FILTERS */}
      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 grid grid-cols-4 gap-4">

        <input
          placeholder="Search customer..."
          className="p-3 border rounded-xl text-sm"
        />

        <select className="p-3 border rounded-xl text-sm">
          <option>All Status</option>
        </select>

        <input type="date" className="p-3 border rounded-xl text-sm" />

        <input type="date" className="p-3 border rounded-xl text-sm" />

      </div>

      {/* 📄 APPROVAL LIST */}
      <div className="space-y-4">

        {pendingCustomers.map((c) => (
          <div
            key={c.customerId}
            className="bg-white rounded-2xl shadow-sm border-l-4 border-orange-400 p-6"
          >

            {/* 🔹 TOP ROW */}
            <div className="flex justify-between items-center">

              {/* LEFT - USER */}
              <div className="flex items-center gap-4">

                {/* AVATAR */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-400 text-white font-semibold text-lg">
                  {c.fullName?.[0]}
                </div>

                {/* NAME */}
                <div>
                  <h2 className="font-semibold text-lg text-[#0A2463]">
                    {c.fullName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {c.cif || "CIF Pending"}
                  </p>
                </div>

              </div>

              {/* RIGHT - STATUS */}
              <div className="text-right">
                <p className="text-xs text-gray-500">STATUS</p>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {c.status}
                </span>
              </div>

            </div>

            {/* DIVIDER */}
            <hr className="my-4 border-gray-200" />

            {/* 🔹 DETAILS GRID */}
            <div className="grid grid-cols-4 gap-4 text-sm">

              <div>
                <p className="text-gray-500 text-xs">PHONE</p>
                <p className="font-medium">{c.phone}</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">CITY</p>
                <p className="font-medium">{c.city}</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">STATE</p>
                <p className="font-medium">{c.state}</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">BRANCH</p>
                <p className="font-medium">{c.branchCode}</p>
              </div>

            </div>

            {/* DIVIDER */}
            <hr className="my-4 border-gray-200" />

            {/* 🔹 ACTIONS */}
            <div className="flex gap-3">

              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                View Details
              </button>

              <button
                onClick={() => approveCustomer(c)}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                Approve
              </button>

              <button
                onClick={() => {
                  setShowRejectModal(true);
                  setSelectedCustomer(c)
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                Reject
              </button>

            </div>

          </div>
        ))}

        {showRejectModal && selectedCustomer && (
          <RejectionReasonModal
            customer={selectedCustomer}
            onClose={() => setShowRejectModal(false)}
          />
        )}

      </div>
    </div>
  );
};

export default Approvals;