import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useStore } from "../store/useStore";

const EditCustomerModal = ({ selectedCustomer, onClose }) => {
  const {
    updateCustomer,
    isUpdatingCustomer,
    fetchCustomerByCif,
    customer,
    isFetchingCustomerDetails,
    setCustomer
  } = useStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    pincode: "",
  });

  // 🔥 Fetch customer
  useEffect(() => {
    if (selectedCustomer?.cif) {
      fetchCustomerByCif(selectedCustomer.cif);
    }
  }, [selectedCustomer]);

  // 🔥 Fill form when data arrives
  useEffect(() => {
    if (customer) {
      setForm({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        addressLine1: customer.addressLine1 || "",
        pincode: customer.pincode || "",
      });
    }
  }, [customer]);

  useEffect(() => {
    console.log("customer from API:", customer);
  }, [customer]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== "")
    );

    try {
      await updateCustomer({
        ...cleanedData,
        existingCif: selectedCustomer.cif, // always correct
      });
      setCustomer(null); // clear stale data
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  };

  // 🔥 Loading state
  if (isFetchingCustomerDetails) {
    return (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <Loader2 className="animate-spin text-white size-8" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0A2463]">
            Edit Customer
          </h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          <div className="flex gap-2">
            <input
              name="firstName"
              className="input"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              name="lastName"
              className="input"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <input
            name="email"
            className="input"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="phone"
            className="input"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <input
            name="addressLine1"
            className="input"
            value={form.addressLine1}
            onChange={handleChange}
            placeholder="Address"
          />

          <input
            name="pincode"
            className="input"
            value={form.pincode}
            onChange={handleChange}
            placeholder="PIN Code"
          />

          <button
            type="submit"
            className="w-full bg-[#1E3A8A] text-white py-2 rounded-xl flex justify-center items-center"
          >
            {isUpdatingCustomer
              ? <Loader2 className="animate-spin size-6" />
              : "Update Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;