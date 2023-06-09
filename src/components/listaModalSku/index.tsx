import { IRepitedSku, ISheet } from "@/interfaces/sheet";
import { useData } from "@/providers/dataProvider";
import { useUser } from "@/providers/userProvider";
import { deleteSku } from "@/services/delete";
import { extractDate } from "@/utils/formatData";
import { error, info } from "@/utils/toast";
import { useState } from "react";
import {
  HiPencil,
  HiCheck,
  HiOutlineTrash,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
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

  return (
    <div
      className={`flex justify-around w-[100%] bg-branco-secundario rounded-[5px] hover:drop-shadow-lg transition-all ${
        SKUItem_isActive ? "min-h-[35rem] pt-6" : "min-h-[13vh] items-center"
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
        <label className="flex flex-col justify-between items-center text-[.9rem] font-semibold text-roxo-secundario">
          <span className="px-2 z-10 w-30 translate-y-2 bg-branco-secundario">
            PRODUTO:{" "}
          </span>
          {SKUItem_isActive ? (
            <input
              disabled
              type="text"
              defaultValue={data.product_name}
              className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
            />
          ) : (
            <p className="text-[1.2rem] font-medium text-roxo-secundario">
              {data.product_name}
            </p>
          )}
        </label>
        <div className=" flex justify-center w-[100%] transition-all">
          <div className="flex justify-around w-[100%] ">
            <label className="flex flex-col w-[45%] justify-between items-center text-[.9rem] font-semibold text-roxo-secundario">
              <span className="px-2 z-10 w-30  translate-y-2 bg-branco-secundario">
                CODIGO SKU:{" "}
              </span>
              {SKUItem_isActive ? (
                <input
                  disabled
                  type="text"
                  value={data.sku_code}
                  className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              ) : (
                <p className="text-[1.2rem] font-medium">{data.sku_code}</p>
              )}
            </label>
            <label className="flex flex-col w-[45%] justify-between items-center text-[0.9rem] font-semibold text-roxo-secundario">
              <span className="px-2 z-10 w-30  translate-y-2 bg-branco-secundario">
                MARCA:{" "}
              </span>
              {SKUItem_isActive ? (
                <input
                  disabled
                  type="text"
                  value={data.brand}
                  className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              ) : (
                <p className="text-[1.2rem] font-medium">{data.brand}</p>
              )}
            </label>
          </div>
        </div>
        <div
          className={`flex justify-between w-[100%] transition-all ${
            !SKUItem_isActive && "hidden"
          }`}
        >
          <div className="flex justify-around w-[100%]">
            {SKUItem_isActive && (
              <label className="flex flex-col justify-between w-[45%] items-center text-[0.9rem] font-semibold text-roxo-secundario">
                <span className="px-2 z-10 w-30  translate-y-2 bg-branco-secundario">
                  CÓD. CATEGORIA:{" "}
                </span>
                <input
                  disabled
                  type="text"
                  value={data.category_code}
                  className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              </label>
            )}
            {SKUItem_isActive && (
              <label className="flex flex-col w-[45%] justify-between items-center text-[0.9rem] font-semibold text-roxo-secundario">
                <span className="px-2 z-10 w-30  translate-y-2 bg-branco-secundario">
                  CURADOR:{" "}
                </span>
                <input
                  disabled
                  type="text"
                  value={currentCurator.name}
                  className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              </label>
            )}
          </div>
        </div>
        <div
          className={`flex flex-col justify-between w-[100%] transition-all ${
            !SKUItem_isActive && "hidden"
          }`}
        >
          <div className="flex justify-between w-[100%]">
            <div className="flex justify-around w-[100%]">
              {SKUItem_isActive && (
                <label className="flex flex-col justify-start w-[45%] items-center text-[0.9rem] font-semibold text-roxo-secundario">
                  <span className="px-2 z-10 w-30  translate-y-2 bg-branco-secundario">
                    CLIENTE:{" "}
                  </span>
                  <input
                    disabled
                    type="text"
                    value={currentPlace.client}
                    className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
              {SKUItem_isActive && (
                <label className="flex flex-col justify-start w-[45%] items-center text-[0.9rem] font-semibold text-roxo-secundario">
                  <span className="px-2 z-10 w-30 translate-y-2 bg-branco-secundario">
                    SHOPPING:{" "}
                  </span>
                  <input
                    disabled
                    type="text"
                    value={currentPlace.mall}
                    className=" py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
            </div>
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
                <label className="flex flex-col justify-end items-center text-[0.9rem] font-semibold text-roxo-secundario">
                  <span className="px-2 z-10 w-30  translate-y-2 bg-branco-secundario">
                    ABBR:{" "}
                  </span>
                  <input
                    disabled
                    type="text"
                    value={currentPlace.abbr}
                    className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
              {SKUItem_isActive && (
                <label className="flex flex-col justify-end items-center text-[0.9rem] font-semibold text-roxo-secundario">
                  <span className="px-2 z-10 w-30  translate-y-2 bg-branco-secundario">
                    LOJA:{" "}
                  </span>
                  <input
                    disabled
                    type="text"
                    defaultValue={currentPlace.name}
                    className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
            </div>
            <div className="flex justify-between w-[60%]">  
              {SKUItem_isActive && (
                <label className="flex flex-col justify-end items-center text-[0.9rem] font-semibold text-roxo-secundario">
                  <span className="px-2 z-10 w-30  translate-y-2 bg-branco-secundario">
                    ENVIO:{" "}
                  </span>
                  <input
                    disabled
                    type="text"
                    value={extractDate(data.created_at)}
                    className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
              {SKUItem_isActive && (
                <label className="flex flex-col justify-end items-center text-[0.9rem] font-semibold text-roxo-secundario">
                  <span className="px-2 z-10 w-30 translate-y-2 bg-branco-secundario">
                    EAN:{" "}
                  </span>
                  <input
                    disabled
                    type="text"
                    value={data.ean}
                    className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
        <div
          className={`flex justify-between  w-[100%] transition-all ${
            !SKUItem_isActive && "hidden"
          }`}
        >
          <div className="flex justify-around w-[100%]">
            {SKUItem_isActive && (
              <label className="flex flex-col justify-between w-[45%] items-center text-[0.9rem] font-semibold text-roxo-secundario">
                <span className="px-2 z-10 w-30 translate-y-2 bg-branco-secundario">
                  CÓD. PRODUTO:{" "}
                </span>
                <input
                  disabled
                  type="text"
                  value={data.product_code}
                  className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              </label>
            )}
            {SKUItem_isActive && (
              <label className="flex flex-col justify-between w-[45%] items-center text-[0.9rem] font-semibold text-roxo-secundario">
                <span className="px-2 z-10 w-30 translate-y-2 bg-branco-secundario">
                  ULTIMA ALTERAÇÃO:{" "}
                </span>
                <input
                  disabled
                  type="text"
                  defaultValue={data.updated_at}
                  className="py-6 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[100%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
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
              onClick={() => setSKUItem_isActive(!SKUItem_isActive)}
              title="Salvar alteraçoes"
              className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer transition-all"
            >
              <HiChevronUp size="1.5rem" />
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
              <HiChevronDown size="1.5rem" />
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
    </div>
  );
};

export default ListaModalSku;
