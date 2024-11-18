"use client";

import React from "react";
import "./SkeletonLoader.css"; // Import CSS for shimmer effect

export const SkeletonLoader = () => {
  return (
    <div className="shadow rounded-lg p-10  bg-[#141519]">
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4">
        <div className="shimmer rounded-full h-12 w-12"></div>
        <div className="flex-1">
          <div className="shimmer h-4 rounded w-1/2 mb-2"></div>
          <div className="shimmer h-3 rounded w-1/4"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mt-4 space-y-3">
        <div className="shimmer h-4 rounded"></div>
        <div className="shimmer h-4 rounded w-5/6"></div>
        <div className="shimmer h-4 rounded w-3/4"></div>
      </div>

      {/* Image Placeholder */}
      <div className="mt-6 shimmer h-48 rounded-lg"></div>

      {/* Actions Skeleton */}
      <div className="flex justify-between items-center mt-6">
        <div className="shimmer h-8 rounded w-24"></div>
        <div className="shimmer h-8 rounded w-32"></div>
      </div>
    </div>
  );
};
