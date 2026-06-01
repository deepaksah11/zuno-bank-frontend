import { Loader2, X } from "lucide-react";
import { useStore } from "../store/useStore";
import { useEffect } from "react";

const ViewCustomerModal = ({ selectedCustomer, onClose }) => {

    const { fetchCustomerByCif, customer, isFetchingCustomerDetails, setCustomer } = useStore();

    useEffect(() => {
        if (selectedCustomer?.cif) {
            fetchCustomerByCif(selectedCustomer.cif);
        }
    }, [selectedCustomer]);

    if (isFetchingCustomerDetails) {
        return (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                <Loader2 className="animate-spin text-white size-8" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-[500px] rounded-2xl p-6 shadow-xl relative">

                {/* CLOSE */}
                <button onClick={() => {
                    setCustomer(null);
                    onClose();
                }} className="absolute top-4 right-4">
                    <X />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-[#0A2463]">
                    Customer Details
                </h2>

                <div className="space-y-3 text-sm">
                    <p><b>Name:</b> {customer?.fullName}</p>
                    <p><b>Email:</b> {customer?.email}</p>
                    <p><b>Phone:</b> {customer?.phone}</p>
                    <p><b>Gender:</b> {customer?.gender}</p>
                    <p><b>DOB:</b> {customer?.dateOfBirth}</p>

                    <p><b>Account Number:</b> {customer?.accountNumber || "N/A"}</p>
                    <p><b>Account Type:</b> {customer?.accountType || "N/A"}</p>
                    <p><b>Balance:</b> ₹{customer?.balance || 0}</p>

                    <p><b>Branch:</b> {customer?.branchName}</p>
                    <p><b>Status:</b> {customer?.status}</p>
                </div>


            </div>
        </div>
    );
};

export default ViewCustomerModal;