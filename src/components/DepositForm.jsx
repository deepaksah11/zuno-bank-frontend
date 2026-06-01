import { useState } from "react";
import { useStore } from "../store/useStore";
import { Loader2 } from "lucide-react";

const DepositForm = ({ onClose }) => {
  const { selectedAccount, depositMoney, isDepositing } = useStore();

  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await depositMoney({
      accountNumber: selectedAccount.accountNumber,
      amount: Number(amount),
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="number"
        placeholder="Enter Amount"
        className="input w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg w-full flex justify-center items-center">
        {isDepositing ? <Loader2 className="size-6 animate-spin text-white" /> : "Deposit"}
      </button>

    </form>
  );
};

export default DepositForm;