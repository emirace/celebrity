import { useState, useEffect, ChangeEvent } from "react";
import { FaRegCopy, FaExclamationCircle } from "react-icons/fa";
import Loading from "../../../_components/loading";
import { compressImageUpload } from "../../../../utils/image";
import { useToastNotification } from "@/contexts/toastNotification";
import { useSetting } from "@/contexts/setting";
import Image from "next/image";
import { processPayment } from "@/services/payment";
import { useRouter } from "next/navigation";

const BankTransfer = ({
  close,
  amount,
  meta,
  type,
  currency,
}: {
  close: () => void;
  amount: number;
  meta: object;
  type: string;
  currency: string;
}) => {
  const { addNotification } = useToastNotification();
  const { settings, fetchSettings } = useSetting();
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3600);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [madePayment, setMadePayment] = useState(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 10;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handlePayment = async () => {
    if (!receipt) {
      addNotification({
        message: "Please upload a receipt before confirming payment.",
        error: true,
      });
      return;
    }
    try {
      setLoadingPayment(true);
      await processPayment({
        amount,
        currency,
        meta,
        paymentMethod: "bank transfer",
        receipt,
        type,
      });

      addNotification({ message: "Deposit made successfully" });
      router.push("/meet/success");
    } catch (error) {
      addNotification({
        message: error as string,
        error: true,
      });
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) throw Error("No image found");

      const imageUrl = await compressImageUpload(file, 1024);

      setReceipt(imageUrl);

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

  return loading ? (
    <div className="h-[60vh] w-full flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div className="rounded-lg p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">⭘</span>
        </div>
        <span className="font-semibold text-lg text-gray-900">M-Fanstar</span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold">Bank transfer</h2>
      <p className="text-sm text-gray-500 mb-4">
        Make transfer to the account details provided
      </p>

      {/* Account Details */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4 border">
        <div className="flex gap-4 items-center">
          <p className="text-sm text-gray-500">Account number</p>
          <button
            onClick={() => copyToClipboard(settings.bankingInfo.accountNumber)}
          >
            <FaRegCopy className="text-gray-500 cursor-pointer" />
          </button>
        </div>
        <p className="font-semibold text-lg">
          {settings.bankingInfo.accountNumber}
        </p>

        <p className="text-sm text-gray-500 mt-3">Account name</p>
        <p className="font-semibold">{settings.bankingInfo.accountName}</p>

        <p className="text-sm text-gray-500 mt-3">Routing</p>
        <p className="font-semibold">{settings.bankingInfo.routing}</p>

        <p className="text-sm text-gray-500 mt-3">Address</p>
        <p className="font-semibold">{settings.bankingInfo.address}</p>

        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-sm text-gray-500">Bank name</p>
            <p className="font-semibold uppercase">
              {settings.bankingInfo.bankName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Account number refresh</p>
            <p className="font-semibold">{formatTime(countdown)}</p>
          </div>
        </div>
      </div>

      {/* Upload Receipt */}
      {madePayment && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Payment Receipt
          </label>
          {receipt && (
            <Image
              src={receipt || ""}
              alt="Passport"
              className="object-contain h-40 w-40 rounded-lg"
              width={160}
              height={160}
            />
          )}
          <input
            type="file"
            accept="image/*,application/pdf"
            className="mt-1 p-2 border rounded-lg w-full"
            onChange={handleImageUpload}
          />
          {uploading && <Loading size={20} />}
        </div>
      )}

      {/* Confirmation Notice */}
      <p className="text-xs text-gray-500 flex items-center justify-center mb-2">
        <FaExclamationCircle className="text-gray-500 mr-1" />
        Only confirm if you have made the transfer
      </p>

      {/* Confirm & Back Buttons */}
      {madePayment ? (
        <button
          onClick={handlePayment}
          disabled={loadingPayment}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
        >
          {loadingPayment && <Loading size={20} color="white" />} Continue
        </button>
      ) : (
        <button
          onClick={() => setMadePayment(true)}
          disabled={amount <= 0}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
        >
          I have made Payment ({currency}
          {amount})
        </button>
      )}
      <button
        onClick={close}
        className="w-full mt-3 border border-gray-300 py-2 rounded-lg font-semibold"
      >
        Back to payment methods
      </button>
    </div>
  );
};

export default BankTransfer;
