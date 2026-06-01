import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Loader2 } from "lucide-react";

const AddBeneficiaryModal = ({ onClose }) => {
  const { addBeneficiary, selectedAccount, isAddingBenificiary } = useStore();

  const [form, setForm] = useState({
    name: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    customerCif: selectedAccount?.cif || "na",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBeneficiary(form);
    onClose();
  };

  useEffect(() => {
    if (selectedAccount?.cif) {
      setForm((prev) => ({
        ...prev,
        customerCif: selectedAccount.cif,
      }));
    }
  }, [selectedAccount]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-xl">

        <h2 className="text-lg font-semibold mb-4">Add Beneficiary</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            placeholder="Customer CIF"
            className="input"
            onChange={(e) => setForm({ ...form, customerCif: e.target.value })}
            value={form.customerCif}
          />

          <input
            placeholder="Name"
            className="input"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Account Number"
            className="input"
            onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
          />

          <input
            placeholder="IFSC Code"
            className="input"
            onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
          />

          <input
            placeholder="Bank Name"
            className="input"
            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
          />

          <div className="flex gap-2 mt-4">
            <button className="btn bg-[#1E3A8A] p-2 rounded-lg hover:bg-blue-950 hover:cursor-pointer transition-all text-white w-full flex justify-center items-center">
              {isAddingBenificiary ? <Loader2 className="size-6 animate-spin text-white" /> : "Create"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-300/80 w-full rounded-lg hover:bg-gray-300 hover:cursor-pointer transition-all"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddBeneficiaryModal;