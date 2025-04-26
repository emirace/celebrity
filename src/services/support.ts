import api from "./api";

export const getAdminConversations = async () => {
  try {
    const response = await api.get(`/suport/conversation`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin conversations:", error);
    throw error;
  }
};

export const getUserMessages = async (userId: string) => {
  try {
    const response = await api.get(`/suport/user`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user messages:", error);
    throw error;
  }
};

export const getMessages = async () => {
  try {
    const response = await api.get(`/suport/message`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user messages:", error);
    throw error;
  }
};

export const sendMessage = async ({
  receiver,
  message,
  isAdmin,
}: {
  receiver: string;
  message: string;
  isAdmin: boolean;
}) => {
  try {
    const response = await api.post(`/suport/send`, {
      receiver,
      message,
      isAdmin,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
