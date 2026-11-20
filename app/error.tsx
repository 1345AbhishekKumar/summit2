"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, you would log this to an error reporting service (e.g., Sentry)
    // We avoid console.error here to keep the production console clean as requested.
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F0] text-[#1A1A1A] p-6">
      <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
        Something went wrong.
      </h2>
      <p className="text-[#1A1A1A]/70 mb-8 max-w-md text-center">
        We apologize for the inconvenience. An unexpected error has occurred while loading this page.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-4 bg-[#1A1A1A] text-[#F5F5F0] rounded-sm hover:bg-[#1A1A1A]/80 active:scale-95 transition-all duration-300 ease-out"
      >
        Try again
      </button>
    </div>
  );
}
