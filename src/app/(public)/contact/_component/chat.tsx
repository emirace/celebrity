"use client";

import { getMessages, sendMessage } from "@/services/support";
import { useEffect, useState } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

interface Message {
  _id: string;
  sender: string;
  message: string;
  isAdmin: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMessages();
    }
  }, [isOpen]);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages");
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const newMessage = await sendMessage({
        receiver: "Admin",
        message,
        isAdmin: false,
      });
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Icon */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <FaPaperPlane size={24} />
        </button>
      ) : (
        <div className="w-80 bg-white rounded-lg shadow-lg border p-4">
          {/* Chat Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Support Chat</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-60 overflow-y-auto mt-2">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-2 ${
                  msg.isAdmin ? "text-right text-blue-500" : "text-left"
                }`}
              >
                <p className="p-2 rounded bg-gray-200 inline-block">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>

          {/* Input & Send Button */}
          <div className="flex mt-2">
            <input
              className="flex-1 border p-2 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              className="ml-2 bg-blue-500 text-white p-2 rounded"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
