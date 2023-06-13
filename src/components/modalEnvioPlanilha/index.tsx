import Image from "next/image";
import Icon_Robo from "../../../public/Icon_Robo.svg";
import { HiOutlineShoppingBag, HiOutlineArrowUpTray } from "react-icons/hi2";
import { IFormEnvioError, IFormPlanilha } from "@/interfaces/form";
import { useEffect, useState } from "react";
import { useModal } from "@/providers/modaisProvider";
import { useData } from "@/providers/dataProvider";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ConfirmAction from "../confirmAction";
import { useUser } from "@/providers/userProvider";
import { validateSheet } from "@/services/post";
import { error, info } from "@/utils/toast";
import { ISheerAdjustment, ISheet, ISheetRequest } from "@/interfaces/sheet";
import { verifyToken, findCurator, findPlace } from "@/utils/finds";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { getCurators } from "@/services/get";

const ModalEnvioPlanilha = () => {
  const {
    curators,
    places,
    currentBagPattern,
    currentCurator,
    currentPlace,
    errorsLog,
    excelFile,
    setExcelFile,
    setCurrentCurator,
    setCurrentPlace,
    addError,
    setErrorsLog,
    setResponseFile,
    loadData,
    setRepitedSku,
    setCurators,
  } = useData();
  const { hideModal, openAlert, isAlertOpen, setLoadingScreen } = useModal();
  const { token, setAuth, userData } = useUser();
  const [modality, setModality] = useState<boolean>(false); //false = Manual e true = Sistêmico
  const [submitType, setSubmitType] = useState<boolean>(false); //false = Validação e true = Correção
  const [statusPlace, setStatusPlace] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const router = useRouter();

  const schema = yup.object().shape({
    curator: yup.string().required("Campo Obrigatório"),
    client: yup.string().required("Campo Obrigatório"),
    abbr: yup
      .string()
      .required("Campo obrigatório")
      .max(3, "A abreviação do projeto precisa ter 3 caracteres"),
    mall: yup.string().required("Campo Obrigatório"),
    place: yup.string().required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormPlanilha>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (statusPlace) {
      const makeBody = () => {
        const formData = new FormData();

        formData.append("bag_patterns", JSON.stringify(currentBagPattern));
        formData.append("curator_id", findCurator(curators, data));
        formData.append("modality", modality ? "Sistemico" : "Manual");
        formData.append("is_correcting", JSON.stringify(submitType));
        formData.append(
          "place",
          JSON.stringify({
            client: data.client,
            abbr: data.abbr,
            mall: data.mall,
            name: data.place,
          })
        );
        formData.append("spreadsheet", excelFile!);
        return formData;
      };

      const body = makeBody();
      setLoadingScreen(true);
      info("ESTOU TRABALHANDO NA SUA PLANILHA");
      validateSheet(token || "", body)
        .then((res: void | AxiosResponse<ISheerAdjustment>) => {
          if (res) {
            setErrorsLog(res.data.errors);
            setCurrentCurator(res.data.curator);
            setCurrentPlace(res.data.place_obj);
            setResponseFile(res.data.workbook);
            setRepitedSku(res.data.repeated);
            console.log(res.data.repeated);
            if (res.data.errors.length == 0) {
              return info(
                "SUA PLANILHA FOI VALIDADA E NENHUM ERRO FOI ENCONTRADO"
              );
            } else {
              info("SUA PLANILHA FOI VALIDADA COM SUCESSO!");
            }
          }
        })
        .catch((err) => {
          error("OPS! ALGO DEU ERRADO");
        })
        .finally(() => {
          setStatusPlace(false);
          loadData();
          hideModal();
          setLoadingScreen(false);
        });
    }
    getCurators(token || "", setCurators, userData?.role?.id);
  }, [statusPlace, token]);

  const onSubmit = (data: any) => {
    // verificação de token de usuario.
    data = {
      ...data,

      // curator: "Alex Lanção",
      // client: "ALSO",
      // place: "Ri Happy",
      // mall: "Tijuca",
      // abbr: "SDB",
    };
    const verifyTokenResult = verifyToken(setAuth, hideModal, router);
    if (verifyTokenResult !== true) {
      return;
    }
    setData(data);

    const idCurator = findCurator(curators, data);

    if (idCurator) {
      const place = findPlace(places, data);
      if (!place && !submitType) {
        openAlert();
      } else if (!place && submitType) {
        error(
          "FORNEÇA UM CANAL DE VENDAS EXISTENTE PARA CORREÇÃO DE PLANILHA!"
        );
      } else {
        setStatusPlace(true);
      }
    } else {
      error("EU NÃO CONHEÇO ESSE CURADOR");
    }
  };

  return (
    <>
      {isAlertOpen && (
        <ConfirmAction
          message="O CANAL DE VENDA INFORMADO AINDA NÃO FOI CADASTRADO, DESEJA CADASTRAR ESSE COMO NOVO?"
          setStatus={setStatusPlace}
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-[25%] min-w-[35rem] h-screen bg-branco-primario flex flex-col justify-around items-center z-10 `}
      >
        <Image src={Icon_Robo} alt="Supp"></Image>
        <p className="text-roxo-primario text-3xl text-center p-3">
          Preciso de mais informações antes de validar a planilha.
        </p>
        <div
          className={`flex flex-col justify-center items-center w-[90%] ${
            errors ? "gap-2" : "gap-4"
          }`}
        >
          <label className="w-[80%]">
            <select
              {...register("curator")}
              placeholder={
                errors.curator ? "Insira o curador responsavel" : "Alex Lanção"
              }
              title="Curador"
              className={`w-[100%] rounded-full ${
                errors.curator
                  ? "border-red-600 focus:border-red-700"
                  : "border-roxo-primario"
              } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
            >
              {curators?.map((curator, index) => {
                return (
                  <option key={index} value={curator.name}>
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
          <div className="flex felx-col w-[80%] gap-2">
            <label className="flex flex-col w-[70%]">
              <input
                {...register("client")}
                list="client"
                placeholder="ALSO"
                title="Cliente"
                className={`text-center w-[100%] rounded-full ${
                  errors.client
                    ? "border-red-600 focus:border-red-700"
                    : "border-roxo-primario"
                } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
              />
              {errors?.client && (
                <span className="text-red-600 pl-5">
                  {errors.client.message}
                </span>
              )}
              <datalist id="client">
                {places
                  .reduce((clientesUnicos: any, item) => {
                    if (!clientesUnicos.includes(item.client)) {
                      clientesUnicos.push(item.client);
                    }
                    return clientesUnicos;
                  }, [])
                  .map((place: string, index: number) => {
                    return <option key={index} value={place} />;
                  })}
              </datalist>
            </label>
            <label className="flex flex-col w-[50%]">
              <input
                {...register("abbr")}
                list="abbr"
                placeholder="SDB"
                title="Abreviação do projeto"
                className={`text-center w-[100%] rounded-full ${
                  errors.abbr
                    ? "border-red-600 focus:border-red-700"
                    : "border-roxo-primario"
                } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
              />
              {errors?.abbr && (
                <span className="text-red-600 pl-5">{errors.abbr.message}</span>
              )}
              <datalist id="abbr">
                {places
                  .reduce((clientesUnicos: any, item) => {
                    if (!clientesUnicos.includes(item.abbr)) {
                      clientesUnicos.push(item.abbr);
                    }
                    return clientesUnicos;
                  }, [])
                  .map((place: string, index: number) => {
                    return <option key={index} value={place} />;
                  })}
              </datalist>
            </label>
          </div>
          <div className="flex felx-col w-[80%] gap-2">
            <label className="flex flex-col w-[50%]">
              <input
                {...register("mall")}
                list="mall"
                placeholder="Shopping da Bahia"
                title="Shopping"
                className={`text-center w-[100%] rounded-full ${
                  errors.mall
                    ? "border-red-600 focus:border-red-700"
                    : "border-roxo-primario"
                } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
              />
              {errors?.mall && (
                <span className="text-red-600 pl-5">{errors.mall.message}</span>
              )}
              <datalist id="mall">
                {places
                  .reduce((clientesUnicos: any, item) => {
                    if (!clientesUnicos.includes(item.mall)) {
                      clientesUnicos.push(item.mall);
                    }
                    return clientesUnicos;
                  }, [])
                  .map((place: string, index: number) => {
                    return <option key={index} value={place} />;
                  })}
              </datalist>
            </label>
            <label className="flex flex-col w-[50%]">
              <input
                {...register("place")}
                list="place"
                placeholder="Ri Happy"
                title="Loja"
                className={`text-center w-[100%] rounded-full ${
                  errors.place
                    ? "border-red-600 focus:border-red-700"
                    : "border-roxo-primario"
                } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
              />
              {errors?.place && (
                <span className="text-red-600 pl-5">
                  {errors.place.message}
                </span>
              )}
              <datalist id="place">
                {places
                  .reduce((clientesUnicos: any, item) => {
                    if (!clientesUnicos.includes(item.name)) {
                      clientesUnicos.push(item.name);
                    }
                    return clientesUnicos;
                  }, [])
                  .map((place: string, index: number) => {
                    return <option key={index} value={place} />;
                  })}
              </datalist>
            </label>
          </div>
        </div>
        <div className="w-[85%] items-center flex flex-col">
          <div className="flex items-end gap-3">
            <HiOutlineShoppingBag size="3rem" color="#5F4B8B" />
            <h2 className="text-3xl text-roxo-primario">Padrão de Sacola</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 w-[100%]">
            <div>
              <p className="text-roxo-primario text-opacity-35 text-3xl opacity-60">
                IVA
              </p>
              <p className="text-roxo-primario text-opacity-35 text-3xl opacity-60">
                Peso
              </p>
              <p className="text-roxo-primario text-opacity-35 text-3xl opacity-60">
                Altura
              </p>
              <p className="text-roxo-primario text-opacity-35 text-3xl opacity-60">
                Largura
              </p>
              <p className="text-roxo-primario text-opacity-35 text-3xl opacity-60">
                Comprimento
              </p>
            </div>
            <div>
              <p className="text-roxo-primario text-opacity-35 text-3xl text-right opacity-60">
                {currentBagPattern.iva}
              </p>
              <p className="text-roxo-primario text-opacity-35 text-3xl text-right opacity-60">
                {currentBagPattern.weight}g
              </p>
              <p className="text-roxo-primario text-opacity-35 text-3xl text-right opacity-60">
                {currentBagPattern.height}cm
              </p>
              <p className="text-roxo-primario text-opacity-35 text-3xl text-right opacity-60">
                {currentBagPattern.width}cm
              </p>
              <p className="text-roxo-primario text-opacity-35 text-3xl text-right opacity-60">
                {currentBagPattern.length}cm
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setModality(!modality)}
          className="flex items-center space-x-2 mt-2 drop-shadow-md rounded-full w-[80%] cursor-pointer  bg-branco-primario box-border"
        >
          <div
            className={` w-[50rem] py-[1rem] ${
              !modality ? "bg-roxo-primario" : "bg-branco-primario"
            } rounded-full text-3xl text-center p-[1.5rem] box-border`}
          >
            <p
              className={`text-3xl ${
                modality ? "text-roxo-primario " : "text-branco-primario"
              }`}
            >
              Manual
            </p>
          </div>
          <div
            className={`w-[50rem] py-[1rem] ${
              !modality ? "bg-branco-primario" : "bg-roxo-primario"
            } rounded-full text-center p-[1.5rem] box-border`}
          >
            <p
              className={`text-3xl ${
                modality ? "text-branco-primario" : "text-roxo-primario"
              } `}
            >
              Sistêmico
            </p>
          </div>
        </div>

        <div
          onClick={() => setSubmitType(!submitType)}
          className="flex items-center space-x-2 mt-2 drop-shadow-md rounded-full w-[80%] cursor-pointer  bg-branco-primario box-border"
        >
          <div
            className={` w-[50rem] py-[1rem] ${
              !submitType ? "bg-roxo-primario" : "bg-branco-primario"
            } rounded-full text-3xl text-center p-[1.5rem] box-border`}
          >
            <p
              className={`text-3xl ${
                submitType ? "text-roxo-primario " : "text-branco-primario"
              }`}
            >
              Validação
            </p>
          </div>
          <div
            className={`w-[50rem] py-[1rem] ${
              !submitType ? "bg-branco-primario" : "bg-roxo-primario"
            } rounded-full text-center p-[1.5rem] box-border`}
          >
            <p
              className={`text-3xl ${
                submitType ? "text-branco-primario" : "text-roxo-primario"
              } `}
            >
              Correção
            </p>
          </div>
        </div>
        <button
          className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
          title="Enviar"
        >
          <HiOutlineArrowUpTray color="#FFFFFF" size="2.7rem" />
        </button>
      </form>
    </>
  );
};
export default ModalEnvioPlanilha;
