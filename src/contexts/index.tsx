"use client";

import { ReactNode } from "react";
import { ToastNotificationProvider } from "./toastNotification";
import { UserProvider } from "./user";
import { MeetProvider } from "./meet";
import { BookingProvider } from "./booking";
import { FanCardProvider } from "./fanCard";
import ToastNotification from "@/app/_components/toastNotification";
import { PaymentProvider } from "./payment";
import { SettingProvider } from "./setting";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastNotificationProvider>
      <UserProvider>
        <MeetProvider>
          <BookingProvider>
            <FanCardProvider>
              <PaymentProvider>
                <SettingProvider>
                  <ToastNotification />
                  {children}
                </SettingProvider>
              </PaymentProvider>
            </FanCardProvider>
          </BookingProvider>
        </MeetProvider>
      </UserProvider>
    </ToastNotificationProvider>
  );
}

export default Providers;
