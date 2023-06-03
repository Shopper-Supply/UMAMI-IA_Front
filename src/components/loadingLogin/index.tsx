import { useState } from "react";
import { useModal } from "@/providers/modaisProvider";

const LoadingLogin = () => {
  const { loadingScreen, setLoadingScreen } = useModal();

  return (
    <button
      type="button"
      className="flex justify-center items-center px-3 font-semibold text-sm rounded-full bg-transparent transition ease-in-out duration-150 cursor-not-allowed"
      disabled
    >
      <svg
        className=" bg-transparent animate-spin h-[2rem] w-[2rem] rounded-full border-t-[0.3rem] border-white"
        viewBox="0 0 24 24"
      ></svg>
    </button>
  );
};
export default LoadingLogin;
