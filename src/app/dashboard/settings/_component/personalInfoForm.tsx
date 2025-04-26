"use client";

import Loading from "@/app/_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { useUser } from "@/contexts/user";
import { compressImageUpload } from "@/utils/image";
import { ChangeEvent, useState } from "react";

const PersonalInfoForm = () => {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || "",
    mobile: user?.mobile || "",
    nationality: user?.nationality || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    address: user?.address || "",
    image: user?.image || "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      addNotification({
        message: "Name and email are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);

      // Prepare data for update
      const updateData: Record<string, any> = {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        mobile: formData.mobile,
        nationality: formData.nationality,
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        image: formData.image,
      };

      // Send update to backend
      await updateUser(updateData);

      addNotification({ message: "Profile updated successfully!" });
    } catch (error: any) {
      addNotification({
        message: error || "An error occurred while updating your profile.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) throw Error("No image found");

      const imageUrl = await compressImageUpload(file, 1024);

      setFormData((prev) => ({ ...prev, image: imageUrl }));

      addNotification({ message: "Image uploaded" });
    } catch (err) {
      addNotification({ message: "Failed uploading image", error: true });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" w-full ">
      <h2 className="text-2xl md:text-4xl font-bold  p-4 md:p-6 border-b text-red-500">
        Personal Information
      </h2>
      <div className="p-4 md:p-6">
        <label className="block text-gray-600 mb-2">
          Upload your profile photo*
        </label>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={formData.image}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover bg-black"
          />
          <label
            htmlFor="image"
            className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg cursor-pointer"
          >
            Change
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              className="sr-only"
            />
          </label>
          {uploading && <Loading />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Username*</label>
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email address*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Mobile number*</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Nationality*</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter your nationality"
            />
          </div>
          <div>
            <label className="block text-gray-600">Date of Birth*</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Select Gender*</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={formData.gender === "others"}
                  onChange={handleChange}
                />
                Others
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-600">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="mt-4 px-6 py-2 bg-red-500 flex items-center gap-2 text-white rounded-lg w-full md:w-auto"
          >
            {loading && <Loading color="white" size={20} />}Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
