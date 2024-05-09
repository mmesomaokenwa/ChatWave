import Loader from "@/components/shared/Loader";
import React from "react";

const LoadingUpdate = () => {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Loader width={40} height={40} />
    </main>
  );
};

export default LoadingUpdate;
