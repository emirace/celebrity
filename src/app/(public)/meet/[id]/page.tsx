"use client";

import Loading from "@/app/_components/loading";
import { useMeet } from "@/contexts/meet";
import { useToastNotification } from "@/contexts/toastNotification";
import { IMeetData } from "@/types/meet";
import { compressImageUpload } from "@/utils/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useParams } from "next/navigation";

const MeetAndGreetForm: React.FC = () => {
  const params = useParams();
  const id = params?.id;
  const { addNotification } = useToastNotification();
  const { createMeet } = useMeet();
  const [form, setForm] = useState<IMeetData>({
    firstName: "",
    lastName: "",
    gender: "",
    occupation: "",
    state: "",
    city: "",
    address: "",
    reason: "",
    duration: "",
    passport: "",
    celebrityId: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.gender) newErrors.gender = "Gender is required.";
    if (!form.occupation.trim())
      newErrors.occupation = "Occupation is required.";
    if (!form.state.trim()) newErrors.state = "State is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.reason.trim()) newErrors.reason = "Reason is required.";
    if (!form.duration.trim())
      newErrors.duration = "Duration of visit is required.";
    if (!form.passport) newErrors.passport = "Passport photo is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const res = await createMeet({ ...form, celebrityId: id as string });
        router.push(`/payment?type=meet&id=${res._id}`);
      } catch (error) {
        addNotification({
          message: error as string,
          error: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      addNotification({
        message: "Please fix the errors in the form.",
        error: true,
      });
    }
  };

  const [uploading, setUploading] = useState(false);
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) throw Error("No image found");

      const imageUrl = await compressImageUpload(file, 1024);

      setForm((prev) => ({ ...prev, passport: imageUrl }));

      addNotification({ message: "Image uploaded" });
    } catch (err) {
      addNotification({
        message: (err as string) || "Failed uploading image",
        error: true,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-8 pt-28 text-center">
        <h2 className="text-3xl font-bold">Meet and Greet Request</h2>
        <p className="mt-2 text-sm">
          Complete the form below to book your exclusive meeting.
        </p>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4 ">
            <div>
              {form.passport ? (
                <Image
                  src={form.passport}
                  alt="Passport"
                  className="object-cover h-40 w-40 rounded-2xl"
                  width={160}
                  height={160}
                />
              ) : (
                <label
                  htmlFor="passport"
                  className="cursor-pointer text-xs font-medium text-gray-700 mb-1 border border-dashed h-40 w-40 rounded-2xl flex flex-col items-center justify-center"
                >
                  {uploading ? (
                    <Loading size={20} />
                  ) : (
                    <>
                      <FiImage size={20} />
                      Upload Passport Photo
                    </>
                  )}
                  <input
                    type="file"
                    id="passport"
                    name="passport"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              )}
              {errors.passport && (
                <p className="text-red-500 text-sm mt-1">{errors.passport}</p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <InputField
                name="firstName"
                label="First Name"
                value={form.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <InputField
                name="lastName"
                label="Last Name"
                value={form.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <SelectField
              name="gender"
              label="Gender"
              value={form.gender}
              onChange={handleChange}
              error={errors.gender}
            />
            <InputField
              name="occupation"
              label="Occupation"
              value={form.occupation}
              onChange={handleChange}
              error={errors.occupation}
            />
            <InputField
              name="state"
              label="State"
              value={form.state}
              onChange={handleChange}
              error={errors.state}
            />
            <InputField
              name="city"
              label="City"
              value={form.city}
              onChange={handleChange}
              error={errors.city}
            />
          </div>

          <InputField
            name="address"
            label="Home Address"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          />
          <TextAreaField
            name="reason"
            label="Reason for Meeting"
            value={form.reason}
            onChange={handleChange}
            error={errors.reason}
          />
          <InputField
            name="duration"
            label="Duration of Visit"
            value={form.duration}
            onChange={handleChange}
            error={errors.duration}
          />

          <div className="text-sm text-gray-500">
            <p>
              🔒 You will be required to verify your identity at the pickup
              location for security purposes.
            </p>
            {/* <p className="mt-2 font-semibold text-gray-700">
              Processing Fee: $200
            </p> */}
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
          >
            {loading && <Loading size={20} color="white" />}
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  name,
  label,
  value,
  onChange,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      name={name}
      id={name}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({
  name,
  label,
  value,
  onChange,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
    >
      <option value="">Select</option>
      <option>Male</option>
      <option>Female</option>
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const TextAreaField = ({
  name,
  label,
  value,
  onChange,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-black outline-none"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default MeetAndGreetForm;
