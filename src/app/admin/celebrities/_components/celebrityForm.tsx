import React, { ChangeEvent, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useToastNotification } from "@/contexts/toastNotification";
import { IProfileData, IUser } from "@/types/user";
import { addCelebrity, editCelebrity } from "@/services/user";
import Loading from "../../../_components/loading";
import Image from "next/image";
import { compressImageUpload } from "@/utils/image";

interface CelebrityFormProps {
  onClose: () => void;
  celebrity?: IUser;
  loadCelebrities: () => void;
}

const CelebrityForm: React.FC<CelebrityFormProps> = ({
  onClose,
  celebrity,
  loadCelebrities,
}) => {
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const isEditing = !!celebrity;

  const [formData, setFormData] = useState<IProfileData>({
    fullName: "",
    email: "",
    image: "",
    mobile: "",
    nationality: "",
    dob: "",
    gender: "",
    address: "",
    job: "",
    age: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (celebrity) {
      setFormData({
        fullName: celebrity.fullName,
        job: celebrity.job.join(", "),
        age: celebrity.age,
        nationality: celebrity.nationality,
        email: celebrity.email,
        image: celebrity.image,
        mobile: celebrity.mobile,
        dob: celebrity.dob,
        gender: celebrity.gender || "",
        meetFee: celebrity.meetFee,
        bookingFee: celebrity.bookingFee,
        fanCardFee: celebrity.fanCardFee,
      });
    }
  }, [celebrity]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.job) newErrors.job = "Profession is required";
    if (!formData.age || formData.age <= 0)
      newErrors.age = "Valid age is required";
    if (!formData.nationality) newErrors.nationality = "Country is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.mobile) newErrors.mobile = "Phone number is required";
    if (!formData.dob) newErrors.dob = "Birth date is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.meetFee) newErrors.meetFee = "Meet & Greet fee is required";
    if (!formData.bookingFee) newErrors.bookingFee = "Booking fee is required";
    if (!formData.fanCardFee) newErrors.fanCardFee = "Fan Card fee is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (isEditing) {
        await editCelebrity(celebrity._id!, formData);
      } else {
        await addCelebrity(formData);
      }
      loadCelebrities();
      onClose();
      addNotification({ message: "Celebrity saved successfully" });
    } catch (error) {
      addNotification({ message: error as string, error: true });
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
      addNotification({
        message: (err as string) || "Failed uploading image",
        error: true,
      });
    } finally {
      setUploading(false);
    }
  };

  console.log("Form Data", formData);

  return (
    <div className="p-6 rounded-lg w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Celebrity" : "Create Celebrity"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-full">
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <div className="flex items-center gap-3">
            {formData.image && (
              <div className="w-16 h-16">
                <Image
                  src={formData.image}
                  alt="Preview"
                  className="rounded object-cover"
                  width={64}
                  height={64}
                />
              </div>
            )}
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-md hover:bg-gray-200">
              <FaUpload />
              <span>Choose Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {uploading && <Loading color="bg-gray-500" size={20} />}
          </div>

          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        {[
          { label: "Full Name", name: "fullName" },
          { label: "Profession", name: "job" },
          { label: "Age", name: "age", type: "number" },
          { label: "Email", name: "email" },
          { label: "Phone Number", name: "mobile" },
          { label: "Country", name: "nationality" },
          { label: "Date of Birth", name: "dob", type: "date" },
          {
            label: "Gender",
            name: "gender",
            type: "select",
            options: ["", "Male", "Female", "Other"],
          },
          { label: "Meeting Fee", name: "meetFee", type: "number" },
          { label: "Booking Fee", name: "bookingFee", type: "number" },
          { label: "Fan Card Fee", name: "fanCardFee", type: "number" },
        ].map(({ label, name, type = "text", options }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            {type === "select" ? (
              <select
                name={name}
                value={formData[name as keyof IProfileData]}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                {options!.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt || "Select"}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name as keyof IProfileData] as string}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            )}
            {errors[name] && (
              <p className="text-red-500 text-sm">{errors[name]}</p>
            )}
          </div>
        ))}

        <div className="col-span-full flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-2 bg-red-500 text-white rounded-md hover:scale-105"
          >
            {loading && <Loading color="bg-white" size={20} />}
            {isEditing ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CelebrityForm;
