import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Loans from "./pages/Loans";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useStore } from "./store/useStore";
import { useEffect } from "react";
import Approvals from "./pages/Approvals";
import Staff from "./pages/Staff";
import ChangePassword from "./pages/ChangePassword";
import Branches from "./pages/Branches";

function App() {
  const { user, loading, checkAuth, isCheckingAuth } = useStore();

  // const isAdmin = authUser?.role === 'admin';
  useEffect(() => {
    checkAuth();
  }, [])

  if (isCheckingAuth) return (
    <div className="flex h-screen justify-center items-center">
      <Loader2 className='size-10 animate-spin text-blue-600' />
    </div>
  )
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Layout />} > */}
        <Route path="/login"
          element={isCheckingAuth
            ? <Loader2 className="size-10 animate-spin text-blue-600" />
            : user
              ? <Navigate to="/" />
              : <Login />
          }
        />
        <Route path='/' element={user ? <Layout /> : <Navigate to="/login" />} >
          <Route index element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;