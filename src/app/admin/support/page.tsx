"use client";

import { useEffect, useState } from "react";
import {
  getAdminConversations,
  getUserMessages,
  sendMessage,
} from "../../../services/support";

interface IConversation {
  userId: string;
  name: string;
  email: string;
  lastMessage: string;
}

interface IMessage {
  _id: string;
  sender: string;
  message: string;
  isAdmin: boolean;
}

export default function AdminChat() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await getAdminConversations();
      setConversations(data);
    } catch (error) {
      console.error("Failed to load conversations", error);
    }
  };

  const loadMessages = async (userId: string) => {
    try {
      const data = await getUserMessages(userId);
      setMessages(data);
      setSelectedUser(userId);
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUser) return;
    try {
      const newMessage = await sendMessage({
        receiver: selectedUser,
        message,
        isAdmin: true,
      });
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar - List of users */}
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-lg font-bold">User Chats</h2>
        {conversations.map((conv) => (
          <div
            key={conv.userId}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => loadMessages(conv.userId)}
          >
            <p className="font-semibold">{conv.name}</p>
            <p className="text-xs text-gray-500">{conv.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 p-4">
        {selectedUser ? (
          <>
            <div className="h-60 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={
                    msg.isAdmin ? "text-right text-blue-500" : "text-left"
                  }
                >
                  <p className="p-2 rounded bg-gray-200 inline-block">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
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
          </>
        ) : (
          <p>Select a user to chat with</p>
        )}
      </div>
    </div>
  );
}
