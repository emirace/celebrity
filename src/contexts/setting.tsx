"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  fetchSettingsService,
  updateSettingsService,
} from "../services/setting";
import { ISetting } from "@/types/setting";

interface Props {
  children: ReactNode;
}

interface SettingContextProps {
  settings: ISetting;
  fetchSettings: () => Promise<void>;
  updateSettinngs: (value: ISetting) => Promise<void>;
}

export const SettingContext = createContext<SettingContextProps | undefined>(
  undefined
);

export const SettingProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState<ISetting>({
    bankingInfo: {
      accountNumber: "",
      accountName: "",
      bankName: "",
      routing: "",
      address: "",
    },
    cryptoInfo: [
      {
        name: "",
        network: "",
        address: "",
        rate: 0,
      },
    ],
    mail: {
      name: "",
      password: "",
    },
    cashApp: {
      tag: "",
      name: "",
    },
    whatsApp: "",
  });

  const fetchSettings = async () => {
    try {
      const res = await fetchSettingsService();
      setSettings(res);
    } catch (error) {
      throw error;
    }
  };

  const updateSettinngs = async (value: ISetting) => {
    try {
      const res = await updateSettingsService(value);
      setSettings(res);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingContext.Provider
      value={{ settings, fetchSettings, updateSettinngs }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSetting must be used within a SettingProvider");
  }
  return context;
};
