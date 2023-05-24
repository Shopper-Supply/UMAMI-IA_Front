import { useState } from "react";
import { HiPencil, HiCheck } from "react-icons/hi";

const ListaModalSku = () => {
  const [SKUItem_isActive, setSKUItem_isActive] = useState<boolean>(false);
  const [was_edited, setWas_edited] = useState<boolean>(false);

  return (
    <div
      className={`flex justify-around w-[100%] bg-branco-secundario rounded-[5px] hover:drop-shadow-lg transition-all ${
        SKUItem_isActive ? "min-h-[40rem] pt-10" : "min-h-[10vh] items-center"
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
      <div className="flex flex-col items-center w-[75%] gap-3">
        {SKUItem_isActive ? (
          <input
            type="text"
            value={
              "Produto ABA da Com variação cor arcoiris colorido de unicornios voadores"
            }
            className="bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[90%] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
          />
        ) : (
          <p className="text-[1.2rem] font-medium text-roxo-secundario">
            Produto ABA da Com variação cor arcoiris colorido de unicornios
            voadores
          </p>
        )}
        <div className=" flex justify-between  w-[100%] transition-all">
          <div className="flex justify-between w-[100%]">
            <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
              CODIGO SKU:{" "}
              {SKUItem_isActive ? (
                <input
                  type="text"
                  value={"ldsfgg74585265522"}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              ) : (
                <p className="text-[1.2rem] font-medium">{`3740d49451dg7gg4h4d`}</p>
              )}
            </label>
            <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
              SELLER:{" "}
              {SKUItem_isActive ? (
                <input
                  type="text"
                  value={"World Free"}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[10rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              ) : (
                <p className="text-[1.2rem] font-medium">World Free</p>
              )}
            </label>
          </div>
        </div>
        <div className=" flex justify-between  w-[100%] transition-all">
          <div className="flex justify-between w-[100%]">
            {SKUItem_isActive && (
              <label className="flex justify-between w-[50%] items-center text-[1.2rem] font-semibold text-roxo-secundario">
                CÓD. CATEGORIA:{" "}
                <input
                  type="text"
                  value={"ldsfgg74585265522"}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              </label>
            )}
            {SKUItem_isActive && (
              <label className="flex justify-between items-center text-[1.2rem] font-semibold text-roxo-secundario">
                CURADOR:{" "}
                <input
                  type="text"
                  value={"World Free"}
                  className="ml-2 bg-branco-secundario rounded-full px-[1rem] border-[.2rem] h-[2.5rem] w-[10rem] text-[1.2rem] font-medium text-roxo-primario border-roxo-primario focus:border-roxo-primario focus:outline-none"
                />
              </label>
            )}
          </div>
        </div>
      </div>
      <div>
        {SKUItem_isActive ? (
          <div
            onClick={() => setSKUItem_isActive(!SKUItem_isActive)}
            title="Editar SKU"
            className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer transition-all"
          >
            <HiCheck size="2rem" />
          </div>
        ) : (
          <div
            onClick={() => setSKUItem_isActive(!SKUItem_isActive)}
            title="Editar SKU"
            className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer transition-all"
          >
            <HiPencil size="2rem" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaModalSku;
