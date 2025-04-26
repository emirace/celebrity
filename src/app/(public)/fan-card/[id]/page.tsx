"use client";

import Loading from "@/app/_components/loading";
import { useFanCard } from "@/contexts/fanCard";
import { useToastNotification } from "@/contexts/toastNotification";
import { IFanCardData } from "@/types/fanCard";
import { compressImageUpload } from "@/utils/image";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FiImage } from "react-icons/fi";

const FanCardForm: React.FC = () => {
  const params = useParams();
  const id = params?.id;
  const { addNotification } = useToastNotification();
  const { createNewFanCard } = useFanCard();
  const [form, setForm] = useState<IFanCardData>({
    nickname: "",
    celebrityId: "",
    fandomTheme: "",
    photoUrl: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nickname.trim()) newErrors.nickname = "Name is required.";
    if (!form.celebrityId.trim())
      if (!form.photoUrl) newErrors.photoUrl = "photo is required.";
    if (!form.fandomTheme) newErrors.fandomTheme = "Theme is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log(errors);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const res = await createNewFanCard({
          ...form,
          celebrityId: id as string,
        });
        router.push(`/payment?type=fanCard&id=${res._id}`);
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
      setForm((prev) => ({ ...prev, photoUrl: imageUrl }));

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
    <div>
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-8 pt-28 text-center">
        <h2 className="text-3xl font-bold">Fan Card Registration</h2>
        <p className="mt-2 text-sm">
          Complete the form below to get your official Fan Card!
        </p>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div>
              {form.photoUrl ? (
                <Image
                  src={form.photoUrl}
                  alt="Passport"
                  className="object-cover h-40 w-40 rounded-2xl"
                  width={160}
                  height={160}
                />
              ) : (
                <label
                  htmlFor="photoUrl"
                  className="cursor-pointer text-xs font-medium text-gray-700 mb-1 border border-dashed h-40 w-40 rounded-2xl flex flex-col items-center justify-center"
                >
                  {uploading ? (
                    <Loading size={20} />
                  ) : (
                    <>
                      <FiImage size={20} />
                      Upload Photo
                    </>
                  )}
                  <input
                    type="file"
                    id="photoUrl"
                    name="photoUrl"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              )}
              {errors.photoUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.photoUrl}</p>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <InputField
                name="nickname"
                label="Name on Card"
                value={form.nickname}
                onChange={handleChange}
                error={errors.nickname}
              />
            </div>
          </div>
          <div className="block text-sm font-medium text-gray-700 mb-1">
            Select FanDom Theme
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
            {[
              "from-[#fad0c4] to-[#ffd1ff]",
              "from-[#6724ed] to-[#dd28dd]",
              "from-[#88db75] to-[#92a818]",
              "from-[#786adf] to-[#f3970e]",
            ].map((theme) => (
              <div
                key={theme}
                onClick={() =>
                  setForm((prev) => ({ ...prev, fandomTheme: theme }))
                }
                className={`flex justify-center items-center bg-gradient-to-br p-6 rounded-2xl shadow-xl hover:shadow-2xl min-h-32 transition-shadow duration-300 w-full max-w-md mx-auto ${theme} cursor-pointer hover:shadow-red-500`}
              >
                {form.fandomTheme === theme && (
                  <div className="font-bold">Selected</div>
                )}
              </div>
            ))}
          </div>
          {errors.fandomTheme && (
            <p className="text-red-500 text-sm mt-1">{errors.fandomTheme}</p>
          )}

          <div className="text-sm text-gray-500">
            <p>
              🔒 Your Fan Card will require identity verification upon pickup.
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-all cursor-pointer"
          >
            {loading && <Loading size={20} color="white" />}
            Submit Fan Card Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default FanCardForm;

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
