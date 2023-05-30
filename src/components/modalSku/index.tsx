import iconRobo from "../../../public/Icon_Robo.svg";
import Image from "next/image";
import ListaModalSku from "../listaModalSku";
import { useData } from "@/providers/dataProvider";
import { useEffect, useState } from "react";
import { IRepitedSku, ISheerAdjustment } from "@/interfaces/sheet";
import { useModal } from "@/providers/modaisProvider";
import ConfirmAction from "../confirmAction";
import { verifyToken } from "@/utils/finds";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { deleteSku } from "@/services/delete";

const ModalSku = () => {
  const { setErrorsLog, setCurrentCurator, setCurrentPlace, repitedSku } =
    useData();
  const { isAlertOpen, openAlert, hideModal } = useModal();
  const [statusDuplicateSku, setStatusDuplicateSku] = useState<boolean>(false);
  const [allRepitedSku, setAllRepitedSku] =
    useState<Array<IRepitedSku[]>>(repitedSku);
  const [currentRepitedOptions, setCurrentRepitedOptions] = useState<
    IRepitedSku[]
  >(allRepitedSku[0]);
  const [selectedRepited, setSelectedRepited] = useState<number>(0);
  const [visibleSkulength, setVisibleSkulength] = useState<number>(0);
  const { token, setAuth } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (statusDuplicateSku) {
      setStatusDuplicateSku(false);
    }
  }, [statusDuplicateSku]);

  const showRepitedSkus = (index: number) => {
    setCurrentRepitedOptions(allRepitedSku[index]);
    setSelectedRepited(index);
    getVisibleSkulength();
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

  const getVisibleSkulength = (): void => {
    let length = 0;
    repitedSku.map((e) => {
      if (e.length > 1) {
        length++;
        return;
      }
      return;
    });
    setVisibleSkulength(length);
  };

  const closeModal = () => {
    openAlert();
    hideModal();
  };
  // {
  //   repitedSku?.map((element) => {
  //     console.log(element);
  //   });
  // }
  return (
    <div className="absolute z-50 top-0 w-screen h-screen flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-20">
      <div className="bg-white w-[60%] h-[80%] rounded-md relative ml-10 ">
        <div className="absolute w-[100%] h-[4rem] flex justify-end items-center px-4">
          <div
            onClick={() => {
              closeModal();
            }}
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
              {visibleSkulength > 0
                ? "Opa! Alguns SKUS repetidos foram encontrados. Revise-os abaixo"
                : "Parece que você já revisou todos os SKUs Repetidos!"}
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
        <div className="flex justify-center">
          {isAlertOpen && (
            <ConfirmAction
              message="VOCÊ AINDA TEM VERIFICAÇÕES A FAZER. TEM CERTEZA QUE DESEJA SAIR?"
              setStatus={setStatusDuplicateSku}
            />
          )}
        </div>
        <div className="flex justify-center overflow-y-scroll h-[30rem] scrollbar-thin scrollbar-thumb-rounded-[4px] scrollbar-thumb-roxo-primario">
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
