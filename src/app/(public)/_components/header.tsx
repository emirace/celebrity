import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className = "" }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center bg-gray-50 py-28 pb-16 p-4 ${className}`}
    >
      <h1 className="text-3xl sm:text-5xl font-medium text-gray-900 leading-tight text-center">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-gray-500 text-lg text-center max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
