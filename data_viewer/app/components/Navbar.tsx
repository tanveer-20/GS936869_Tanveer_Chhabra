"use client";
import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="h-16 flex items-center justify-between px-5 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <div className="mr-2">
          <Image
            src="/public/gsynergy-logo.svg"
            alt="GSynergy Logo"
            width={30}
            height={30}
            className="h-8 w-auto"
          />
        </div>
        <span className="text-xs text-gray-500">
          We Engineer Business Transformations
        </span>
      </div>

      <h1 className="text-2xl font-normal text-gray-700">Data Viewer App</h1>

      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 ml-1 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
