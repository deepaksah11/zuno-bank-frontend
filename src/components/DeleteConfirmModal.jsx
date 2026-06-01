import { Loader2 } from "lucide-react";

const DeleteConfirmModal = ({ selectedCustomer, onClose, onConfirm, isClosingCustomers }) => {
  if (!selectedCustomer) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-2xl p-6 shadow-xl">

        <h2 className="text-lg font-semibold text-red-600 mb-3">
          Delete Customer
        </h2>

        <p className="text-sm mb-5">
          Are you sure you want to Close <b>{selectedCustomer.customerName}</b>?
          <br /> This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 hover:cursor-pointer transition-all"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(selectedCustomer)}
            className="w-24 flex justify-center items-center text-center rounded-lg bg-red-600 hover:bg-red-700 hover:cursor-pointer transition-all text-white"
          >
            {isClosingCustomers ? <Loader2 className="size-6 animate-spin"/> : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;