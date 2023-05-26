import { IRepitedSku } from "@/interfaces/sheet";
import { useData } from "@/providers/dataProvider";
import { useUser } from "@/providers/userProvider";
import { deleteSku } from "@/services/delete";
import { extractDate } from "@/utils/formatData";
import { info } from "@/utils/toast";
import { useState } from "react";
import { HiPencil, HiCheck, HiOutlineTrash } from "react-icons/hi";

interface IListaModalSku {
  data: IRepitedSku;
  key: number;
  setIdToDelete: React.Dispatch<React.SetStateAction<string>>;
  currentRepitedOptions: IRepitedSku[];
  setCurrentRepitedOptions: React.Dispatch<React.SetStateAction<IRepitedSku[]>>;
  updateRepitedSku: () => void;
}

const ListaModalSku = ({
  data,
  key,
  setIdToDelete,
  currentRepitedOptions,
  setCurrentRepitedOptions,
  updateRepitedSku,
}: IListaModalSku) => {
  const [was_edited, setWas_edited] = useState<boolean>(false);
  const { currentCurator, currentPlace } = useData();
  const [SKUItem_isActive, setSKUItem_isActive] = useState<boolean>(false);
  const { token } = useUser();

  const destroySku = (id: string, key: number) => {
    deleteSku(token, id)
      .then((res) => {
        const optionsFilted = currentRepitedOptions?.filter(
          (option) => option.id != id
        );
        console.log(optionsFilted);
        info(`SKU ${data.sku_code} DELETADO COM SUCESSO`);
        setCurrentRepitedOptions(optionsFilted);
        updateRepitedSku();
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  };

  return (
    <form
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
            type="text"
            defaultValue={data.product_name}
            className="bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
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
                  type="text"
                  defaultValue={data.sku_code}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              ) : (
                <p className="text-[1.2rem] font-medium">{data.sku_code}</p>
              )}
            </label>
            <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
              MARCA:{" "}
              {SKUItem_isActive ? (
                <input
                  type="text"
                  defaultValue={data.brand}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[10rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              ) : (
                <p className="text-[1.2rem] font-medium">{data.seller_name}</p>
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
                  type="text"
                  defaultValue={data.category_code}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              </label>
            )}
            {SKUItem_isActive && (
              <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
                CURADOR:{" "}
                <input
                  type="text"
                  value={currentCurator.name}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[10rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
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
                    type="text"
                    value={currentPlace.client}
                    className="ml-2 bg-branco-secundario rounded-full w-[100%] px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
              {SKUItem_isActive && (
                <label className="flex justify-start w-[48%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                  SHOPPING:{" "}
                  <input
                    type="text"
                    value={currentPlace.mall}
                    className="ml-2 bg-branco-secundario rounded-full w-[100%] px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
            </div>
            {SKUItem_isActive && (
              <label className="flex justify-end items-center text-[1.2rem] font-semibold text-roxo-secundario">
                ENVIO:{" "}
                <input
                  type="text"
                  value={extractDate(data.created_at)}
                  className="ml-2 bg-branco-secundario rounded-full w-[45%] px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
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
                <label className="flex justify-start w-[30%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                  ABBR:{" "}
                  <input
                    type="text"
                    value={currentPlace.abbr}
                    className="ml-2 bg-branco-secundario rounded-full w-[100%] px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
              {SKUItem_isActive && (
                <label className="flex justify-start w-[48%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                  LOJA:{" "}
                  <input
                    type="text"
                    value={currentPlace.name}
                    className="ml-2 bg-branco-secundario rounded-full w-[100%] px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                  />
                </label>
              )}
            </div>
            {SKUItem_isActive && (
              <label className="flex justify-end items-center text-[1.2rem] font-semibold text-roxo-secundario">
                EAN:{" "}
                <input
                  type="text"
                  value={data.ean}
                  className="ml-2 bg-branco-secundario rounded-full w-[100%] px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
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
                  type="text"
                  defaultValue={data.product_code}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              </label>
            )}
            {SKUItem_isActive && (
              <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
                ULTIMA ALTERAÇÃO:{" "}
                <input
                  type="text"
                  value={data.updated_at}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[10rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              </label>
            )}
          </div>
        </div>
      </div>
      <div>
        {SKUItem_isActive ? (
          <div className="flex gap-3">
            <div
              onClick={() => setSKUItem_isActive(!SKUItem_isActive)}
              title="Editar SKU"
              className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer transition-all"
            >
              <HiCheck size="1.5rem" />
            </div>
            <div
              onClick={() => {
                destroySku(data.id, key);
                setIdToDelete(data.id);
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
                destroySku(data.id, key);
                setIdToDelete(data.id);
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
