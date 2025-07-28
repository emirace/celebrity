"use client";

import { useEffect, useState } from "react";
import Loading from "../../../_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { useSetting } from "@/contexts/setting";
import { Switch } from "@/app/_components/switch";

const BankingInfo = () => {
  const { settings, fetchSettings, updateSettinngs } = useSetting();
  const { addNotification } = useToastNotification();
  const [formData, setFormData] = useState({
    accountName: settings.bankingInfo.accountName || "",
    accountNumber: settings.bankingInfo.accountNumber || "",
    bankName: settings.bankingInfo.bankName || "",
    routing: settings.bankingInfo.routing || "",
    address: settings.bankingInfo.address || "",
    status: settings.bankingInfo.status || false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(settings.bankingInfo);
  }, [settings]);

  useEffect(() => {
    const loadSetting = async () => {
      try {
        setLoading(true);

        await fetchSettings();
      } catch (error) {
        addNotification({
          message:
            (error as string) ||
            "An error occurred while updating your profile.",
          error: true,
        });
      } finally {
        setLoading(false);
      }
    };
    loadSetting();
  }, []);

  const handleChange = (e: {
    target: { name: string; value: string | boolean };
  }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (
      !formData.accountName ||
      !formData.accountNumber ||
      !formData.bankName
    ) {
      addNotification({
        message: "All fields are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      await updateSettinngs({ ...settings, bankingInfo: formData });
      addNotification({ message: "Profile updated successfully!" });
    } catch (error) {
      addNotification({
        message:
          (error as string) || "An error occurred while updating your profile.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-gray-300 border  rounded-lg  w-full ">
      <div className="p-6 border-gray-300 border-b flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold  ">
            Banking Information
          </h2>
          <span className="block text-gray-600 mb-2">
            Update your banking information
          </span>
        </div>
        <Switch
          checked={formData.status}
          onChange={() =>
            handleChange({
              target: { name: "status", value: !formData.status },
            })
          }
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-gray-600 mb-2">
            Enter your bank name
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="w-full p-2 border-gray-300 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">
            Enter your account number
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full p-2 border-gray-300 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Enter your account name
          </label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            className="w-full p-2 border-gray-300 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Routing</label>
          <input
            type="text"
            name="routing"
            value={formData.routing}
            onChange={handleChange}
            className="w-full p-2 border-gray-300 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Enter Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border-gray-300 border rounded-lg"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="mt-4 px-6 py-2 bg-red-500 flex items-center justify-center gap-2 text-white rounded-lg w-full md:w-auto"
          >
            {loading && <Loading color={"white"} size={20} />}Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankingInfo;
