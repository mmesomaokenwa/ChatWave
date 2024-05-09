import Loader from "@/components/shared/Loader";
import React from "react";

const LoadingExplore = () => {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Loader width={40} height={40} className={"!dark:loader"} />
    </main>
  );
};

export default LoadingExplore;
