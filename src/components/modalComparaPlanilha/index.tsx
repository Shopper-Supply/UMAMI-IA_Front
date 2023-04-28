import Image from "next/image";
import iconRobo from "../../../public/Icon_Robo.svg";

import { IFormCompareSheets } from "@/interfaces/form";

import { useData } from "@/providers/dataProvider";
import { useModal } from "@/providers/modaisProvider";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { findCurator, findPlace } from "@/utils/finds";
import { useEffect, useState } from "react";
import { createPlace } from "@/services/post";
import { useUser } from "@/providers/userProvider";
import { IPlace } from "@/interfaces/place";
import { AxiosResponse } from "axios";
import ConfirmAction from "../confirmAction";
import { error } from "@/utils/toast";

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
  });

  const {
    curators,
    places,
    errorsTypes,
    errorsLog,
    currentCurator,
    currentPlace,
    addError,
    setCurrentCurator,
    setCurrentPlace,
  } = useData();
  const { hideModal, openAlert, isAlertOpen } = useModal();
  const { token } = useUser();
  const [statusPlace, setstatusPlace] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormCompareSheets>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (statusPlace) {
      createPlace(token || "", data)
        .then((res: void | AxiosResponse<IPlace>) => {
          if (res) {
            setCurrentPlace(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          error("OPS! ALGO DEU ERRADO");
        })
        .finally(() => {
          setstatusPlace(false);
          hideModal();
        });
    }
  }, [data, token, statusPlace]);

  // SubmitHandler<IFormCompareSheets>
  const onSubmit = (data: IFormCompareSheets) => {
    const idCurator = findCurator(curators, data);

    if (idCurator) {
      const place = findPlace(places, data);
      if (!place) {
        openAlert();
      } else {
        setData(data);
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
          setStatus={setstatusPlace}
        />
      )}
      <div className="z-30">
        <div>
          <Image src={iconRobo} alt="icon robô de qualidade." />
          <p>Compare se informações foram violadas.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex w-[100%] gap-2">
              <label className="flex flex-col w-[70%]">
                <input
                  {...register("client")}
                  list="client"
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
                  value={errorsLog.length > 0 ? currentPlace.abbr : undefined}
                  style={{
                    pointerEvents: errorsLog.length > 0 ? "none" : "auto",
                  }}
                  className={`text-center w-[100%] rounded-full ${
                    errors.abbr
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
                {errors?.abbr && (
                  <span className="text-red-600 pl-5">
                    {errors.abbr.message}
                  </span>
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
            <div className="flex felx-col w-[100%] gap-2">
              <label className="flex flex-col w-[50%]">
                <input
                  {...register("mall")}
                  list="mall"
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
                />
                {errors?.mall && (
                  <span className="text-red-600 pl-5">
                    {errors.mall.message}
                  </span>
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
                  value={errorsLog.length > 0 ? currentPlace.name : undefined}
                  style={{
                    pointerEvents: errorsLog.length > 0 ? "none" : "auto",
                  }}
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
          <div>
            <label>
              Planilha de Controle
              <input type="file" />
            </label>
            <label>
              Planilha do Curador
              <input type="file" />
            </label>
          </div>
          <button>Enviar</button>
        </form>
      </div>
    </>
  );
};

export default ModalComparaPlanilha;
