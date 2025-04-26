import Loading from "@/app/_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { createMembership, updateMembership } from "@/services/membership";
import { IMembership } from "@/types/membership";
import { compressImageUpload } from "@/utils/image";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";

function AddMembership({
  close,
  membership,
}: {
  close: () => void;
  membership: IMembership;
}) {
  const { addNotification } = useToastNotification();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0,
  });
  useEffect(() => {
    setFormData(membership);
  }, [membership]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  const handleUpdate = async () => {
    if (!formData.name || !formData.image || !formData.price) {
      addNotification({
        message: "All fields in cryptoInfo are required.",
        error: true,
      });
      return;
    }

    try {
      setLoading(true);
      if (membership) {
        await updateMembership(membership._id!, formData);
      } else {
        await createMembership(formData);
      }
      addNotification({ message: "Membership created successfully!" });
      close();
    } catch (error: any) {
      addNotification({
        message: error || "An error occurred while creating your profile.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-10">
      <div className="font-bold text-3xl mb-4">
        {membership ? "Edit" : "Add"} Membership
      </div>
      <label htmlFor={`image`} className="flex flex-col items-center">
        {formData.image ? (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={formData.image}
              alt={formData.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        ) : (
          <>
            <FiImage size={80} />
            <Loading size={20} />
          </>
        )}
        <input
          type="file"
          id="image"
          onChange={handleImageUpload}
          accept="image/*"
          className="sr-only"
        />
        <div>Add Image</div>
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => handleChange(e)}
        placeholder="Membership Name"
        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-red-300"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={(e) => handleChange(e)}
        placeholder="Price"
        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-red-300"
      />
      <button
        onClick={handleUpdate}
        className="mt-4 px-6 py-2 bg-red-500 flex items-center justify-center gap-2 text-white rounded-lg w-full md:w-auto"
      >
        {loading && <Loading color={"white"} size={20} />}{" "}
        {membership ? "Edit" : "Add"} Membership
      </button>
    </div>
  );
}

export default AddMembership;
