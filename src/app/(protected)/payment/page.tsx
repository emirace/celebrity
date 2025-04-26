"use client";

import Loading from "@/app/_components/loading";
import { useEffect, useState } from "react";
import { CiPhone } from "react-icons/ci";
import BankTransfer from "./_component/bankTransfer";
import Modal from "@/app/_components/modal";
import { useRouter, useSearchParams } from "next/navigation";
import { MdCurrencyBitcoin } from "react-icons/md";
import CryptoPayment from "./_component/cryptoPayment";
import { useMeet } from "@/contexts/meet";
import { BsBank } from "react-icons/bs";
import MeetSumary from "./_component/meetSumary";
import { getMembershipById } from "@/services/membership";
import { useFanCard } from "@/contexts/fanCard";

function Payment() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const { getMeetById } = useMeet();
  const { fetchFanCardById } = useFanCard();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>(null);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  const router = useRouter();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (type && id) {
        try {
          setLoading(true);
          setError("");
          if (type === "meet") {
            const res = await getMeetById(id);
            setFormData(res as any);
            setPrice(res?.celebrityId?.meetFee || 0);
          } else if (type === "membership") {
            const res = await getMembershipById(id);
            setFormData(res as any);
            setPrice(res?.price || 0);
          } else if (type === "fanCard") {
            const res = await fetchFanCardById(id);
            setFormData(res as any);
            setPrice(res?.celebrityId?.fanCardFee || 0);
          }
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      } else {
        router.back();
      }
    };
    loadData();
  }, []);

  return (
    <div className="max-w-[75rem] mx-auto w-full px-4">
      {loading ? (
        <div className="flex items-center justify-center h-[90vh] ">
          <Loading />
        </div>
      ) : error ? (
        <div className="pt-16 text-xl text-red-500 h-[80vh]">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-5 my-24 ">
          <div className="md:flex-[3]">
            <h1 className="text-3xl md:text-5xl font-bold">
              Select Payment Method
            </h1>
            <div className="mt-6 flex flex-col gap-6">
              {/* Bank Transfer Option */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-5 rounded-xl border">
                <div className="flex items-start gap-4">
                  <BsBank size={40} />
                  <div>
                    <div className="text-2xl font-bold">Bank Transfer</div>
                    <p className="text-gray-500 text-sm">
                      Securely transfer funds directly from your mobile bank
                      account.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-red-500 px-6 text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
                >
                  Proceed To Payment
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-5 rounded-xl border">
                <div className="flex items-start gap-4">
                  <MdCurrencyBitcoin size={40} />
                  <div>
                    <div className="text-2xl font-bold">Cryptocurrency</div>
                    <p className="text-gray-500 text-sm">
                      Pay using Bitcoin, Ethereum, or other cryptocurrencies.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowCrypto(true)}
                  className="bg-red-500 px-6 text-white font-semibold py-3 rounded-md hover:bg-opacity-70 transition"
                >
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>

          <div className="md:flex-1 ">
            {type === "meet" && <MeetSumary meet={formData} />}
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <BankTransfer
          amount={price}
          close={() => setModalOpen(false)}
          meta={formData}
          type={type || ""}
        />
      </Modal>
      <Modal isOpen={showCrypto} onClose={() => setShowCrypto(false)}>
        <CryptoPayment price={price} meta={formData} type={type || ""} />
      </Modal>
    </div>
  );
}

export default Payment;
