import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail } from "lucide-react";

const Login = () => {
  const { login, isLogingIn } = useStore();
  const [form, setForm] = useState({ employeeId: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2463] to-[#1E3A8A] p-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-[#FB8500]/20 rounded-full -top-25 -right-25 blur-3xl"></div>
      <div className="absolute w-100 h-100 bg-[#06D6A0]/20 rounded-full -bottom-25 -left-25 blur-3xl"></div>

      <div className="grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)] max-w-5xl w-full relative z-10 h-[90vh]">

        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-[#0A2463] to-[#1E3A8A] p-12 lg:p-16 text-white flex flex-col justify-center relative">

          <div className="absolute w-75 h-75 bg-white/10 rounded-full -top-12.5 -right-12.5 blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-20 h-12  rounded-2xl flex items-center justify-center text-3xl mb-6">
              <img className="bg-[#FB8500]/20 p-2 rounded-xl" src="/logo-zuno.png" alt="" />
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight">
              ZUNO BANK
            </h1>

            <p className="text-lg opacity-90 mb-10">
              Smart Banking Management System for modern financial operations.
            </p>

            {/* Features */}
            {/* <div className="space-y-5">
              {[
                "Secure Transactions",
                "Real-time Monitoring",
                "Advanced Analytics",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    ✔
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 lg:p-16 flex flex-col justify-center">

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#0A2463] mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500">
              Please login to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="size-5"/>
              </span>
              <input
                type="text"
                placeholder="Enter your emp id"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#0A2463] focus:ring-4 focus:ring-[#0A2463]/10 outline-none transition"
                onChange={(e) =>
                  setForm({ ...form, employeeId: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="size-5"/>
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#0A2463] focus:ring-4 focus:ring-[#0A2463]/10 outline-none transition"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>          

            {/* Button */}
            <button className="w-full flex justify-center items-center py-4 bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white font-bold rounded-xl hover:-translate-y-1 hover:shadow-xl transition duration-300">
              {isLogingIn ? <Loader2 className="size-6 animate-spin text-white"/> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;