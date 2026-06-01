import { X, LogOut } from "lucide-react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const UserProfileModal = ({ onClose }) => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      {/* Modal Box */}
      <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 relative space-y-3">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <h2 className="font-semibold text-lg">{user?.name}</h2>
            <p className="text-xs text-gray-500">{user.role.split("_")[0]} {user.role.split("_")[1]}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Branch Code</span>
            <span className="font-medium">{user?.branchCode || "BR001"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Branch Name</span>
            <span className="font-medium">{user?.branchName || "Main Branch"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            navigate("/change-password");
          }}
          className="w-full bg-[#1E3A8A] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-950 transition"
        >
          🔐 Change Password
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </div>
  );
};

export default UserProfileModal;