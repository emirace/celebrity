import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  button: string;
  image1: string;
  image2: string;
  path: string;
  inverse?: boolean;
}

function ServiceCard({
  title,
  description,
  button,
  image1,
  image2,
  path,
  inverse = false,
}: Props) {
  return (
    <div className=" flex flex-col md:flex-row gap-8 mb-16">
      <div className="text-sm font-medium md:w-1/3">{title}</div>
      <div className="md:w-2/3">
        <div className="flex flex-col md:flex-row mb-4">
          <p className="text-sm text-gray-600 mb-6 md:w-1/3">{description}</p>

          <div className="flex flex-col w-full items-start md:items-end h-full">
            <Link
              href={path}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              {button}
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
          {/* First Image */}
          <div
            className={`relative rounded-lg overflow-hidden w-full ${
              inverse ? "md:w-1/3" : "md:w-2/3"
            } h-72`}
          >
            <Image
              src={image1}
              alt="first image"
              fill
              className="object-cover"
            />
          </div>

          {/* Second Image */}
          <div
            className={`hidden md:block relative rounded-lg overflow-hidden ${
              inverse ? "md:w-2/3" : "md:w-1/3"
            } h-72`}
          >
            <Image
              src={image2}
              alt="second image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
