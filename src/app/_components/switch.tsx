import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
}) => {
  return (
    <label className="flex items-center cursor-pointer select-none">
      {label && <span className="mr-2">{label}</span>}
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-red-600" : "bg-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
    </label>
  );
};
