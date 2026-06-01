import { useState } from "react";
import { Loader2, Lock, KeyRound, ShieldCheck } from "lucide-react";
import { useStore } from "../store/useStore";
import { toast } from "react-hot-toast";

const ChangePassword = () => {
  const { changePassword, isChangingPassword } = useStore();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const success = await changePassword(form);

      if (success) {
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 text-[#1E3A8A] p-2 rounded-xl">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#0A2463]">
              Change Password
            </h2>
            <p className="text-xs text-gray-500">
              Keep your account secure
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* CURRENT PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] outline-none transition"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* NEW PASSWORD */}
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] outline-none transition"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] outline-none transition"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isChangingPassword}
            className="w-full mt-2 bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white py-3 rounded-xl flex justify-center items-center font-medium hover:shadow-lg hover:-translate-y-0.5 transition disabled:opacity-50"
          >
            {isChangingPassword
              ? <Loader2 className="animate-spin size-5" />
              : "Update Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ChangePassword;