import iconRobo from "../../../public/Icon_Robo.svg";
import Image from "next/image";
import ListaModalSku from "../listaModalSku";

const ModalSku = () => {
  return (
    <div className="absolute z-50 top-0 w-screen h-screen flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-20">
      <div className="bg-white w-[60%] h-[80%] rounded-md relative ml-10 ">
        <div className="absolute w-[100%] h-[4rem] flex justify-end items-center px-4">
          <div
            title="Fechar"
            className=" w-[1.5rem] h-[1.5rem] bg-severity-5 rounded-full cursor-pointer animate-bounce"
          ></div>
        </div>
        <div className="flex justify-center">
          <div className=" flex items-center w-[60%] h-[15%] p-5  rounded-lg relative">
            <Image
              className="z-10"
              src={iconRobo}
              alt="icon robô de qualidade."
            />
            <p className="text-roxo-primario text-3xl absolute left-32 text-center rounded-lg p-3 pl-10 bg-branco-secundario drop-shadow-sm">
              Opa! Alguns SKUS repetidos foram encontrados. Revise-os abaixo
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-white border-2 border-roxo-primario font-bold focus:bg-roxo-primario focus:text-white text-[1.2rem] text-roxo-primario rounded-full p-5 m-2">
            {" "}
            SKU: 3275878122509 - 3x
          </button>
          <button className="bg-white border-2 border-roxo-primario font-bold focus:bg-roxo-primario focus:text-white text-[1.2rem] text-roxo-primario rounded-full p-5 m-2">
            {" "}
            SKU: 3275878122509 - 3x
          </button>
          <button className="bg-white border-2 border-roxo-primario font-bold focus:bg-roxo-primario focus:text-white text-[1.2rem] text-roxo-primario rounded-full p-5 m-2">
            {" "}
            SKU: 3275878122509 - 3x
          </button>
        </div>
        <div className="flex justify-center overflow-y-scroll h-[33.5rem]">
          <div className="flex flex-col items-start w-[50vw] mt-5 gap-3">
            <ListaModalSku />
            <ListaModalSku />
            <ListaModalSku />
            <ListaModalSku />
            <ListaModalSku />
            <ListaModalSku />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalSku;
