import Image from "next/image";
import Icon_Robo from "../../../public/Icon_Robo.svg";
import { IConfirmAction } from "@/interfaces/form";
import { useModal } from "@/providers/modaisProvider";

const ConfirmAction = ({ message, setStatus }: IConfirmAction) => {
  const { closeAlert } = useModal();

  return (
    <div className="w-screen h-screen flex justify-center absolute z-10">
      <div className="bg-branco-primario drop-shadow-md w-[23vw] absolute mt-[1rem] rounded-[10px] p-6 animate-showPopAnimation ease-in-out">
        <div className="flex justify-start items-stat gap-5 mb-3">
          <Image src={Icon_Robo} alt="Supp" className="h-[4rem] w-[4rem]" />
          <h4 className=" text-roxo-secundario font-bold text-[1.8rem]">
            Supp
          </h4>
        </div>
        <p className="text-roxo-secundario font-semibold text-[1.5rem]">
          {message}
        </p>
        <div className="flex justify-center gap-5 mt-4">
          <button
            onClick={() => {
              setStatus(true);
              closeAlert();
            }}
            className="bg-severity-2 py-1 px-7 text-[1.5rem] font-semibold rounded-full shadow-inner drop-shadow-sm focus:outline-roxo-primario"
          >
            Sim
          </button>
          <button
            onClick={closeAlert}
            className="bg-severity-5 py-1 px-7 text-[1.5rem] font-semibold rounded-full text-branco-secundario shadow-inner drop-shadow-sm focus:outline-roxo-primario"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
