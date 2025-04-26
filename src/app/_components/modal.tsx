import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      setTimeout(() => setShow(false), 300); // Wait for animation to finish
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose} // Close on backdrop click
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className={`bg-white rounded-lg shadow-lg w-[90%] h-[90%] overflow-y-auto max-w-xl p-6 relative transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
