import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export const useStore = create((set, get) => ({
  user: null,
  customer: null,
  customers: [],
  branches: [],
  totalPages: 0,
  currentPage: 0,
  selectedAccount: null,
  accountsAndStats: [],
  dashboardStats: null,
  transactions: [],
  loans: [],
  pendingCustomers: [],
  staffList: [],
  isLoadingStaff: false,
  isCreatingStaff: false,
  isLoadingBranches: false,
  isLoadingApprovals: false,
  loading: false,
  isLogingIn: false,
  isCheckingAuth: true,
  isLoadingCustomers: false,
  isCreatingBranch: false,
  isChangingPassword: false,
  isClosingCustomers: false,
  isUpdatingCustomer: false,
  isFetchingCustomerDetails: false,
  isDeletingCustomer: false,
  isCreatingCustomer: false,
  isFetchingAccounts: false,
  isFetchingDashboardStats: false,
  isFetchingTransactions: false,
  isAddingBenificiary: false,
  isDepositing: false,
  isWithdrawing: false,
  isTransfering: false,
  accountsLastFetched: null,
  beneficiaries: [],

  setSelectedAccount: (account) => {
    set({ selectedAccount: account });
    console.log(account);
  },

  setCustomer: (data) => set({ customer: data }),

  // Auth
  login: async (data, navigate) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/api/v1/auth/staff/login", data);
      set({ user: res.data.data });
      console.log(get().user);
      toast.success("Logged in");
      console.log(res.data)
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Login failed");
      throw err;
    } finally {
      set({ isLogingIn: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/api/v1/auth/staff/check-auth");
      set({ user: res.data.data });
    } catch {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/v1/auth/staff/logout");
      toast.error("Session expired. Please login again");
    } catch { }

    set({ user: null });

    window.location.href = "/login"; // 🔥 force redirect
  },

  fetchDashboardStats: async () => {
    set({ isFetchingDashboardStats: true });
    try {
      const res = await axiosInstance.get("/api/dashboard/stats");
      set({ dashboardStats: res.data, isFetchingDashboardStats: false });
      console.log(res.data);
    } catch (err) {
      toast.error(err);
    }
  },

  // Customer
  fetchCustomerByCif: async (customerCif) => {
    set({ customer: null, isFetchingCustomerDetails: true });

    try {
      if (!customerCif) {
        throw new Error("Invalid CIF");
      }

      const res = await axiosInstance.get(`/api/onboarding/customer/${customerCif}`);

      set({
        customer: res.data,
        isFetchingCustomerDetails: false
      });

    } catch (err) {
      toast.error(err.message || "Failed to fetch customer");

      set({
        customer: null,
        isFetchingCustomerDetails: false
      });
    }
  },
  fetchCustomers: async (page = 0) => {
    const state = get();

    // ✅ cache per page
    if (state.currentPage === page && state.customers.length > 0) {
      console.log("Using cached page:", page);
      return;
    }

    set({ isLoadingCustomers: true });
    try {
      const res = await axiosInstance.get(`/api/onboarding/customers?page=${page}&size=10`);

      console.log("Full response:", res);
      console.log("Response data:", res.data);

      set({
        customers: res.data.content || [],
        totalPages: res.data.totalPages,
        currentPage: res.data.number,
        isLoadingCustomers: false
      });
    } catch (err) {
      console.error(err);
      set({ customers: [], isLoadingCustomers: false });
    }
  },

  refreshCustomers: async () => {
    set({ isLoadingCustomers: true, customers: [] }); // Clear existing data
    const state = get();
    await state.fetchCustomers();
  },

  // Accounts
  fetchAccounts: async () => {
    const state = get();

    if (state.accountsAndStats && state.accountsLastFetched) {
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
      if (Date.now() - state.accountsLastFetched < CACHE_DURATION) {
        console.log("Using cached accounts data");
        return;
      }
    }

    set({ isFetchingAccounts: true });

    try {
      const res = await axiosInstance.get("/api/onboarding/accounts");

      console.log("Full response:", res);
      console.log("Response data:", res.data);
      console.log("Customers array:", res.data.accounts);

      set({
        accountsAndStats: res.data || [],
        accountsLastFetched: Date.now(),
        isFetchingAccounts: false
      });
    } catch (err) {
      console.error(err);
      set({ accounts: [], isFetchingAccounts: false });
    }
  },

  refreshAccounts: async () => {
    set({ isFetchingAccounts: true, accountsAndStats: [] }); // Clear existing data
    const state = get();
    await state.fetchAccounts();
  },

  createCustomer: async (data) => {
    set({ isCreatingCustomer: true });
    console.log("SENDING DATA:", data);
    try {
      const res = await axiosInstance.post("/api/onboarding/create", data);
      toast.success("Customer created. Waiting for approval.");
      console.log(res.data);

      set({ isCreatingCustomer: false });
    } catch (err) {
      console.error(err);
      toast.success(err.response?.data?.message || "Error");
    }
  },

  updateCustomer: async (data) => {
    set({ isUpdatingCustomer: true });
    try {
      await axiosInstance.put("/api/onboarding/update", data);
      toast.success("Customer updated");

      // refresh list
      get().refreshCustomers();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      set({ isUpdatingCustomer: false });
    }
  },

  customerDetails: async (data) => {
    set({ isFetchingCustomerDetails: true });
    try {
      await axiosInstance.put(`/api/onboarding/customers/${data.id}`, data);

      // refresh list
      getCustomers();
    } catch (err) {
      toast.error("failed to fetch customer details");
    } finally {
      set({ isFetchingCustomerDetails: false });
    }
  },

  closeCustomer: async (cif) => {

    set({ isClosingCustomers: true });
    try {
      await axiosInstance.put(`/api/onboarding/close/${cif}`);

      toast.success("Customer closed successfully");

      get().refreshCustomers(); // reload table
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to close customer");
    } finally {
      set({ isClosingCustomers: false });
    }
  },

  closeCustomerById: async (id) => {

    set({ isClosingCustomers: true });
    try {
      await axiosInstance.put(`/api/onboarding/close-by-id/${id}`);

      toast.success("Customer closed successfully");

      get().refreshCustomers(); // reload table
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to close customer");
    } finally {
      set({ isClosingCustomers: false });
    }
  },

  fetchPendingCustomers: async () => {
    set({ isLoadingApprovals: true });
    try {
      const res = await axiosInstance.get("/api/onboarding/pending");

      set({
        pendingCustomers: res.data,
        isLoadingApprovals: false,
      });

    } catch (err) {
      console.error(err);
      set({ isLoadingApprovals: false });
    }
  },

  approveCustomer: async (customer) => {
    console.log(customer);
    try {
      const { user } = get();

      const payload = {
        customerId: customer.customerId,
        managerId: user.id,
        managerName: user.name,
        approved: true,
      };

      await axiosInstance.put("/api/onboarding/approve", payload);

      toast.success("Approved successfully");

      get().fetchPendingCustomers(); // refresh list

    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  },

  rejectCustomer: async (customer, reason) => {
    try {
      const { user } = get();

      const payload = {
        customerId: customer.customerId,
        managerId: user.id,
        managerName: user.name,
        approved: false,
        rejectionReason: !reason ? "No reason" : reason,
      };

      await axiosInstance.put("/api/onboarding/approve", payload);
      console.log("Reject payload:", customer, reason);

      toast.success("Rejected");

      get().fetchPendingCustomers();

    } catch (err) {
      toast.error("Reject failed");
    }
  },

  addBeneficiary: async (data) => {
    set({ isAddingBenificiary: true });
    try {
      const res = await axiosInstance.post("/api/beneficiaries", data);
      toast.success("Beneficiary added");

      set({ isAddingBenificiary: false });

      return res.data;
    } catch (err) {
      toast.error("Failed to add beneficiary");
    }
  },

  fetchBeneficiaries: async (cif) => {
    try {
      const res = await axiosInstance.get(`/api/beneficiaries/${cif}`);
      set({ beneficiaries: res.data });
    } catch (err) {
      console.error(err);
    }
  },

  transferMoney: async (data) => {
    set({ isTransfering: true });
    console.log(data);
    try {
      const res = await axiosInstance.post("/api/transactions/transfer", data);
      toast.success("Transfer successful");

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.error ||   // ✅ your backend error
        err.response?.data?.message ||
        err.message ||
        "Transfer failed";

      toast.error(message);
    } finally {
      set({ isTransfering: false });
    }
  },

  // Transactions
  fetchTransactions: async () => {
    set({ isFetchingTransactions: true });
    try {
      const res = await axiosInstance.get("/api/transactions");

      console.log("Transactions response:", res.data); // 🔍 DEBUG

      set({
        transactions: res.data || [], // ✅ FIX
        isFetchingTransactions: false,
      });

    } catch (err) {
      console.error("Transaction error:", err);
    }
  },

  depositMoney: async (data) => {
    set({ isDepositing: true });
    try {
      const res = await axiosInstance.post("/api/transactions/deposit", data);
      toast.success("Deposited Successfully");

      set({ isDepositing: false });

      await get().fetchTransactions();
      await get().fetchAccounts();

      return res.data;
    } catch (err) {
      toast.error("Failed to Deposit");
    }
  },

  withdrawMoney: async (data) => {
    set({ isWithdrawing: true });
    try {
      const res = await axiosInstance.post("/api/transactions/withdraw", data);
      toast.success("Withdrawl Successful");

      set({ isWithdrawing: false });

      await get().fetchTransactions();
      await get().fetchAccounts();

      return res.data;
    } catch (err) {
      toast.error("Failed to Withdraw");
    }
  },

  fetchStaff: async () => {
    try {
      set({ isLoadingStaff: true });

      const res = await axiosInstance.get("/api/v1/staff");
      console.log(res.data)

      set({ staffList: res.data });

    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "Failed to fetch staff"
      );

    } finally {
      set({ isLoadingStaff: false });
    }
  },

  createStaff: async (data) => {
    try {
      set({ isCreatingStaff: true });

      await axiosInstance.post("/api/v1/staff/create", data);

      toast.success("Staff created successfully ✅");

      get().fetchStaff(); // refresh

    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "Failed to create staff"
      );

    } finally {
      set({ isCreatingStaff: false });
    }
  },

  changePassword: async (data) => {
    try {
      set({ isChangingPassword: true });

      const res = await axiosInstance.patch(
        "/api/v1/auth/staff/change-password",
        data,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Password changed successfully");

      return true;
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Failed to change password"
      );
      return false;
    } finally {
      set({ isChangingPassword: false });
    }
  },

  resetStaffPassword: async (id) => {
    try {
      const res = await axios.post(`/api/v1/staff/${id}/reset-password`);

      toast.success("Temporary password sent to email");

      return res.data;
    } catch (err) {
      toast.error("Failed to reset password");
    }
  },

  // Loans
  fetchLoans: async () => {
    const res = await axiosInstance.get("/loans");
    set({ loans: res.data });
  },

  fetchBranches: async () => {
    set({ isLoadingBranches: true });
    try {
      const res = await axiosInstance.get("/api/v1/branches", { withCredentials: true });
      set({ branches: res.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoadingBranches: false });
    }
  },

  createBranch: async (data) => {
    set({ isCreatingBranch: true });
    try {
      const res = await axiosInstance.post("/api/v1/branches", data, {
        withCredentials: true
      });

      toast.success("Branch created");

      // refresh list
      get().fetchBranches();

      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create branch");
      console.log(err)
      return false;
    } finally {
      set({ isCreatingBranch: false });
    }
  },

}));