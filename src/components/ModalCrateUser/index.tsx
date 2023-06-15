import { useModal } from "@/providers/modaisProvider";
import Image from "next/image";
import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { HiOutlineArrowUpTray, HiOutlineXMark } from "react-icons/hi2";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import iconRobo from "../../../public/Icon_Robo.svg";
import { IUser, IUserDetail } from "@/interfaces/people";
import { createUser } from "@/services/post";
import { useUser } from "@/providers/userProvider";
import { info, error } from "@/utils/toast";

const ModalCrateUser = (): JSX.Element => {
  const { hideModal } = useModal();
  const { token } = useUser();
  const [show, setShow] = useState(true);
  const schema = yup.object().shape({
    role_id: yup
      .number()
      .required("Informação obrigatoria")
      .oneOf([1, 2, 3], "Selecione uma opção válida"),
    name: yup.string().required("Informação obrigatoria"),
    username: yup.string().required("Informação obrigatoria"),
    email: yup.string().required("Informação obrigatoria"),
    password: yup.string().required("Informação obrigatoria"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserDetail>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IUserDetail> = (data) => {
    createUser(token, data)
      .then((user) => {
        info("NOVO USUARIO CADASTRADO COM SUCESSO");
        hideModal();
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
          Aqui é possivel cadastrar um novo usuario na plataforma.
        </p>
      </div>
      <form id="newUser" className="w-[90%]">
        <label className="text-[1.5rem] text-left flex flex-col w-[100%] text-roxo-primario">
          <p className="ml-5 px-1 translate-y-4 bg-branco-primario w-fit">
            {" "}
            Tipo de Usuario{" "}
          </p>
          <select
            {...register("role_id")}
            className={`w-[100%] rounded-full ${
              errors.role
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1rem] border-[.2rem] h-[4rem] w-[100%] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          >
            <option value={1}>Qualidade</option>
            <option
              title="O gestor é o profissional designado para gerenciar e criar usuários dentro da plataforma, sendo responsável por sua administração."
              value={3}
            >
              Gestor
            </option>
          </select>
        </label>

        <label className="text-[1.5rem] text-left flex flex-col w-[100%] text-roxo-primario">
          <p className="ml-5 px-1 translate-y-4 bg-branco-primario w-fit">
            {" "}
            Nome{" "}
          </p>
          <input
            {...register("name")}
            autoComplete="off"
            type="text"
            placeholder={
              errors.name ? "Insira o curador responsavel" : "Ester Frazão"
            }
            title="Nome do Usuario"
            className={`w-[100%] rounded-full ${
              errors.name
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1.5rem] border-[.2rem] h-[4rem] w-[100%] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          />
        </label>
        <label className="text-[1.5rem] text-left flex flex-col w-[100%] text-roxo-primario">
          <p className="ml-5 px-1 translate-y-4 bg-branco-primario w-fit">
            {" "}
            Username{" "}
          </p>
          <input
            {...register("username")}
            autoComplete="off"
            type="text"
            placeholder={
              errors.username ? "Insira o curador responsavel" : "Ester-Shopper"
            }
            defaultValue={""}
            title="Nome do Usuario"
            className={`w-[100%] rounded-full ${
              errors.username
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1.5rem] border-[.2rem] h-[4rem] w-[100%] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          />
        </label>
        <label className="text-[1.5rem] text-left flex flex-col w-[100%] text-roxo-primario">
          <p className="ml-5 px-1 translate-y-4 bg-branco-primario w-fit">
            {" "}
            Email{" "}
          </p>
          <input
            {...register("email")}
            autoComplete="off"
            type="email"
            placeholder={
              errors.email
                ? "Insira o curador responsavel"
                : "Ester@shoppersupply.com.br"
            }
            defaultValue={""}
            title="Nome do Usuario"
            className={`w-[100%] rounded-full ${
              errors.email
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1.5rem] border-[.2rem] h-[4rem] w-[100%] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          />
        </label>
        <label className="text-[1.5rem] text-left flex flex-col w-[100%] text-roxo-primario">
          <p className="ml-5 px-1 translate-y-4 bg-branco-primario w-fit">
            {" "}
            Senha{" "}
          </p>
          <input
            {...register("password")}
            autoComplete="off"
            type={show ? "password" : "text"}
            placeholder="senha"
            defaultValue={""}
            className={`w-[100%] rounded-full ${
              errors.password
                ? "border-red-600 focus:border-red-700"
                : "border-roxo-primario"
            } px-[1.5rem] border-[.2rem] h-[4rem] w-[100%] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
          />
          {show ? (
            <HiEye
              onClick={() => setShow(false)}
              className="cursor-pointer absolute right-0 translate-y-[230%] -translate-x-[200%]"
            />
          ) : (
            <HiEyeSlash
              onClick={() => setShow(true)}
              className="cursor-pointer absolute right-0 translate-y-[230%] -translate-x-[200%]"
            />
          )}
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
export default ModalCrateUser;
