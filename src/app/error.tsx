"use client";

import ErrorCard from "@/components/ui/error";
export default () => {
  return (
    <div className="w-full min-h-dvh h-full flex flex-col items-center justify-center">
      <ErrorCard
        className="w-full max-w-[500px]"
        title="Oops! An error occurred"
        description="Something went wrong while processing your request. We apologize for the inconvenience."
        message="Please click the reload button to refresh the page or go back to the previous page."
      />
    </div>
  );
};
