import iconRobo from "../../../public/Icon_Robo.svg";
import Image from "next/image";
import ListaModalSku from "../listaModalSku";
import { useData } from "@/providers/dataProvider";
import { useState } from "react";
import { IRepitedSku } from "@/interfaces/sheet";
import { deleteSku } from "@/services/delete";
import { useUser } from "@/providers/userProvider";

const ModalSku = () => {
  const { repitedSku, setRepitedSku } = useData();

  const [currentRepitedOptions, setCurrentRepitedOptions] = useState<
    IRepitedSku[]
  >([]);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [selectedRepitedOptions, setSelectedRepitedOptions] = useState<
    number | undefined
  >(undefined);

  const getRepitedListlength = () => {
    // Essa função serve para auxiliar em como a lusta sera renderizada.
    if (repitedSku == undefined) {
      return 0;
    } else {
      return repitedSku!.length;
    }
  };
  getRepitedListlength();

  const updateRepitedSku = () => {
    return repitedSku.filter((e, i) => e[0].id != currentRepitedOptions[0].id);
  };

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
        <div className="w-[100%] pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
          <div
            className={`flex gap-3 mt-10 ${
              repitedSku?.length < 7 ? "justify-center" : "ml-5"
            }`}
          >
            {repitedSku?.map((element, index) => {
              if (element.length <= 1) {
                return;
              } else {
                return (
                  <button
                    onClick={() => {
                      // setRepitedSku(repitedSku.filter((element, index) => {}));
                      setCurrentRepitedOptions(element);
                      setSelectedRepitedOptions(index);
                    }}
                    key={index}
                    className={`${
                      selectedRepitedOptions == index
                        ? "bg-roxo-primario text-branco-primario"
                        : "text-roxo-primario bg-white"
                    }  border-2 h-[4rem] border-roxo-primario font-bold text-[1.2rem] rounded-full px-7 leading-5`}
                  >
                    {" "}
                    {element.length}X - SKU: <br /> {element[0].sku_code}
                  </button>
                );
              }
            })}
          </div>
        </div>
        <div className="flex justify-center py-5 overflow-y-scroll h-[60%] scrollbar-thin scrollbar-thumb-rounded-[4px] scrollbar-thumb-roxo-primario">
          <div className="flex flex-col items-start w-[50vw] mt-5 gap-3">
            {currentRepitedOptions?.map((elementData, index) => {
              return (
                <ListaModalSku
                  currentRepitedOptions={currentRepitedOptions}
                  data={elementData}
                  key={index}
                  setIdToDelete={setIdToDelete}
                  setCurrentRepitedOptions={setCurrentRepitedOptions}
                  updateRepitedSku={updateRepitedSku}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalSku;
