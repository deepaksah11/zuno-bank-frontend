import { useState } from "react";
import { useStore } from "../store/useStore";
import { Loader2 } from "lucide-react";

const CreateCustomerModal = ({ isOpen, onClose }) => {
    const { createCustomer, isCreatingCustomer } = useStore();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: "",
        aadhaarNumber: "",
        panNumber: "",
        accountType: "",
        initialDeposit: "",
        ifscCode: "",
        branchName: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createCustomer(form);
        } catch (err) {
            console.error(err);
        } finally {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl max-h-[80vh] overflow-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-[#0A2463]">
                        Add New Customer
                    </h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-3">

                    <div className="flex gap-2">
                        <input
                            name="firstName"
                            placeholder="First Name"
                            className="input"
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="lastName"
                            placeholder="Last Name"
                            className="input"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        name="email"
                        placeholder="Email"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="dateOfBirth"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <div className="flex flex-col">
                        <label className="text-xs mb-1 text-gray-600">Gender *</label>
                        <select
                            name="gender"
                            className="input"
                            value={form.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <input
                        name="addressLine1"
                        placeholder="Address"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <label className="text-xs mb-1 text-gray-600">City *</label>
                            <input
                                name="city"
                                placeholder="City"
                                className="input"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs mb-1 text-gray-600">PIN Code *</label>
                            <input
                                name="pincode"
                                placeholder="PIN Code"
                                className="input"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <select
                        name="accountType"
                        className="input"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Account Type</option>
                        <option value="SAVINGS">Savings</option>
                        <option value="CURRENT">Current</option>
                    </select>

                    <input
                        name="ifscCode"
                        placeholder="IFSC Code"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="initialDeposit"
                        placeholder="Initial Deposit"
                        className="input"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                initialDeposit: Number(e.target.value),
                            })
                        }
                        required
                    />

                    <div className="flex gap-2">
                        <input
                            name="aadhaarNumber"
                            placeholder="Aadhaar Number"
                            className="input"
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="panNumber"
                            placeholder="PAN Number"
                            className="input"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    panNumber: e.target.value.toUpperCase(),
                                })
                            }
                            required
                        />
                    </div>

                    <input
                        name="state"
                        placeholder="State"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="branchName"
                        placeholder="Branch Name"
                        className="input"
                        onChange={handleChange}
                        required
                    />

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-[#1E3A8A] text-white py-2 rounded-xl mt-2 flex justify-center items-center hover:bg-blue-950 hover:cursor-pointer"
                    >
                        {isCreatingCustomer ? <Loader2 className="size-6 animate-spin text-white" /> : "Create Customer Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCustomerModal;