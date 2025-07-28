"use client";

import { useEffect, useState } from "react";
import Loading from "../../../_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { useSetting } from "@/contexts/setting";

const ContactEmail = () => {
  const { settings, fetchSettings, updateSettinngs } = useSetting();
  const { addNotification } = useToastNotification();
  const [email, setEmail] = useState(settings.email);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(settings.email);
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
    if (!email) {
      addNotification({
        message: "All fields are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      await updateSettinngs({ ...settings, email });
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
        <h2 className="text-2xl md:text-4xl font-bold  ">Contact Us Email</h2>
        <span className="block text-gray-600 mb-2">
          Update your email information
        </span>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-gray-600 mb-2">
            Enter your prefered email
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default ContactEmail;
