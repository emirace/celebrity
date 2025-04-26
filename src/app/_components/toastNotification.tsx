import { useToastNotification } from "@/contexts/toastNotification";
import React, { useEffect } from "react";

const ToastNotification: React.FC = () => {
  const { notifications, removeNotification } = useToastNotification();
  useEffect(() => {
    const notificationTimeouts: Record<string, number> = {};

    notifications.forEach((notification) => {
      if (!notification.action) {
        const timeoutId = setTimeout(() => {
          removeNotification(notification.id);
        }, 5000); // Adjust the duration as needed
        notificationTimeouts[notification.id] = timeoutId as unknown as number;
      }
    });

    return () => {
      // Clear timeouts on unmount
      Object.values(notificationTimeouts).forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
    };
  }, [notifications, removeNotification]);

  const notificationsWithoutAction = notifications.filter(
    (notification) => !notification.action
  );
  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
        <div className="flex flex-col gap-2">
          {/* Notifications without actions */}
          {notificationsWithoutAction.map((notification) => (
            <div
              key={notification.id}
              className={`${
                notification.error
                  ? "bg-red-500 text-white"
                  : "bg-green-400 text-white"
              } text-xs text-center sm:text-sm md:text-base rounded-lg py-2 px-4 my-2 shadow-md`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ToastNotification;
