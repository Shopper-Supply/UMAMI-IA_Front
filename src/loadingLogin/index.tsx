import { useState } from "react";
import { useModal } from "@/providers/modaisProvider";

const LoadingLogin = () => {
  const {loadingScreen, setLoadingScreen} = useModal()

  return (
    <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white border-roxo-primario transition ease-in-out duration-150 cursor-not-allowed" disabled>
      <svg className=" bg-transparent animate-spin -ml-1 mr-3 h-[2rem] w-[2rem] rounded-full border-t-[0.75rem] border-roxo-primario" viewBox="0 0 24 24">
      </svg>
    </button>
  );
};
export default LoadingLogin;
