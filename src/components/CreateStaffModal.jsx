import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useStore } from "../store/useStore";

const CreateStaffModal = ({ onClose }) => {
    const { createStaff, isCreatingStaff } = useStore();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        role: "",
        branchCode: "",
        phoneNumber: "",
        department: "",
        designation: "",
        managerId: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createStaff({
            ...form,
            managerId: form.managerId ? Number(form.managerId) : null,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl max-h-[85vh] overflow-auto">

                {/* HEADER */}
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">Add Staff</h2>
                    <button onClick={onClose}><X /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        name="fullName"
                        placeholder="Full Name"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phoneNumber"
                        placeholder="Phone (10 digits)"
                        className="input"
                        onChange={handleChange}
                    />

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="input"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="BRANCH_MANAGER">Branch Manager</option>
                        <option value="RELATIONSHIP_OFFICER">Relationship Officer</option>
                        <option value="LOAN_OFFICER">Loan Officer</option>
                        <option value="TELLER">Teller</option>
                        <option value="SUPPORT_AGENT">Support Agent</option>
                    </select>

                    <input
                        name="branchCode"
                        placeholder="Branch Code"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="department"
                        placeholder="Department"
                        className="input"
                        onChange={handleChange}
                    />

                    <input
                        name="designation"
                        placeholder="Designation"
                        className="input"
                        onChange={handleChange}
                    />

                    <input
                        name="managerId"
                        placeholder="Manager ID (optional)"
                        className="input"
                        onChange={handleChange}
                    />

                    {/* BUTTON */}
                    <button
                        disabled={isCreatingStaff}
                        className="w-full bg-[#1E3A8A] text-white py-2 rounded-xl flex justify-center items-center"
                    >
                        {isCreatingStaff
                            ? <Loader2 className="animate-spin size-5" />
                            : "Create Staff"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateStaffModal;