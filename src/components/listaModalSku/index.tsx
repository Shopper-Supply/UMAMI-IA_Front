import { IRepitedSku, ISheet } from "@/interfaces/sheet";
import { useData } from "@/providers/dataProvider";
import { useUser } from "@/providers/userProvider";
import { deleteSku } from "@/services/delete";
import { extractDate } from "@/utils/formatData";
import { error, info } from "@/utils/toast";
import { useState } from "react";
import { HiPencil, HiCheck, HiOutlineTrash } from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormRepitedSku } from "@/interfaces/form";
import { verifyToken } from "@/utils/finds";
import { useModal } from "@/providers/modaisProvider";
import { useRouter } from "next/router";
import { InformationEvent } from "http";

interface IListaModalSku {
  data: IRepitedSku;
  key: number;
  currentIndex: number;
  DeleteItemFromRepitedOptions: (
    indexAll: number,
    indexCurrent: number
  ) => void;
  selectedRepited: number;
  currentRepitedOptionsLength: number;
  currentRepitedOptions: IRepitedSku[];
  setCurrentRepitedOptions: React.Dispatch<React.SetStateAction<IRepitedSku[]>>;
}

const ListaModalSku = ({
  data,
  currentIndex,
  DeleteItemFromRepitedOptions,
  selectedRepited,
  currentRepitedOptionsLength,
  currentRepitedOptions,
  setCurrentRepitedOptions,
}: IListaModalSku) => {
  const { currentCurator, currentPlace } = useData();
  const {
    product_name,
    sku_code,
    brand,
    category_code,
    curator,
    client,
    mall,
    abbr,
    place,
    created_at,
    ean,
    product_code,
    updated_at,
  } = data;
  const dataForm = {
    product_name,
    sku_code,
    brand,
    category_code,
    curator,
    client,
    mall,
    created_at,
    abbr,
    place,
    ean,
    product_code,
    updated_at,
  };
  const { token, setAuth } = useUser();
  const { hideModal, openAlert, isAlertOpen } = useModal();
  const router = useRouter();

  const [was_edited, setWas_edited] = useState<boolean>(false);
  const [SKUItem_isActive, setSKUItem_isActive] = useState<boolean>(false);
  const [dataSku, setDataSku] = useState<IRepitedSku>(currentRepitedOptions[0]);

  const destroySku = (id: string, key: number) => {
    deleteSku(token, id)
      .then((res) => {
        info("SKU DELETADO COM SUCESSO");
        return;
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  };

  const schema = yup.object().shape({
    product_name: yup.string().required("Campo Obrigatório"),
    sku_code: yup.string().required("Campo Obrigatorio"),
    brand: yup.string().required("Campo Obrigatório"),
    category_code: yup.number().required("Campo Obrigatorio"),
    curator: yup.string().required("Campo Obrigatório"),
    client: yup.string().required("Campo Obrigatório"),
    mall: yup.string().required("Campo Obrigatório"),
    created_at: yup.string().required("Campo Obrigatorio"),
    abbr: yup
      .string()
      .required("Campo obrigatório")
      .max(3, "A abreviação do projeto precisa ter 3 caracteres"),
    place: yup.string().required("Campo Obrigatório"),
    ean: yup.number().required("Campo Obrigatorio"),
    product_code: yup.number().required("Campo Obrigatorio"),
    updated_at: yup.string().required("Campo Obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRepitedSku>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IRepitedSku> = (dataYup, el) => {
    // verificação de token de usuario.
    const verifyTokenResult = verifyToken(setAuth, hideModal, router);
    if (verifyTokenResult !== true) {
      return;
    }
    const editedCurrentRepitedOptions = currentRepitedOptions.filter((e) => {
      console.log("Elemento", e.id);
      console.log("Data", data.id);
      if (data.id != e.id) {
        return e;
      }
      return;
    });
    console.log(editedCurrentRepitedOptions);
    setCurrentRepitedOptions([...editedCurrentRepitedOptions, dataYup]);

    setSKUItem_isActive(!SKUItem_isActive);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex justify-around w-[100%] bg-branco-secundario rounded-[5px] hover:drop-shadow-lg transition-all ${
        SKUItem_isActive ? "min-h-[25rem] pt-10" : "min-h-[10vh] items-center"
      }`}
    >
      <div>
        <div
          onClick={() => setWas_edited(!was_edited)}
          className={`w-[2rem] h-[2rem] rounded-full cursor-pointer transition-all ${
            was_edited ? "bg-severity-2" : "bg-cinza-primario"
          }`}
        ></div>
      </div>
      <div className="flex flex-col justify-center w-[75%] gap-3">
        {SKUItem_isActive ? (
          <input
            {...register("product_name")}
            type="text"
            defaultValue={data.product_name}
            placeholder={
              errors.product_name
                ? "Insira o nome do produto"
                : data.product_name
            }
            className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
              errors.product_name
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          />
        ) : (
          <p className="text-[1.2rem] font-medium text-roxo-secundario">
            {data.product_name}
          </p>
        )}
        <div className=" flex justify-between  w-[100%] transition-all">
          <div className="flex justify-between w-[100%] ">
            <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
              CODIGO SKU:{" "}
              {SKUItem_isActive ? (
                <input
                  {...register("sku_code")}
                  type="text"
                  defaultValue={data.sku_code}
                  placeholder={
                    errors.sku_code ? "Insira o código do sku" : data.sku_code
                  }
                  className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                    errors.sku_code
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
              ) : (
                <p className="text-[1.2rem] font-medium">{data.sku_code}</p>
              )}
            </label>
            <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
              MARCA:{" "}
              {SKUItem_isActive ? (
                <input
                  {...register("brand")}
                  placeholder={errors.brand ? "Insira a marca" : data.brand}
                  type="text"
                  defaultValue={data.brand}
                  className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                    errors.brand
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
              ) : (
                <p className="text-[1.2rem] font-medium">{data.brand}</p>
              )}
            </label>
          </div>
        </div>
        <div
          className={`flex justify-between  w-[100%] transition-all ${
            !SKUItem_isActive && "hidden"
          }`}
        >
          <div className="flex justify-between w-[100%]">
            {SKUItem_isActive && (
              <label className="flex justify-between w-[50%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                CÓD. CATEGORIA:{" "}
                <input
                  {...register("category_code")}
                  placeholder={
                    errors.category_code
                      ? "Insira o código da categoria"
                      : data.category_code
                  }
                  type="text"
                  defaultValue={data.category_code}
                  className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                    errors.category_code
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
              </label>
            )}
            {SKUItem_isActive && (
              <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
                CURADOR:{" "}
                <input
                  {...register("curator")}
                  placeholder={
                    errors.curator
                      ? "Insira o nome do curador"
                      : currentCurator.name
                  }
                  type="text"
                  defaultValue={currentCurator.name}
                  className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                    errors.curator
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
              </label>
            )}
          </div>
        </div>
        <div
          className={`flex justify-between  w-[100%] transition-all ${
            !SKUItem_isActive && "hidden"
          }`}
        >
          <div className="flex justify-between w-[100%]">
            <div className="flex justify-between w-[60%]">
              {SKUItem_isActive && (
                <label className="flex justify-start w-[48%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                  CLIENTE:{" "}
                  <input
                    {...register("client")}
                    placeholder={
                      errors.client
                        ? "Insira o nome do cliente"
                        : currentPlace.client
                    }
                    type="text"
                    defaultValue={currentPlace.client}
                    className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                      errors.client
                        ? "border-red-600 focus:border-red-700"
                        : "border-roxo-primario"
                    } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                  />
                </label>
              )}
              {SKUItem_isActive && (
                <label className="flex justify-start w-[48%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                  SHOPPING:{" "}
                  <input
                    {...register("mall")}
                    placeholder={
                      errors.mall ? "Insira o shopping" : currentPlace.mall
                    }
                    type="text"
                    defaultValue={currentPlace.mall}
                    className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                      errors.mall
                        ? "border-red-600 focus:border-red-700"
                        : "border-roxo-primario"
                    } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                  />
                </label>
              )}
            </div>
            {SKUItem_isActive && (
              <label className="flex justify-end items-center text-[1.2rem] font-semibold text-roxo-secundario">
                ENVIO:{" "}
                <input
                  {...register("created_at")}
                  placeholder={
                    errors.created_at
                      ? "Insira a data de criação"
                      : data.created_at
                  }
                  type="text"
                  defaultValue={extractDate(data.created_at)}
                  className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                    errors.created_at
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
                <span>{errors.created_at?.message}</span>
              </label>
            )}
          </div>
        </div>

        <div
          className={`flex justify-between  w-[100%] transition-all ${
            !SKUItem_isActive && "hidden"
          }`}
        >
          <div className="flex justify-between w-[100%]">
            <div className="flex justify-between w-[60%]">
              {SKUItem_isActive && (
                <label className="flex justify-start w-[30%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                  ABBR:{" "}
                  <input
                    {...register("abbr")}
                    placeholder={
                      errors.abbr ? "Insira o abbr" : currentPlace.abbr
                    }
                    type="text"
                    defaultValue={currentPlace.abbr}
                    className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                      errors.abbr
                        ? "border-red-600 focus:border-red-700"
                        : "border-roxo-primario"
                    } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                  />
                </label>
              )}
              {SKUItem_isActive && (
                <label className="flex justify-start w-[48%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                  LOJA:{" "}
                  <input
                    {...register("place")}
                    placeholder={
                      errors.place ? "Insira a loja" : currentPlace.name
                    }
                    type="text"
                    defaultValue={currentPlace.name}
                    className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                      errors.place
                        ? "border-red-600 focus:border-red-700"
                        : "border-roxo-primario"
                    } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                  />
                </label>
              )}
            </div>
            {SKUItem_isActive && (
              <label className="flex justify-end items-center text-[1.2rem] font-semibold text-roxo-secundario">
                EAN:{" "}
                <input
                  {...register("ean")}
                  placeholder={errors.ean ? "Insira o código ean" : data.ean}
                  type="text"
                  defaultValue={data.ean}
                  className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                    errors.ean
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
              </label>
            )}
          </div>
        </div>
        <div
          className={`flex justify-between  w-[100%] transition-all ${
            !SKUItem_isActive && "hidden"
          }`}
        >
          <div className="flex justify-between w-[100%]">
            {SKUItem_isActive && (
              <label className="flex justify-between w-[50%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                CÓD. PRODUTO:{" "}
                <input
                  {...register("product_code")}
                  placeholder={
                    errors.ean
                      ? "Insira o código do produto"
                      : data.product_code
                  }
                  type="text"
                  defaultValue={data.product_code}
                  className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                    errors.product_code
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
              </label>
            )}
            {SKUItem_isActive && (
              <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
                ULTIMA ALTERAÇÃO:{" "}
                <input
                  {...register("updated_at")}
                  placeholder={
                    errors.updated_at
                      ? "Insira a data de atualização"
                      : data.updated_at
                  }
                  type="text"
                  defaultValue={data.updated_at}
                  className={`bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none ${
                    errors.updated_at
                      ? "border-red-600 focus:border-red-700"
                      : "border-roxo-primario"
                  } px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
                />
              </label>
            )}
          </div>
        </div>
      </div>
      <div>
        {SKUItem_isActive ? (
          <div className="flex gap-3">
            <button
              type="submit"
              // onClick={() => setSKUItem_isActive(!SKUItem_isActive)}
              title="Salvar alteraçoes"
              className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer transition-all"
            >
              <HiCheck size="1.5rem" />
            </button>
            <div
              onClick={() => {
                if (currentRepitedOptionsLength > 1) {
                  data.id && destroySku(data.id, currentIndex);
                  DeleteItemFromRepitedOptions(selectedRepited, currentIndex);
                } else {
                  error("INFELIZMENTE VOCÊ NÃO PODE APAGAR O ULTIMO SKU");
                }
              }}
              title="Editar SKU"
              className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer transition-all"
            >
              <HiOutlineTrash size="1.5rem" />
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <div
              onClick={() => setSKUItem_isActive(!SKUItem_isActive)}
              title="Editar SKU"
              className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer transition-all"
            >
              <HiPencil size="1.5rem" />
            </div>{" "}
            <div
              onClick={() => {
                if (currentRepitedOptionsLength > 1) {
                  data.id && destroySku(data.id, currentIndex);
                  DeleteItemFromRepitedOptions(selectedRepited, currentIndex);
                } else {
                  error("INFELIZMENTE VOCÊ NÃO PODE APAGAR O ULTIMO SKU");
                }
              }}
              title="Editar SKU"
              className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer transition-all"
            >
              <HiOutlineTrash size="1.5rem" />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default ListaModalSku;
