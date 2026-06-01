import { useState } from "react";
import { useStore } from "../store/useStore";

const RejectionReasonModal = ({ onClose, customer }) => {
  const { rejectCustomer } = useStore();

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReject = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      alert("Please enter rejection reason");
      return;
    }

    try {
      setLoading(true);

      await rejectCustomer(customer, reason);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-600">
            Reject Customer
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* CUSTOMER INFO */}
        <div className="mb-3 text-sm text-gray-600">
          <p className="font-medium text-black">
            {customer.fullName}
          </p>
          <p>CIF: {customer.cif || "Not generated"}</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleReject} className="space-y-4">

          <textarea
            placeholder="Enter rejection reason..."
            className="w-full p-3 border rounded-xl text-sm outline-none"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          {/* BUTTONS */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg w-full"
            >
              {loading ? "Rejecting..." : "Reject"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg w-full"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RejectionReasonModal;