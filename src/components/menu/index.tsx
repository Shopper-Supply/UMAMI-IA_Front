import Image from "next/image";
import {
  HiOutlineUserGroup,
  HiOutlineKey,
  HiOutlineSparkles,
  HiOutlineExclamationCircle,
  HiOutlineSaveAs,
  HiOutlineShoppingBag,
  HiOutlineQuestionMarkCircle,
  HiOutlineUser,
} from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";
import Logo_Shopper from "../../../public/Logo_Shopper.svg";
import { useModal } from "@/providers/modaisProvider";
import ModalPadraoDeSacola from "../modalPadraoDeSacola";
import ModalEnvioErros from "../modalEnvioErros";
import { useData } from "@/providers/dataProvider";
import ModalEnvioPlanilha from "../modalEnvioPlanilha";
import { toast } from "react-hot-toast";
import { error } from "@/utils/toast";
import iconRobo from "../../../public/Icon_Robo.svg";
import ModalUsuario from "../modalUsuario";
import ModalComparaPlanilha from "../modalComparaPlanilha";

const Menu = () => {
  const { setContent, showModal, reverseModal } = useModal();
  const { setExcelFile, errorsLog, excelFile } = useData();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (errorsLog.length > 0) {
      error("REVISE OS ERROS ANTES DE ENVIAR UMA NOVA PLANILHA");
      event.target.value = "";
    } else if (file) {
      setExcelFile(file);
      setContent(<ModalEnvioPlanilha />);
      showModal();
      event.target.value = null || "";
    }
  };

  return (
    <div className="flex flex-col justify-between fixed w-[21.2rem] h-screen drop-shadow-xl bg-branco-primario text-roxo-primario text-[1.8rem] animate-showModalAnimation z-5">
      <div>
        <Image
          src={Logo_Shopper}
          alt="Logo Shopper Supply"
          className="mt-[3.9rem]"
        />
        <ul className="flex flex-col gap-[2rem] mt-[3.5rem]">
          <li
            title="Função Indisponivel no momento"
            className="flex items-center gap-[1rem] mx-[2.2rem] opacity-50"
          >
            <HiOutlineUserGroup color="#5F4B8B" size="2.5rem" />
            Curadores
          </li>
          <li
            title="Função Indisponivel no momento"
            className="flex items-center gap-[1rem] mx-[2.2rem] opacity-50"
          >
            <HiOutlineSparkles color="#5F4B8B" size="2.5rem" />
            Qualidade
          </li>
          <li
            title="Função Indisponivel no momento"
            className="flex items-center gap-[1rem] mx-[2.2rem] opacity-50"
          >
            <HiOutlineKey color="#5F4B8B" size="2.5rem" />
            Permissoes
          </li>
          <li
            onClick={() => {
              setContent(<ModalEnvioErros />);
              showModal();
            }}
            className="flex items-center gap-[1rem] mx-[2.2rem] cursor-pointer"
          >
            <HiOutlineExclamationCircle color="#5F4B8B" size="2.5rem" />
            Erros
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-[2rem]">
        <form>
          <label
            htmlFor="dropzone-file"
            className="mx-[2.2rem] px-[1rem] py-[.6rem] relative cursor-pointer flex justify-around max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-roxo-primario text-center"
          >
            <h2 className="mt-4 text-[1.5rem] text-roxo-primario font-medium tracking-wide">
              Revisar planilha
            </h2>
            <p className="mt-2 text-[.9rem] text-roxo-primario opacity-80 tracking-wide">
              Arraste e soute ou clique, para enviar uma planilha para revisão.
            </p>
            <IoMdAddCircle color="#5F4B8B" size="3.5rem" />
            <input
              id="dropzone-file"
              type="file"
              className="absolute left-0 text-[5rem] w-[100%] opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
          </label>
        </form>
        <ul className="flex flex-col gap-[2rem] ">
          <li
            onClick={() => {
              setContent(<ModalComparaPlanilha />);
              showModal();
            }}
            className="flex items-center gap-[1rem] ml-[2.2rem] cursor-pointer"
          >
            <HiOutlineSaveAs color="#5F4B8B" size="2.5rem" />
            Comparação
          </li>
          <li
            onClick={() => {
              setContent(<ModalPadraoDeSacola />);
              showModal();
            }}
            className="flex items-center gap-[1rem] ml-[2.2rem] cursor-pointer"
          >
            <HiOutlineShoppingBag color="#5F4B8B" size="2.5rem" />
            Padrão de Sacola
          </li>
          <li
            title="Função Indisponivel no momento"
            className="flex items-center gap-[1rem] mx-[2.2rem] opacity-50"
          >
            <HiOutlineQuestionMarkCircle color="#5F4B8B" size="2.5rem" />
            Help
          </li>
          <div className="flex justify-around items-center ">
            <input
              type="checkbox"
              className=" hidden cursor-pointer appearance-none w-[7rem] h-[4rem] focus:outline-none checked:bg-branco-primario bg-roxo-primario  rounded-full before:inline-block before:rounded-full before:bg-branco-primario before:h-[3.6rem] before:w-[3.6rem] checked:before:bg-roxo-primario checked:before:translate-x-[3rem] drop-shadow-md transition-all duration-500 before:ml-[.2rem] before:mt-[.2rem]"
            />

            <button
              onClick={() => {
                setContent(<ModalUsuario />);
                reverseModal();
                showModal();
              }}
              className="bg-branco-secundario p-[1.1rem] rounded-full drop-shadow-sm hover:bg-roxo-primario hover:text-branco-primario transition-colors"
            >
              <HiOutlineUser size="2.5rem" />
            </button>
          </div>
          <span className="text-[1rem] w-[100%] text-center mb-3">
            Versão: alfa 1.2.3
          </span>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
