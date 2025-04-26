import { useToastNotification } from "@/contexts/toastNotification";
import React, { useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

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

  const notificationsWithAction = notifications.filter(
    (notification) => notification.action
  );
  const notificationsWithoutAction = notifications.filter(
    (notification) => !notification.action
  );
  return (
    <>
      <div className="fixed top-4 right-4 z-[100]">
        <div className="flex flex-col gap-2">
          {/* Notifications with actions */}
          {notificationsWithAction.map((notification) => (
            <div
              key={notification.id}
              className="bg-green-400 text-white rounded-lg p-4 my-2 shadow-md flex gap-4 items-center justify-between"
            >
              <FiBell />
              <div className="space-y-4">
                <div className="text-xs text-center sm:text-sm md:text-base">
                  {notification.message}
                </div>
                <button
                  onClick={() => {
                    notification.action && notification.action();
                    removeNotification(notification.id);
                  }}
                  className="px-2 py-1 bg-white  text-orange-color text-jua text-sm rounded"
                >
                  {notification.buttonText}
                </button>
              </div>
              <IoMdClose />
            </div>
          ))}
        </div>
      </div>
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
