import React from "react";

interface LoadingProps {
  size?: number; // Optional size prop
  color?: string; // Optional color prop
}

function Loading({ size = 32, color }: LoadingProps) {
  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${
        color ? "" : "border-red-500"
      }`}
      style={{ height: `${size}px`, width: `${size}px` }}
    />
  );
}

export default Loading;
