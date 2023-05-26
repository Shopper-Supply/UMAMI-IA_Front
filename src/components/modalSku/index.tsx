import iconRobo from "../../../public/Icon_Robo.svg";
import Image from "next/image";
import ListaModalSku from "../listaModalSku";
import { useData } from "@/providers/dataProvider";
import { useEffect, useState } from "react";
import { IRepitedSku } from "@/interfaces/sheet";
import { useModal } from "@/providers/modaisProvider";
import ConfirmAction from "../confirmAction";
import { verifyToken } from "@/utils/finds";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";


const ModalSku = () => {
  const {
    setErrorsLog,
    setCurrentCurator,
    setCurrentPlace,
    repitedSku
  } = useData();
  const [currentRepitedOptions, setCurrentRepitedOptions] =
    useState<IRepitedSku[]>();
  const { isAlertOpen, openAlert, hideModal } =
  useModal();
  const [statusDuplicateSku, setStatusDuplicateSku] = useState<boolean>(false);
  const { token, setAuth } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (statusDuplicateSku) {
      setStatusDuplicateSku(false);
    }
  }, [statusDuplicateSku]);
    
  const getRepitedListlength = () => {
    if (repitedSku == undefined) {
      return 0;
    } else {
      return repitedSku!.length;
    }
  };
  const repitedListlength = getRepitedListlength();
  // {
  //   repitedSku?.map((element) => {
  //     console.log(element);
  //   });
  // }

 const closeModal = () => {
  openAlert();
  hideModal()
 }

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
              Opa! Alguns SKUS repetidos foram encontrados. Revise-os abaixo
            </p>
          </div>
        </div>
        <div className="w-[100%] pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
          <div
            className={`flex gap-3 mt-10 ${
              repitedListlength < 7 ? "justify-center" : "ml-5"
            }`}
          >
            {repitedSku?.map((element) => {
              return (
                <button
                  onClick={() => setCurrentRepitedOptions(element)}
                  key={element[0].id}
                  className="bg-white border-2 h-[4rem] border-roxo-primario font-bold focus:bg-roxo-primario focus:text-white text-[1.2rem] text-roxo-primario rounded-full px-7 leading-5"
                >
                  {" "}
                  {element.length}X - SKU: <br /> {element[0].sku_code}
                </button>
              );
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
              return <ListaModalSku data={elementData} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalSku;
