"use client";

import { useEffect, useState } from "react";
import Loading from "../../../_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { useSetting } from "@/contexts/setting";

const SecurityFee = () => {
  const { settings, fetchSettings, updateSettinngs } = useSetting();
  const { addNotification } = useToastNotification();

  const [securityFee, setSecurityFee] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSecurityFee(settings.securityFee);
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

  const handleUpdate = async () => {
    if (!securityFee) {
      addNotification({
        message: "All fields are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      await updateSettinngs({ ...settings, securityFee });
      addNotification({ message: "Securify Fee updated successfully!" });
    } catch (error) {
      addNotification({
        message:
          (error as string) || "An error occurred while updating your fee.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-gray-300 border  rounded-lg  w-full ">
      <div className="p-6 border-gray-300 border-b">
        <h2 className="text-2xl md:text-4xl font-bold  ">
          Profile Security Fee
        </h2>
        <span className="block text-gray-600 mb-2">
          Update your security fee information
        </span>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-gray-600 mb-2">Enter Amount</label>
          <input
            type="number"
            name="securityFee"
            value={securityFee}
            onChange={(e) => setSecurityFee(Number(e.target.value))}
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

export default SecurityFee;
