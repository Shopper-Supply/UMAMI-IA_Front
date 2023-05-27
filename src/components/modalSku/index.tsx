import iconRobo from "../../../public/Icon_Robo.svg";
import Image from "next/image";
import ListaModalSku from "../listaModalSku";
import { useData } from "@/providers/dataProvider";
import { useState } from "react";
import { IRepitedSku, ISheerAdjustment } from "@/interfaces/sheet";
import { deleteSku } from "@/services/delete";
import { useUser } from "@/providers/userProvider";

const ModalSku = () => {
  const { repitedSku, setRepitedSku } = useData(); // LIsta pai
  const [allRepitedSku, setAllRepitedSku] =
    useState<Array<IRepitedSku[]>>(repitedSku);
  const [currentRepitedOptions, setCurrentRepitedOptions] = useState<
    IRepitedSku[]
  >(allRepitedSku[0]);
  const [selectedRepited, setSelectedRepited] = useState<number>(0); // guarda o index da lista Pai

  const showRepitedSkus = (index: number) => {
    setCurrentRepitedOptions(allRepitedSku[index]);
    setSelectedRepited(index);
  };

  const DeleteItemFromRepitedOptions = (
    indexAll: number,
    indexCurrent: number
  ) => {
    const newAllRepitedSku = [...allRepitedSku];
    newAllRepitedSku[indexAll]?.splice(indexCurrent, 1);
    setAllRepitedSku(newAllRepitedSku);
    setCurrentRepitedOptions(newAllRepitedSku[indexAll]);
  };

  const getVisibleSkulength = (): number => {
    let length = 0;
    repitedSku.map((e) => {
      if (e.length > 1) {
        length++;
        return;
      }
      return;
    });
    return length;
  };
  const visibleSkulength = getVisibleSkulength();

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
              visibleSkulength < 7 ? "justify-center" : "ml-5"
            }`}
          >
            {repitedSku?.map((element, index) => {
              if (element.length <= 1) {
                return;
              } else {
                return (
                  <button
                    onClick={() => showRepitedSkus(index)}
                    key={index}
                    className={`${
                      selectedRepited == index
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
                  DeleteItemFromRepitedOptions={DeleteItemFromRepitedOptions}
                  data={elementData}
                  key={index}
                  currentIndex={index}
                  selectedRepited={selectedRepited}
                  currentRepitedOptions={currentRepitedOptions.length}
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
