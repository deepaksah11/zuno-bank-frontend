import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Edit, Eye, Loader2, RefreshCcw, Trash2 } from "lucide-react";
import CreateCustomerModal from "../components/CreateCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ViewCustomerModal from "../components/ViewCustomerModal";

const Customers = () => {
    const {
        customers,
        fetchCustomers,
        totalPages,
        currentPage,
        isLoadingCustomers,
        closeCustomer,
        isClosingCustomers,
        closeCustomerById
    } = useStore();

    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCloseModal, setShowCloseModal] = useState(false);

    useEffect(() => {
        fetchCustomers(0);
    }, []);

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-2xl shadow-sm overflow-x-auto">

                <h1 className="text-2xl font-semibold text-[#0A2463]">
                    Customer Management
                </h1>

                <div className="flex gap-2">
                    {/* ✅ Refresh button */}
                    <button
                        onClick={() => fetchCustomers(0)}
                        className="flex items-center text-sm text-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium hover:bg-blue-200 hover:cursor-pointer transition "
                    >
                        <RefreshCcw className="size-4"/> Refresh
                    </button>

                    <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#03206e] hover:shadow-md hover:-translate-y-1 shadow-[#405fb5] hover:cursor-pointer text-white px-4 py-2 text-sm text-center rounded-lg font-medium hover:opacity-90 transition">
                        <span className="text-sm">＋</span>
                        Add New Customer
                    </button>
                    <CreateCustomerModal
                        isOpen={open}
                        onClose={() => setOpen(false)}
                    />
                </div>

            </div>

            {/* 🔍 FILTERS */}
            <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 grid grid-cols-4 gap-4">

                <input
                    placeholder="Name, Email, Phone..."
                    className="p-2 border rounded-xl text-sm"
                />

                <select className="p-2 border rounded-xl text-sm">
                    <option>All Types</option>
                </select>

                <select className="p-2 border rounded-xl text-sm">
                    <option>All Status</option>
                </select>

                <input
                    type="date"
                    className="p-2 border rounded-xl text-sm"
                />
            </div>

            {/* 📊 TABLE */}
            <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
                {isLoadingCustomers ? (
                    <div className="flex h-screen justify-center items-center">
                        <Loader2 className='size-10 animate-spin text-blue-600' />
                    </div>
                ) :
                    <div className="min-w-[1100px]">
                        <table className="w-full text-sm">

                            {/* HEADER */}
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="p-5 text-left">Customer</th>
                                    <th className="p-5 text-left">Customer ID</th>
                                    <th className="p-5 text-left">Phone</th>
                                    <th className="p-5 text-left whitespace-nowrap">Account Type</th>
                                    <th className="p-5 text-left">Balance</th>
                                    <th className="p-5 text-left">Status</th>
                                    <th className="p-5 text-left">Actions</th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody>
                                {Array.isArray(customers) ? (customers.map((c, i) => (
                                    <tr key={i} className="border-b border-gray-300 hover:bg-gray-50 transition">

                                        {/* CUSTOMER */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
                                                    {c.firstName?.[0]}{c.lastName?.[0]}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-[#0A2463]">
                                                        {c.firstName} {c.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {c.email || c.cif}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* ID */}
                                        <td className="p-4">{c.cif}</td>

                                        {/* PHONE */}
                                        <td className="p-4">{c.phone}</td>

                                        {/* ACCOUNT TYPE */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded text-xs font-semibold ${c.accountType === "Premium"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : c.accountType === "Savings"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {c.accountType || 'N/A'}
                                            </span>
                                        </td>

                                        {/* BALANCE */}
                                        <td className="p-4 font-semibold text-[#0A2463]">
                                            ₹{c.balance ? `${c.balance}` : '-'}
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded text-xs font-semibold ${c.status === "ACTIVE"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {c.status.split("_")[0] || 'Active'}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-4 py-5">
                                            <div className="flex items-center gap-2">

                                                <button onClick={() => {
                                                    setSelectedCustomer(c);
                                                    setShowViewModal(true);
                                                }} className="w-9 h-9 rounded flex justify-center items-center bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition">
                                                    <Eye className="size-5"/>
                                                </button>

                                                <button onClick={() => {
                                                    setSelectedCustomer(c);
                                                    setShowEditModal(true);
                                                }} className="w-9 h-9 rounded flex justify-center items-center bg-yellow-100 text-yellow-700 hover:bg-orange-500 hover:text-white transition">
                                                    <Edit className="size-5"/>
                                                </button>

                                                <button onClick={() => {
                                                    setSelectedCustomer(c);
                                                    setShowCloseModal(true);
                                                }} className="px-3 py-2.5 text-sm rounded bg-red-100 text-red-600 hover:bg-red-600 hover:text-white whitespace-nowrap flex justify-center items-center gap-1">
                                                    <Trash2 className="size-5"/>
                                                    Close
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td>No customers found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* 📌 PAGINATION */}
                        <div className="flex justify-center mt-4 gap-2">

                            {/* Previous */}
                            <button
                                disabled={currentPage === 0}
                                onClick={() => fetchCustomers(currentPage - 1)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Prev
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => fetchCustomers(i)}
                                    className={`px-3 py-1 rounded ${currentPage === i
                                        ? "bg-blue-600 text-white"
                                        : "border"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            {/* Next */}
                            <button
                                disabled={currentPage === totalPages - 1}
                                onClick={() => fetchCustomers(currentPage + 1)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>

                        </div>

                    </div>
                }
            </div>
            {showViewModal && (
                <ViewCustomerModal
                    selectedCustomer={selectedCustomer}
                    onClose={() => setShowViewModal(false)}
                />
            )}

            {showCloseModal && (
                <DeleteConfirmModal
                    selectedCustomer={selectedCustomer}
                    isClosingCustomers={isClosingCustomers}
                    onClose={() => setShowCloseModal(false)}
                    onConfirm={(cust) => {
                        if (cust.cif) {
                            // ACTIVE customer
                            closeCustomer(cust.cif);
                        } else {
                            // PENDING customer
                            closeCustomerById(cust.customerId);
                        }
                        setShowCloseModal(false);
                    }}
                />
            )}

            {showEditModal && (
                <EditCustomerModal
                    selectedCustomer={selectedCustomer}
                    onClose={() => setShowEditModal(false)}
                    onSave={(updatedCustomer) => {
                        updateCustomer(selectedCustomer.cif, updatedCustomer); // 🔥 API call
                        setShowEditModal(false);
                    }}
                    isUpdating={isUpdatingCustomer}
                />
            )}
        </div>
    );
};

export default Customers;