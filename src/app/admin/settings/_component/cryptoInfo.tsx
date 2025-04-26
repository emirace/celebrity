"use client";

import { useEffect, useState } from "react";
import Loading from "../../../_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { useSetting } from "@/contexts/setting";

const CryptoInfo = () => {
  const { addNotification } = useToastNotification();
  const { settings, fetchSettings, updateSettinngs } = useSetting();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState([
    {
      name: "",
      network: "",
      address: "",
      rate: 0,
    },
  ]);

  useEffect(() => {
    setFormData(settings.cryptoInfo);
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

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: name === "rate" ? parseFloat(value) || 0 : value,
            }
          : item
      )
    );
  };

  const handleUpdate = async () => {
    if (
      !formData.length ||
      formData.some(
        (crypto) =>
          !crypto.name || !crypto.network || !crypto.address || !crypto.rate
      )
    ) {
      addNotification({
        message: "All fields in cryptoInfo are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      await updateSettinngs({ ...settings, cryptoInfo: formData });
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

  const addNewCurrency = () => {
    setFormData((prevData) => [
      ...prevData,
      { name: "", network: "", address: "", rate: 0 },
    ]);
  };

  return (
    <div className="border-gray-300 border  rounded-lg  w-full ">
      <div className="p-6 border-gray-300 border-b">
        <h2 className="text-2xl md:text-4xl font-bold  ">Crypto Information</h2>
        <span className="block text-gray-600 mb-2">
          Update your crypto information
        </span>
      </div>
      <div className="p-6 ">
        {formData.map((data, index) => (
          <div key={index} className="py-6 border-b  border-red-500 space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">
                Enter your currency name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border-gray-300 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Enter your network
              </label>
              <input
                type="text"
                name="network"
                value={data.network}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border-gray-300 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Enter wallet address
              </label>
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border-gray-300 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Rate per dollar($)
              </label>
              <input
                type="number"
                name="rate"
                value={data.rate}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border-gray-300 border rounded-lg"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addNewCurrency}
          className="mt-4 px-4 py-2  text-red-500 rounded-lg"
        >
          Add Currency
        </button>

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

export default CryptoInfo;
