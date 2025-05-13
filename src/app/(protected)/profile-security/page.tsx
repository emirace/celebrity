"use client";

import Loading from "@/app/_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { useUser } from "@/contexts/user";
import { compressImageUpload } from "@/utils/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ProfileSecurityRegistrationPage() {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();
  const [pinVisible, setPinVisible] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.mobile || "",
    passport: user?.passport || "",
    pin: user?.pin || "",
    backup: user?.backup || "",
    securityQuestion: user?.securityQuestion || "",
    securityAnswer: user?.securityAnswer || "",
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

    if (!form.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!form.phone) {
      newErrors.phone = "Phone Number is required";
    }
    if (!form.passport) {
      newErrors.passport = "Passport is required";
    }
    if (!form.pin) {
      newErrors.pin = "Security PIN is required";
    } else if (form.pin.length !== 4) {
      newErrors.pin = "PIN must be 4 digits";
    }
    if (!form.backup) {
      newErrors.backup = "Backup Contact is required";
    }
    if (!form.securityQuestion) {
      newErrors.securityQuestion = "Security Question is required";
    }
    if (!form.securityAnswer) {
      newErrors.securityAnswer = "Security Answer is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        await updateUser({
          ...form,
          mobile: form.phone,
        });
        router.push(`/payment?type=security&id=${user?._id}`);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Secure Your Profile
          </h2>
          <p className="text-gray-600 mt-2">
            Protect your online presence with our advanced security profile
            registration services.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/50"
              placeholder="John Doe"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              readOnly
              className="mt-1 w-full bg-gray-100 cursor-not-allowed rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-500"
              value={user?.email || ""}
            />
          </div>

          {/* Mobile Number with OTP */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/50"
                placeholder="+1234567890"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Upload ID Verification */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Upload ID (e.g. Passport)
            </label>
            <input
              type="file"
              className="mt-2 block w-full text-sm file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white transition cursor-pointer"
              accept="image/*"
              name="passport"
              onChange={handleImageUpload}
            />
            {uploading && <Loading size={20} />}
            {form.passport && (
              <Image
                src={form.passport}
                alt="Passport"
                className="object-contain h-40 w-40 "
                width={250}
                height={160}
              />
            )}
            {errors.passport && (
              <p className="text-red-500 text-sm">{errors.passport}</p>
            )}
          </div>

          {/* Security PIN */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              4-digit Security PIN
            </label>
            <div className="relative mt-1">
              <input
                type={pinVisible ? "text" : "password"}
                name="pin"
                value={form.pin}
                onChange={handleChange}
                maxLength={4}
                className="w-full pr-12 rounded-xl border border-gray-300 px-4 py-3 text-lg tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-black/50"
                placeholder="••••"
              />
              <button
                type="button"
                onClick={() => setPinVisible(!pinVisible)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {pinVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.pin && <p className="text-red-500 text-sm">{errors.pin}</p>}
          </div>

          {/* Backup Contact */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Backup Email / Phone
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/50"
              placeholder="you@backup.com or +123456789"
              name="backup"
              value={form.backup}
              onChange={handleChange}
            />
            {errors.backup && (
              <p className="text-red-500 text-sm">{errors.backup}</p>
            )}
          </div>

          {/* Security Question */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Security Question
            </label>
            <select
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/50"
              name="securityQuestion"
              value={form.securityQuestion}
              onChange={handleChange}
            >
              <option value="">Choose a question</option>
              <option>What is your first pet’s name?</option>
              <option>What was your primary school?</option>
              <option>In which city were you born?</option>
            </select>
            <input
              type="text"
              placeholder="Your answer"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/50"
              name="securityAnswer"
              value={form.securityAnswer}
              onChange={handleChange}
            />
            {errors.securityQuestion && (
              <p className="text-red-500 text-sm">{errors.securityQuestion}</p>
            )}
            {errors.securityAnswer && (
              <p className="text-red-500 text-sm">{errors.securityAnswer}</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl font-semibold text-sm cursor-pointer transition shadow-md"
            >
              {loading && <Loading size={20} color="white" />}
              Register Security Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
