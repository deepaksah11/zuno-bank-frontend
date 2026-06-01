import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Loader2, Building2 } from "lucide-react";
import CreateBranchModal from "../components/CreateBranchModal";

const Branches = () => {
  const { branches, fetchBranches, isLoadingBranches } = useStore();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  if (isLoadingBranches) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0A2463]">
          Branch Management
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-900 transition"
        >
          + Add Branch
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-4 text-left">Branch Code</th>
              <th className="px-4 py-4 text-left">Branch Name</th>
              <th className="px-4 py-4 text-left">City</th>
              <th className="px-4 py-4 text-left">State</th>
              <th className="px-4 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {branches?.map((b) => (
              <tr key={b.id} className="border-b border-gray-300 hover:bg-gray-50">

                <td className="px-4 py-4 font-semibold">
                  {b.branchCode}
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} />
                    {b.branchName}
                  </div>
                </td>

                <td className="px-4 py-4 text-gray-600">
                  {b.city}
                </td>

                <td className="px-4 py-4 text-gray-600">
                  {b.state}
                </td>

                <td className="px-4 py-4">
                  <span className={`px-3 py-1 text-xs rounded ${b.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                    }`}>
                    {b.active ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
      {openModal && (
        <CreateBranchModal onClose={() => setOpenModal(false)} />
      )}

    </div>
  );
};

export default Branches;