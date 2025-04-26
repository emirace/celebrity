"use client";

import Loading from "@/app/_components/loading";
import { useToastNotification } from "@/contexts/toastNotification";
import { getFanCards } from "@/services/fanCard";
import { IFanCard } from "@/types/fanCard";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function FanCard() {
  const { addNotification } = useToastNotification();
  const [fanCard, setFanCard] = useState<IFanCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFanCard = async () => {
      try {
        setLoading(true);
        const response = await getFanCards();
        setFanCard(response);
      } catch (error) {
        addNotification({ message: error as string, error: true });
      } finally {
        setLoading(false);
      }
    };
    loadFanCard();
  }, []);

  return (
    <div>
      <div className="text-red-500 text-xl md:text-2xl font-semibold mb-6">
        My Fan Card
      </div>
      <div className="min-h-[50rem] w-full bg-gray-100 rounded-lg  p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        ) : fanCard.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fanCard.map((card) => (
              <div
                key={card._id}
                className={`bg-gradient-to-br ${card.fandomTheme} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-md mx-auto`}
              >
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold capitalize">
                    {card.celebrityId.fullName}
                  </h2>
                  <p className="text-sm text-red-500 tracking-wide uppercase">
                    Fan Card
                  </p>
                </div>

                {/* Card Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                  <Image
                    src={card.photoUrl}
                    alt="Fan Card"
                    width={112}
                    height={112}
                    className="w-28 h-28 object-cover bg-black rounded-xl border-4 border-white shadow-sm"
                  />
                  <div className="text-sm space-y-1 sm:ml-2">
                    <p>
                      <span className="font-semibold capitalize ">Name:</span>{" "}
                      {card.nickname}
                    </p>
                    <p>
                      <span className="font-semibold">Expiry:</span>
                      {moment(card.createdAt)
                        .add(1, "year")
                        .format("MMMM Do, YYYY")}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`font-semibold ${
                          card.status === "Completed"
                            ? "text-green-600"
                            : card.status === "Cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {card.status}
                      </span>
                    </p>
                  </div>

                  <QRCodeSVG
                    value={
                      card.status !== "Completed"
                        ? `FAN-fan is currently ${card.status}`
                        : card.fanId
                    }
                    size={64}
                  />
                </div>

                {/* Card Number + QR */}
                <div className="mt-4 flex justify-center items-center border-t pt-3">
                  <p className="text-sm font-mono">
                    Membership Id:{" "}
                    <span className="tracking-widest">{card.fanId}</span>
                  </p>
                </div>

                {/* About Section */}
                <div className="mt-4 bg-white/30 backdrop-blur-md p-3 rounded-md text-sm text-gray-700 space-y-2">
                  <p className="font-medium">About this card:</p>
                  <p>
                    This Fan Card grants exclusive access to behind-the-scenes
                    content, meet & greet opportunities, and loyalty rewards for
                    events featuring John Cena.
                  </p>

                  <p className="text-xs text-gray-600 pt-2 border-t">
                    <strong>Disclaimer:</strong> This card is for fan engagement
                    purposes only and does not represent any legal
                    identification or payment method.
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-6">No fan card available.</p>
        )}
      </div>
    </div>
  );
}

export default FanCard;
