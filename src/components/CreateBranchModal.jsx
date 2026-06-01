import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { toast } from "react-hot-toast";

const CreateBranchModal = ({ onClose }) => {
  const { createBranch, isCreatingBranch } = useStore();

  const [form, setForm] = useState({
    branchCode: "",
    branchName: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.branchCode || !form.branchName) {
      toast.error("All fields are required");
      return;
    }

    const success = await createBranch(form);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-[#0A2463]">
          Create New Branch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="branchCode"
            placeholder="Branch Code (e.g. BR004)"
            className="input w-full"
            value={form.branchCode}
            onChange={handleChange}
          />

          <input
            name="branchName"
            placeholder="Branch Name"
            className="input w-full"
            value={form.branchName}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            className="input w-full"
            value={form.city}
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            className="input w-full"
            value={form.state}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isCreatingBranch}
            className="w-full bg-[#1E3A8A] text-white py-2 rounded-xl flex justify-center items-center"
          >
            {isCreatingBranch
              ? <Loader2 className="animate-spin size-5" />
              : "Create Branch"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateBranchModal;