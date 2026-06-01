import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Loader2 } from "lucide-react";

const TransferModal = ({ onClose }) => {
  const { beneficiaries, transferMoney, fetchBeneficiaries, selectedAccount, isTransfering } = useStore();

  const [form, setForm] = useState({
    beneficiaryId: "",
    amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selected = beneficiaries.find(
      (b) => b.id == form.beneficiaryId
    );

    if (!selected) return alert("Select beneficiary");

    await transferMoney({
      senderAccountNumber: selectedAccount.accountNumber,
      senderCif: selectedAccount.cif,
      receiverAccountNumber: selected.accountNumber,
      receiverIfsc: selected.ifscCode,
      receiverName: selected.name,
      amount: Number(form.amount),
      type: "IMPS",
    });

    onClose();
  };

  useEffect(() => {
    if (selectedAccount?.cif) {
      fetchBeneficiaries(selectedAccount.cif);
    }
  }, [selectedAccount]);

  return (
    // <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    //   <div className="bg-white p-6 rounded-2xl w-[420px] shadow-xl">


    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">
        New Transfer
      </h2>

      <select
        className="input w-full"
        onChange={(e) =>
          setForm({ ...form, beneficiaryId: e.target.value })
        }
      >
        <option value="">Select Beneficiary</option>
        {beneficiaries.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name} - {b.accountNumber}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Enter Amount"
        className="input w-full"
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 hover:cursor-pointer transition-all flex justify-center items-center">
          {isTransfering ? <Loader2 className="size-6 animate-spin text-white" /> : "Transfer"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300/80 px-4 py-2 rounded-lg w-full hover:bg-gray-300 hover:cursor-pointer transition-all"
        >
          Cancel
        </button>
      </div>

    </form>
    //   </div>
    // </div>
  );
};

export default TransferModal;