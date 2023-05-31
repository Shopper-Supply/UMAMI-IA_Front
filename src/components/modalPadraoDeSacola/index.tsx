import Image from "next/image";
import iconRobo from "../../../public/Icon_Robo.svg";
import { IFormBag } from "@/interfaces/form";
import { useData } from "@/providers/dataProvider";
import { useModal } from "@/providers/modaisProvider";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineArrowUpTray, HiOutlineXMark } from "react-icons/hi2";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { verifyToken } from "@/utils/finds";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";

const ModalPadraoDeSacola = () => {
  const { currentBagPattern, setCurrentBagPattern } = useData();
  const { hideModal } = useModal();
  const { setAuth } = useUser();
  const router = useRouter();

  const schema = yup.object().shape({
    iva: yup.number().required("Campo Obrigatorio"),
    width: yup.number().required("Campo Obrigatorio"),
    height: yup.number().required("Campo Obrigatorio"),
    weight: yup.number().required("Campo Obrigatorio"),
    length: yup.number().required("Campo Obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormBag>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormBag> = (data) => {
    // verificação de token de usuario.
    const verifyTokenResult = verifyToken(setAuth, hideModal, router);
    if (verifyTokenResult !== true) {
      return;
    }

    setCurrentBagPattern(data);
    toast("PADRÃO DE SACOLA REDEFINIDO", {
      icon: <Image src={iconRobo} alt="Supp" className="h-[3rem] w-[3rem]" />,
      style: {
        borderRadius: "50px",
        background: "#F4F3F7",
        color: "#3C2F58",
        fontSize: "1.3rem",
        fontWeight: "bolder",
      },
    });
    hideModal();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[3rem] w-[25%] min-w-[35rem] h-screen bg-branco-primario drop-shadow-md animate-showModalAnimation absolute z-10">
      <Image src={iconRobo} alt="Incone robô de qualidade Shopper" />
      <p className="text-roxo-primario text-[1.8rem] text-center">
        Você deseja alterar o padrão de sacola. Aqui está!
      </p>
      <div className="flex justify-center items-center gap-[1.5rem]">
        <HiOutlineShoppingBag color="#5F4B8B" size="3rem" />
        <p className="text-roxo-primario text-[1.8rem] text-center">
          Padrão de Sacola
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center flex-col gap-[1.8rem]"
      >
        <label
          htmlFor="iva"
          className="cursor-text border-roxo-primario border-[.2rem] w-[80%] h-[4rem] rounded-[10rem] flex justify-between items-center text-[1.8rem] text-roxo-primario font-semibold  px-[1rem]"
        >
          IVA
          <input
            type="number"
            id="iva"
            min="0"
            defaultValue={currentBagPattern.iva}
            {...register("iva")}
            className="bg-transparent text-[1.8rem] text-roxo-primario w-[85%] h-[4rem] focus:outline-none text-end "
          />
        </label>
        <label
          htmlFor="peso"
          className="cursor-text border-roxo-primario border-[.2rem] w-[80%] h-[4rem] rounded-[10rem] flex justify-between items-center text-[1.8rem] text-roxo-primario font-semibold  px-[1rem]"
        >
          Peso
          <input
            type="number"
            id="peso"
            min="0"
            defaultValue={currentBagPattern.weight}
            {...register("weight")}
            className="bg-transparent text-[1.8rem] text-roxo-primario w-[85%] h-[4rem] focus:outline-none text-end "
          />
          g
        </label>
        <label
          htmlFor="altura"
          className="cursor-text border-roxo-primario border-[.2rem] w-[80%] h-[4rem] rounded-[10rem] flex justify-between items-center text-[1.8rem] text-roxo-primario font-semibold  px-[1rem]"
        >
          Altura
          <input
            type="number"
            id="altura"
            min="0"
            defaultValue={currentBagPattern.height}
            {...register("height")}
            className="bg-transparent text-[1.8rem] text-roxo-primario w-[85%] h-[4rem] focus:outline-none text-end "
          />
          cm
        </label>
        <label
          htmlFor="largura"
          className="cursor-text border-roxo-primario border-[.2rem] w-[80%] h-[4rem] rounded-[10rem] flex justify-between items-center text-[1.8rem] text-roxo-primario font-semibold  px-[1rem]"
        >
          Largura
          <input
            type="number"
            id="largura"
            min="0"
            defaultValue={currentBagPattern.width}
            {...register("width")}
            className="bg-transparent text-[1.8rem] text-roxo-primario w-[85%] h-[4rem] focus:outline-none text-end "
          />
          cm
        </label>
        <label
          htmlFor="comprimento"
          className="cursor-text border-roxo-primario border-[.2rem] w-[80%] h-[4rem] rounded-[10rem] flex justify-between items-center text-[1.8rem] text-roxo-primario font-semibold  px-[1rem]"
        >
          Comprimento
          <input
            type="number"
            id="comprimento"
            min="0"
            defaultValue={currentBagPattern.length}
            {...register("length")}
            className="bg-transparent text-[1.8rem] text-roxo-primario w-[85%] h-[4rem] focus:outline-none text-end "
          />
          cm
        </label>
        <div className="flex gap-3">
          <button
            className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
            title="Enviar"
          >
            <HiOutlineArrowUpTray color="#FFFFFF" size="2.7rem" />
          </button>
          <button
            onClick={hideModal}
            className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
            title="Fechar"
          >
            <HiOutlineXMark color="#FFFFFF" size="2.7rem" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default ModalPadraoDeSacola;
