"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getBookings,
  createBooking,
  getBooking,
  updatBookingById,
  deleteBooking,
} from "@/services/booking";
import { IBooking, IBookingData } from "@/types/booking";

interface BookingContextType {
  bookings: IBooking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  createBooking: (data: IBookingData) => Promise<void>;
  updateBooking: (id: string, data: IBookingData) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  getBookingById: (id: string) => Promise<IBooking | null>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      throw err || "Failed to fetch bookings";
    }
  };

  const createBookingHandler = async (data: IBookingData) => {
    await createBooking(data);
    fetchBookings();
  };

  const updateBooking = async (id: string, data: IBookingData) => {
    await updatBookingById(id, data);
    fetchBookings();
  };

  const deleteBookingHandler = async (id: string) => {
    await deleteBooking(id);
    fetchBookings();
  };

  const getBookingById = async (id: string) => {
    try {
      const data = await getBooking(id);
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
        await fetchBookings();
      } catch (err) {
        setError((err as string) || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        fetchBookings,
        createBooking: createBookingHandler,
        updateBooking,
        deleteBooking: deleteBookingHandler,
        getBookingById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
