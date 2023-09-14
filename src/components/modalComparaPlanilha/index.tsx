import Image from "next/image";
import iconRobo from "../../../public/Icon_Robo.svg";
import { HiPlusCircle } from "react-icons/hi";

import { useData } from "@/providers/dataProvider";
import { useModal } from "@/providers/modaisProvider";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { findCurator, findPlace, verifyToken } from "@/utils/finds";
import { useEffect, useState } from "react";
import { compareSheets, createPlace } from "@/services/post";
import { useUser } from "@/providers/userProvider";
import { IPlace } from "@/interfaces/place";
import { AxiosResponse } from "axios";
import ConfirmAction from "../confirmAction";
import { error, info } from "@/utils/toast";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { ICompareSheetsResponse } from "@/interfaces/sheet";
import { IFormCompareSheets } from "@/interfaces/form";
import { IErrorCompare, IErrorLog } from "@/interfaces/errors";
import { useRouter } from "next/router";
import { HiPlus, HiOutlineXMark } from "react-icons/hi2";
import { getCurators } from "@/services/get";

const ModalComparaPlanilha = () => {
  const schema = yup.object().shape({
    curator: yup.string().required("Campo Obrigatório"),
    client: yup.string().required("Campo Obrigatório"),
    abbr: yup
      .string()
      .required("Campo obrigatório")
      .max(3, "A abreviação do projeto precisa ter 3 caracteres"),
    mall: yup.string().required("Campo Obrigatório"),
    place: yup.string().required("Campo Obrigatório"),
    curator_spreadsheet: yup
      .mixed()
      .required("Por favor, selecione um arquivo"),
    control_spreadsheet: yup
      .mixed()
      .required("Por favor, selecione um arquivo"),
  });

  const {
    curators,
    places,
    errorsTypes,
    errorsLog,
    currentCurator,
    currentPlace,
    addError,
    setErrorsLog,
    setCurrentCurator,
    setCurrentPlace,
    setCurators,
  } = useData();
  const { hideModal, openAlert, isAlertOpen, setLoadingScreen } = useModal();
  const { token, setAuth, userData } = useUser();
  const [statusPlace, setstatusPlace] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const router = useRouter();
  const [controlFileName, setControlFileName] = useState("");
  const [curatorFileName, setCuratorFileName] = useState("");
  const [controlFile, setControlFile] = useState("");
  const [curatorFile, setCuratorFile] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCompareSheets>({
    resolver: yupResolver(schema),
  });

  const saveErros = (errorList: IErrorCompare[]) => {
    errorList.forEach((error) => {
      const data: IErrorLog = {
        error_type: error.errorType,
        coor: `${error.row}`,
        sheet: "LINHA",
      };
      addError(data);
    });
  };

  const processCompareSheets = (
    idCurator: any,
    placeData: IPlace,
    data: IPlace
  ) => {
    setLoadingScreen(true);
    info("COMPARANDO PLANILHAS...");

    const formData = new FormData();

    formData.append("control_spreadsheet", controlFile);
    formData.append("curator_spreadsheet", curatorFile);
    formData.append("curator_id", idCurator);
    formData.append("place", JSON.stringify(placeData));

    compareSheets(token || " ", formData)
      .then((res: ICompareSheetsResponse) => {
        if (res) {
          if (res.errors.espt.length > 0) {
            console.log(res.errors.espt);
            saveErros(res.errors.espt);
          } else if (res.errors.prod.length > 0) {
            console.log(res.errors.prod);
            saveErros(res.errors.prod);
          } else if (res.errors.sku.length > 0) {
            console.log(res.errors.sku);
            saveErros(res.errors.sku);
          } else {
            info("NENHUM VIOLAÇÂO ENCONTRADA");
            return;
          }
        } else {
          error("OPS! ALGO DEU ERRADO NA COMPARAÇÃO DE PLANILHAS");
        }
      })
      .catch((err) => {
        error("OPS! ALGO DEU ERRADO NA COMPARAÇÃO DE PLANILHAS");
      })
      .finally(() => {
        setstatusPlace(false);
        hideModal();
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    if (statusPlace) {
      let placeData = {
        id: data.id,
        abbr: data.abbr,
        client: data.client,
        mall: data.mall,
        name: data.place,
        is_active: data.is_active
      };

      createPlace(token || "", placeData)
        .then((res: IPlace) => {
          if (res) {
            placeData = {
              id: res.id,
              abbr: res.abbr,
              client: res.client,
              mall: res.mall,
              name: res.name,
              is_active: res.is_active,
            };

            const curatorId = findCurator(curators, data);

            processCompareSheets(curatorId, placeData, data);
          }
        })
        .catch((err) => {
          error("OPS! ALGO DEU ERRADO NA CRIAÇÂO DO CANAL DE VENDAS");
        });
    }
    getCurators(token || "", setCurators, userData?.role?.id);
  }, [data, token, statusPlace]);

  const onSubmit = (data: IFormCompareSheets) => {
    // verificação de token de usuario.
    const verifyTokenResult = verifyToken(setAuth, hideModal, router);
    if (verifyTokenResult !== true) {
      return;
    }

    setData(data);

    const idCurator = findCurator(curators, data);

    if (idCurator) {
      const place = findPlace(places, data);
      if (!place) {
        openAlert();
      } else {
        const placeData = {
          id: "",
          abbr: data.abbr,
          client: data.client,
          mall: data.mall,
          name: data.place,
          is_active: true
        };

        processCompareSheets(idCurator, placeData, data);
      }
    } else {
      error("EU NÃO CONHEÇO ESSE CURADOR");
    }
  };

  const handleControlFileChange = (event: any) => {
    const file = event.target.files[0];
    const fileName = file?.name.includes(".xlsx" || ".xls");

    let validExt = new Array(".XLSX", ".XLS");

    if (fileName == false) {
      error(
        "OPS! VOCÊ PRECISA ENVIAR UM ARQUIVO EXCEL" + validExt.toString() + "."
      );
      return false;
    } else {
      setControlFile(file);
      setControlFileName(file.name);
    }
  };

  const handleCuratorFileChange = (event: any) => {
    const file = event.target.files[0];
    const fileName = file?.name.includes(".xlsx" || ".xls");

    let validExt = new Array(".XLSX", ".XLS");

    if (fileName == false) {
      error(
        "OPS! VOCÊ PRECISA ENVIAR UM ARQUIVO EXCEL" + validExt.toString() + "."
      );
      return false;
    } else {
      setCuratorFile(file);
      setCuratorFileName(file.name);
    }
  };

  return (
    <>
      {isAlertOpen && (
        <ConfirmAction
          message="O CANAL DE VENDA INFORMADO AINDA NÃO FOI CADASTRADO, DESEJA CADASTRAR ESSE COMO NOVO?"
          setStatus={setstatusPlace}
        />
      )}
      <div className="z-10 bg-branco-primario w-[25%] min-w-[35rem] h-screen flex flex-col items-center drop-shadow-md">
        <div className="flex flex-col justify-around items-center mt-[1rem]">
          <Image src={iconRobo} alt="icon robô de qualidade." />
          <p className="text-roxo-primario text-3xl text-center p-3">
            Compare se as informações foram violadas.
          </p>
        </div>
        <form
          className="flex flex-col items-center"
          id="formCompare"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center p-10 justify-around h-[21rem]">
            <label className="w-[100%]">
              <select
                {...register("curator")}
                value={errorsLog.length > 0 ? currentCurator.name : undefined}
                style={{
                  pointerEvents: errorsLog.length > 0 ? "none" : "auto",
                }}
                placeholder={
                  errors.curator
                    ? "Insira o curador responsavel"
                    : "Alex Lanção"
                }
                title="Curador"
                // value dele precisa ser o do provider quando tiver erros no provider da erroLog após envio da planilha (o valor setado deve ser o da resposta da req)
                // ternario para desabilitar e definir o valor do input caso o erroLog.length > 0.
                className={`w-[100%] rounded-full ${
                  errors.curator
                    ? "border-red-600 focus:border-red-700"
                    : "border-roxo-primario"
                } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
              >
                {curators.map((curator) => {
                  console.log(curator.name);
                  return (
                    <option key={curator.id} value={curator.name}>
                      {curator.name}
                    </option>
                  );
                })}
              </select>
              {errors.curator && (
                <span className="text-red-600 pl-5">
                  {errors.curator.message}
                </span>
              )}
            </label>
            <div className="flex w-[100%] gap-2">
              <label className="flex flex-col w-[70%]">
                <select
                  {...register("client")}
                  placeholder="ALSO"
                  title="Cliente"
                  value={errorsLog.length > 0 ? currentPlace.client : undefined}
                  style={{
                    pointerEvents: errorsLog.length > 0 ? "none" : "auto",
                  }}
                  className={`text-center w-[100%] rounded-full ${
                    errors.client
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                >
                  {places
                    .reduce((clientesUnicos: any, item) => {
                      if (!clientesUnicos.includes(item.client)) {
                        clientesUnicos.push(item.client);
                      }
                      return clientesUnicos;
                    }, [])
                    .map((place: string, index: number) => {
                      return (
                        <option key={index} value={place}>
                          {place}
                        </option>
                      );
                    })}
                </select>
                {errors?.client && (
                  <span className="text-red-600 pl-5">
                    {errors.client.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col w-[30%]">
                <select
                  {...register("abbr")}
                  placeholder="SDB"
                  title="Abreviação do projeto"
                  value={errorsLog.length > 0 ? currentPlace.abbr : undefined}
                  style={{
                    pointerEvents: errorsLog.length > 0 ? "none" : "auto",
                  }}
                  className={`text-center w-[100%] rounded-full ${
                    errors.abbr
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                >
                  {places
                    .reduce((clientesUnicos: any, item) => {
                      if (!clientesUnicos.includes(item.abbr)) {
                        clientesUnicos.push(item.abbr);
                      }
                      return clientesUnicos;
                    }, [])
                    .map((place: string, index: number) => {
                      return (
                        <option key={index} value={place}>
                          {place}
                        </option>
                      );
                    })}
                </select>
                {errors?.abbr && (
                  <span className="text-red-600 pl-5">
                    {errors.abbr.message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex felx-col w-[100%] gap-2">
              <label className="flex flex-col w-[100%]">
                <select
                  {...register("mall")}
                  placeholder="Shopping da Bahia"
                  title="Shopping"
                  value={errorsLog.length > 0 ? currentPlace.mall : undefined}
                  style={{
                    pointerEvents: errorsLog.length > 0 ? "none" : "auto",
                  }}
                  className={`text-center w-[100%] rounded-full ${
                    errors.mall
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                >
                  {places
                    .reduce((clientesUnicos: any, item) => {
                      if (!clientesUnicos.includes(item.mall)) {
                        clientesUnicos.push(item.mall);
                      }
                      return clientesUnicos;
                    }, [])
                    .map((place: string, index: number) => {
                      return (
                        <option key={index} value={place}>
                          {place}
                        </option>
                      );
                    })}
                </select>
                {errors?.mall && (
                  <span className="text-red-600 pl-5">
                    {errors.mall.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col w-[50%]">
                <select
                  {...register("place")}
                  placeholder="Ri Happy"
                  title="Loja"
                  value={errorsLog.length > 0 ? currentPlace.name : undefined}
                  style={{
                    pointerEvents: errorsLog.length > 0 ? "none" : "auto",
                  }}
                  className={`text-center w-[100%] rounded-full ${
                    errors.place
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                >
                  {places
                    .reduce((clientesUnicos: any, item) => {
                      if (!clientesUnicos.includes(item.name)) {
                        clientesUnicos.push(item.name);
                      }
                      return clientesUnicos;
                    }, [])
                    .map((place: string, index: number) => {
                      return (
                        <option key={index} value={place}>
                          {place}
                        </option>
                      );
                    })}
                </select>
                {errors?.place && (
                  <span className="text-red-600 pl-5">
                    {errors.place.message}
                  </span>
                )}
              </label>
            </div>
          </div>
          <div className="flex justify-around">
            <label
              htmlFor="dropzone-file"
              className="w-[45%] flex justify-around max-w-lg flex-col items-center text-center"
            >
              <h2 className="mt-4 text-[1.5rem] text-roxo-primario font-medium tracking-wide">
                Planilha Controle
              </h2>
              <div className="relative px-[1rem] py-[1.2rem] cursor-pointer flex justify-around max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-roxo-primario">
                <p className="mt-[1rem] mb-[.9rem] text-[.9rem] text-roxo-primario opacity-80 tracking-wide">
                  {controlFileName
                    ? controlFileName
                    : "Clique ou arraste para esse campo o arquivo que deseja enviar"}
                </p>
                <HiPlusCircle color="#5F4B8B" size="3.5rem" />
                <input
                  {...register("control_spreadsheet")}
                  id="dropzone-file"
                  type="file"
                  onChange={(event) => handleControlFileChange(event)}
                  formEncType="multipart/form-data"
                  className="absolute left-0 text-[5rem] w-[100%] opacity-0 cursor-pointer"
                />
              </div>
              {errors?.control_spreadsheet && (
                <span className="text-red-600">
                  {errors.control_spreadsheet.message}
                </span>
              )}
            </label>
            <label
              htmlFor="dropzone-file"
              className="w-[45%] flex justify-around max-w-lg flex-col items-center text-center"
            >
              <h2 className="mt-4 text-[1.5rem] text-roxo-primario font-medium tracking-wide">
                Planilha Curador
              </h2>
              <div className="relative px-[1rem] py-[1.2rem] cursor-pointer flex justify-around max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-roxo-primario">
                <p className="mt-[1rem] mb-[.9rem] text-roxo-primario opacity-80 tracking-wide">
                  {curatorFileName
                    ? curatorFileName
                    : "Clique ou arraste para esse campo o arquivo que deseja enviar"}
                </p>
                <HiPlusCircle color="#5F4B8B" size="3.5rem" />
                <input
                  {...register("curator_spreadsheet")}
                  id="dropzone-file"
                  type="file"
                  onChange={(event) => handleCuratorFileChange(event)}
                  formEncType="multipart/form-data"
                  className="absolute left-0 text-[5rem] w-[100%] opacity-0 cursor-pointer"
                />
              </div>
              {errors?.curator_spreadsheet && (
                <span className="text-red-600 ">
                  {errors.curator_spreadsheet.message}
                </span>
              )}
            </label>
          </div>
        </form>
        <div className="mt-[2%] flex gap-3">
          <button
            form="formCompare"
            onClick={() => {
              onSubmit;
            }}
            className="p-[1.5rem] mt-[10%] bg-roxo-primario rounded-full drop-shadow-md"
            title="Enviar"
            type="submit"
          >
            <HiOutlineArrowUpTray color="#FFFFFF" size="2rem" />
          </button>
          <button
            onClick={hideModal}
            className="p-[1.5rem] mt-[10%] bg-roxo-primario rounded-full drop-shadow-md"
            title="Fechar"
          >
            <HiOutlineXMark color="#FFFFFF" size="2rem" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalComparaPlanilha;
