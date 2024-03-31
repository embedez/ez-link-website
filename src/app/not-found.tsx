"use client";
import ErrorCard from "@/components/ui/error";

export default () => {
  return (
    <div
      className={
        "w-full min-h-dvh h-full flex flex-col items-center justify-center"
      }
    >
      <ErrorCard
        className={"w-full max-w-[500px]"}
        title={"404 - Page Not Found"}
        description={"Oops! The page you're looking for can't be found."}
        message={
          "The link you clicked may be broken or the page may have been removed. Please check the URL again or click go back"
        }
      />
    </div>
  );
};
