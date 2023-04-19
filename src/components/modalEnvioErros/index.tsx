import Image from "next/image";
import iconRobo from "../../../public/Icon_Robo.svg";
import { IFormEnvioError } from "@/interfaces/form";
import { useData } from "@/providers/dataProvider";
import { HiArrowCircleUp, HiXCircle } from "react-icons/hi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useModal } from "@/providers/modaisProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IErrorLog } from "@/interfaces/errors";

const ModalEnvioErros = () => {
  const { curators, places, errorsTypes, addError } = useData();
  const { hideModal } = useModal();

  const schema = yup.object().shape({
    curator: yup.string().required("Campo Obrigatório"),
    error_type: yup.string().required("Campo Obrigatório"),
    coor: yup
      .string()
      .required("Campo Obrigatório")
      .matches(/^[A-Z]\d{1,3}$/, "Formato inválido. Exemplo: A53"),
    sheet: yup
      .string()
      .required("Campo Obrigatório")
      .matches(/^(SKU|PROD|ESPT)$/),
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
  } = useForm<IFormEnvioError>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormEnvioError> = (data) => {
    const findCurator = () => {
      const curator = curators.find((curador) => curador.name?.toLowerCase() == data.curator.toLowerCase())
      
      return curator?.id
    }
    
    const findErrorType = () => {
      const errorType = errorsTypes.find((error) => data.error_type.toLowerCase().includes(error.title.toLowerCase()))
      
      return errorType
    }
    const idCurator = findCurator()
    const errorType = findErrorType()

  
    if (errorType) {      
      const body: IErrorLog = {
        error_type: errorType,
        coor: data.coor,
        sheet: data.sheet
      }

      addError(body)
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[3rem] w-[25%] h-screen bg-branco-primario drop-shadow-md px-5">
      <Image src={iconRobo} alt="Incone robô de qualidade Shopper" />
      <p className="text-roxo-primario text-[1.8rem] text-center">
        Aqui você pode cadastrar um ou mais erros, tenha certeza de que todas as
        informações estão corretas.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col justify-center items-center w-[90%] ${
          errors ? "gap-2" : "gap-4"
        }`}
      >
        <label className="w-[100%]">
          <input
            {...register("curator")}
            list="curatores"
            placeholder={
              errors.curator ? "Insira o curador responsavel" : "Alex Lanção"
            }
            title="Curador"
            // value dele precisa ser o do provider quando tiver erros no provider da erroLog após envio da planilha (o valor setado deve ser o da resposta da req)
            // ternario para desabilitar e definir o valor do input caso o erroLog.length > 0.
            className={`w-[100%] rounded-full ${
              errors.curator
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          />
          {errors.curator && (
            <span className="text-red-600 pl-5">{errors.curator.message}</span>
          )}
          <datalist id="curatores">
            {curators.map((curator) => {
              return <option key={curator.id} value={curator.name} />;
            })}
          </datalist>
        </label>

        <label className="w-[100%]">
          <input
            {...register("error_type")}
            list="errorTypes"
            placeholder="CODIGO | Codigo Fora do padrão"
            title="Erro cometido"
            className={`w-[100%] rounded-full ${
              errors.error_type
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          />
          {errors.error_type && (
            <span className="text-red-600 pl-5">
              {errors.error_type.message}
            </span>
          )}
          <datalist id="errorTypes">
            {errorsTypes.map((error) => {
              return (
                <option
                  key={error.id}
                  value={`${error.group} | ${error.title}`}
                />
              );
            })}
          </datalist>
        </label>
        <div className="flex w-[100%] gap-2">
          <div className="flex flex-col w-[45%]">
            <input
              {...register("coor")}
              placeholder="A8"
              title="Coordenada onde o erro foi encontrado"
              className={`text-center w-[100%] rounded-full ${
                errors.coor
                  ? "border-red-600 focus:border-red-700"
                  : "border-roxo-primario"
              } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
            />
            {errors?.coor && (
              <span className="text-red-600 pl-5">{errors.coor.message}</span>
            )}
          </div>
          <label className="w-[100%]">
            <input
              {...register("sheet")}
              list="sheet"
              placeholder="SKU"
              title="Pagina onde o erro foi encontrado"
              className={`text-center w-[100%] rounded-full ${
                errors.sheet
                  ? "border-red-600 focus:border-red-700"
                  : "border-roxo-primario"
              } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
            />
            {errors?.sheet && (
              <span className="text-red-600 pl-5">{errors.sheet.message}</span>
            )}
            <datalist id="sheet">
              <option value="SKU">Skus</option>
              <option value="PROD">Produto</option>
              <option value="ESPT">Especificações</option>
            </datalist>
          </label>
        </div>
        <fieldset
          className={`flex flex-col mt-10 ${errors ? "gap-2" : "gap-4"}`}
        >
          <div className="flex w-[100%] gap-2">
            <div className="flex flex-col w-[70%]">
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
            </div>
            <div className="flex flex-col w-[50%]">
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
            </div>
          </div>
          <div className="flex felx-col w-[100%] gap-2">
            <div className="flex flex-col w-[50%]">
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
            </div>
            <div className="flex flex-col w-[50%]">
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
            </div>
          </div>
        </fieldset>

        <div>
          <button
            type="submit"
            title="Enviar"
            className="pt-16 drop-shadow-md"
            
          >
            <HiArrowCircleUp
              color="#5F4B8B"
              size="7rem"
            />
          </button>
          <button
            onClick={hideModal}
            title="Fechar"
            className="pt-16 drop-shadow-md"
          >
            <HiXCircle color="#5F4B8B" size="7rem" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default ModalEnvioErros;
