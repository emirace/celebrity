"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getMeets,
  createMeet,
  getMeet,
  updatMeetById,
  deleteMeet,
} from "@/services/meet";
import { IMeet, IMeetData } from "@/types/meet";

interface MeetContextType {
  meets: IMeet[];
  loading: boolean;
  error: string | null;
  fetchMeets: () => Promise<void>;
  createMeet: (data: IMeetData) => Promise<IMeet>;
  updateMeet: (id: string, data: IMeetData) => Promise<void>;
  deleteMeet: (id: string) => Promise<void>;
  getMeetById: (id: string) => Promise<IMeet | null>;
}

const MeetContext = createContext<MeetContextType | undefined>(undefined);

export const MeetProvider = ({ children }: { children: ReactNode }) => {
  const [meets, setMeets] = useState<IMeet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeets = async () => {
    try {
      const data = await getMeets();
      setMeets(data);
    } catch (err: any) {
      throw err || "Failed to fetch meets";
    }
  };

  const createMeetHandler = async (data: IMeetData) => {
    const res = await createMeet(data);
    fetchMeets();
    return res;
  };

  const updateMeet = async (id: string, data: IMeetData) => {
    await updatMeetById(id, data);
    fetchMeets();
  };

  const deleteMeetHandler = async (id: string) => {
    await deleteMeet(id);
    fetchMeets();
  };

  const getMeetById = async (id: string) => {
    try {
      const data = await getMeet(id);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchMeets();
      } catch (err: any) {
        setError(err?.message || "Failed to fetch meets");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <MeetContext.Provider
      value={{
        meets,
        loading,
        error,
        fetchMeets,
        createMeet: createMeetHandler,
        updateMeet,
        deleteMeet: deleteMeetHandler,
        getMeetById,
      }}
    >
      {children}
    </MeetContext.Provider>
  );
};

export const useMeet = () => {
  const context = useContext(MeetContext);
  if (!context) {
    throw new Error("useMeet must be used within a MeetProvider");
  }
  return context;
};
