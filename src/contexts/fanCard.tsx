import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getFanCards,
  getFanCard,
  createFanCard,
  updatFanCardById,
  deleteFanCard,
} from "@/services/fanCard";
import { IFanCard, IFanCardData } from "@/types/fanCard";

interface FanCardContextType {
  fanCards: IFanCard[];
  fetchFanCards: () => Promise<void>;
  fetchFanCardById: (id: string) => Promise<IFanCard>;
  createNewFanCard: (data: IFanCardData) => Promise<IFanCard>;
  updateFanCard: (id: string, data: IFanCardData) => Promise<void>;
  removeFanCard: (id: string) => Promise<void>;
}

const FanCardContext = createContext<FanCardContextType | undefined>(undefined);

export const FanCardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fanCards, setFanCards] = useState<IFanCard[]>([]);

  const fetchFanCards = async () => {
    try {
      const data = await getFanCards();
      setFanCards(data);
    } catch (error) {
      console.error("Failed to fetch fan cards:", error);
    }
  };

  const fetchFanCardById = async (id: string) => {
    try {
      const data = await getFanCard(id);
      return data;
    } catch (error) {
      console.error("Failed to fetch fan card by ID:", error);
    }
  };

  const createNewFanCard = async (data: IFanCardData) => {
    try {
      const created = await createFanCard(data);
      setFanCards((prev) => [created, ...prev]);
      return created;
    } catch (error) {
      throw error;
    }
  };

  const updateFanCard = async (id: string, data: IFanCardData) => {
    try {
      const updated = await updatFanCardById(id, data);
      setFanCards((prev) =>
        prev.map((card) => (card._id === id ? updated : card))
      );
    } catch (error) {
      console.error("Failed to update fan card:", error);
    }
  };

  const removeFanCard = async (id: string) => {
    try {
      await deleteFanCard(id);
      setFanCards((prev) => prev.filter((card) => card._id !== id));
    } catch (error) {
      console.error("Failed to delete fan card:", error);
    }
  };

  return (
    <FanCardContext.Provider
      value={{
        fanCards,
        fetchFanCards,
        fetchFanCardById,
        createNewFanCard,
        updateFanCard,
        removeFanCard,
      }}
    >
      {children}
    </FanCardContext.Provider>
  );
};

export const useFanCard = () => {
  const context = useContext(FanCardContext);
  if (!context) {
    throw new Error("useFanCard must be used within a FanCardProvider");
  }
  return context;
};
