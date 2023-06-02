import { useModal } from "@/providers/modaisProvider";
import Image from "next/image";
import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { HiOutlineArrowUpTray, HiOutlineXMark } from "react-icons/hi2";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import iconRobo from "../../../public/Icon_Robo.svg";
import { ICuratorRegister, IUser, IUserDetail } from "@/interfaces/people";
import { createCurator, createUser } from "@/services/post";
import { useUser } from "@/providers/userProvider";
import { info, error } from "@/utils/toast";
import { getCurators } from "@/services/get";
import { useData } from "@/providers/dataProvider";

const ModalCrateCurator = (): JSX.Element => {
  const { hideModal } = useModal();
  const { token, userData } = useUser();
  const { setCurators } = useData();
  const [show, setShow] = useState(true);
  const schema = yup.object().shape({
    level: yup
      .number()
      .required("Informação obrigatoria")
      .oneOf([1, 2, 3], "Selecione uma opção válida"),
    name: yup.string().required("Informação obrigatoria"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICuratorRegister>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<ICuratorRegister> = (data) => {
    createCurator(token, data)
      .then((Curator) => {
        info("NOVO CURADOR CADASTRADO COM SUCESSO");
        hideModal();
        getCurators(token, setCurators, userData?.role_id);
      })
      .catch((err) => {
        error("ALGO DEU ERRADO");
        console.error(err);
      });
    return;
  };
  return (
    <div className="flex flex-col text-center justify-around items-center gap-[3rem] w-[25%] min-w-[35rem] h-screen bg-branco-primario drop-shadow-md absolute z-50 py-20">
      <div className="h-[20%] w-[90%] flex flex-col items-center mb-7">
        <Image src={iconRobo} alt="Incone robô de qualidade Shopper" />
        <p className="text-roxo-primario text-[1.8rem] text-center">
          Aqui é possivel cadastrar um novo curador na plataforma.
        </p>
      </div>
      <form id="newUser" className="w-[90%]">
        <label className="text-[1.5rem] text-left flex flex-col w-[100%] text-roxo-primario">
          <p className="ml-5 px-1 translate-y-4 bg-branco-primario w-fit">
            {" "}
            Nivel{" "}
          </p>
          <select
            {...register("level")}
            className={`w-[100%] rounded-full ${
              errors.level
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1rem] border-[.2rem] h-[4rem] w-[100%] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          >
            <option value={1}>Junior</option>
            <option value={2}>Pleno</option>
            <option value={3}>Senior</option>
          </select>
        </label>
        <label className="text-[1.5rem] text-left flex flex-col w-[100%] text-roxo-primario">
          <p className="ml-5 px-1 translate-y-4 bg-branco-primario w-fit">
            {" "}
            Nome{" "}
          </p>
          <input
            {...register("name")}
            type="text"
            placeholder={errors.name ? errors.name.message : "Ester Frazão"}
            title="Nome do Usuario"
            className={`w-[100%] rounded-full ${
              errors.name
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1.5rem] border-[.2rem] h-[4rem] w-[100%] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          />
        </label>
      </form>
      <div className="flex gap-3">
        <button
          onClick={hideModal}
          className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
          title="Fechar"
        >
          <HiOutlineXMark color="#FFFFFF" size="2rem" />
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
          title="Cadastrar"
          form="newUser"
        >
          <HiOutlineArrowUpTray color="#FFFFFF" size="2rem" />
        </button>
      </div>
    </div>
  );
};
export default ModalCrateCurator;
