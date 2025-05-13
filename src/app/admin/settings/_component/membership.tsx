"use client";

import { useEffect, useState } from "react";
import Loading from "../../../_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { getAllMemberships } from "@/services/membership";
import { IMembership } from "@/types/membership";
import Image from "next/image";
import Modal from "@/app/_components/modal";
import AddMembership from "./addMembership";
import { FiEdit } from "react-icons/fi";

const Membership = () => {
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);
  const [memberships, setMemberships] = useState<IMembership[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMembership, setselectedMembership] = useState<IMembership>();

  const loadMembership = async () => {
    try {
      setLoading(true);
      const res = await getAllMemberships();
      setMemberships(res);
    } catch (error) {
      addNotification({ message: error as string, error: true });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMembership();
  }, []);

  const addMembership = async () => {
    setShowModal(true);
  };

  return (
    <div className="border-gray-300 border  rounded-lg  w-full ">
      <div className="p-6 border-gray-300 border-b">
        <h2 className="text-2xl md:text-4xl font-bold  ">Membership Level</h2>
        <span className="block text-gray-600 mb-2">
          Update your membership information
        </span>
      </div>
      <div className="p-6 ">
        <div className="flex flex-wrap gap-6 ">
          {memberships.map((member, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl flex flex-col items-center cursor-pointer shadow-lg p-4 w-60 flex-shrink-0 text-left"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h4 className="font-medium text-sm">{member.name}</h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-xl">{member.price}</span>
              </div>
              <FiEdit
                className="absolute top-4 right-4"
                onClick={() => {
                  setselectedMembership(member);
                  setShowModal(true);
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={addMembership}
          className="mt-4 px-6 py-2 cursor-pointer bg-red-500 flex items-center justify-center gap-2 text-white rounded-lg w-full md:w-auto"
        >
          {loading && <Loading color={"white"} size={20} />}Add Membership
        </button>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AddMembership
          close={() => {
            setShowModal(false);
            loadMembership();
          }}
          membership={selectedMembership}
        />
      </Modal>
    </div>
  );
};

export default Membership;
