
import { useState } from "react";
import { useModal } from "@/providers/modaisProvider";

const LoadingScreen = () => {
  const {loadingScreen, setLoadingScreen} = useModal()

  return (
    <div className="w-screen h-screen flex z-50 absolute justify-center items-center bg-black bg-opacity-20">
      <svg className=" bg-transparent animate-spin -ml-1 mr-3 h-[10rem] w-[10rem] rounded-full border-t-[0.75rem] border-roxo-primario" viewBox="0 0 24 24">
      </svg>
    </div>
  );
};
export default LoadingScreen;
