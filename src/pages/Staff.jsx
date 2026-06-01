import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Edit, Eye, Loader2, Trash2, KeyRound } from "lucide-react";
import CreateStaffModal from "../components/CreateStaffModal";

const Staff = () => {
  const { staffList, fetchStaff, isLoadingStaff } = useStore();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  if (isLoadingStaff) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const handleResetPassword = async (id) => {
    const confirm = window.confirm("Reset password for this staff?");
    if (!confirm) return;

    await resetStaffPassword(id);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0A2463]">
          Staff Management
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#03206e] hover:shadow-md hover:-translate-y-1 shadow-[#405fb5] hover:cursor-pointer text-white px-4 py-2 text-sm text-center rounded-lg font-medium hover:opacity-90 transition"
        >
          + Add Staff
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <div className="min-w-[900px]">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Email</th>
                <th className="px-4 py-4 text-left">Role</th>
                <th className="px-4 py-4 text-left">Branch</th>
                <th className="px-4 py-4 text-left">Status</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {staffList?.map((s, i) => (
                <tr key={i} className="border-b border-gray-300 last:border-none hover:bg-gray-50 transition">

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center text-sm font-bold">
                        {s.fullName
                          ?.split(" ")
                          .map(w => w[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{s.fullName}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-5 text-gray-600">
                    {s.email}
                  </td>

                  <td className="px-4 py-5">
                    <span className="px-3 py-1 text-xs rounded bg-blue-50 text-blue-700 font-medium">
                      {s.role}
                    </span>
                  </td>

                  <td className="px-4 py-5 text-gray-600 whitespace-nowrap">
                    {s.branchCode || "-"}
                  </td>

                  <td className="px-4 py-5">
                    <span className={`px-3 py-1 text-xs rounded font-medium ${s.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                      }`}>
                      {s.status ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">

                      <button onClick={() => {
                        setSelectedCustomer(c);
                        setShowViewModal(true);
                      }} className="w-9 h-9 rounded flex justify-center items-center text-blue-700 hover:bg-blue-500 hover:text-white transition">
                        <Eye className="size-5" />
                      </button>

                      <button onClick={() => {
                        setSelectedCustomer(c);
                        setShowEditModal(true);
                      }} className="w-9 h-9 rounded flex justify-center items-center text-yellow-700 hover:bg-amber-500 hover:text-white transition">
                        <Edit className="size-5" />
                      </button>

                      <button
                        onClick={() => handleResetPassword(s.id)}
                        className="w-9 h-9 rounded flex justify-center items-center text-indigo-600 hover:bg-indigo-500 hover:text-white transition"
                      >
                        <KeyRound className="size-5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <CreateStaffModal onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default Staff;