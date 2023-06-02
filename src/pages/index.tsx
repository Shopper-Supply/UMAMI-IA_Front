import { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import Seo from "@/components/seo";
import icon_Robo from "../../public/Icon_Robo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormLogin } from "@/interfaces/form";
import { useUser } from "@/providers/userProvider";
import { useModal } from "@/providers/modaisProvider";
import { login } from "@/services/post";
import { useRouter } from "next/router";
import { error, info } from "@/utils/toast";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import LoadingLogin from "@/loadingLogin";

const Login: NextPage = () => {
  const { user, setUser, setToken, token, auth, setAuth } = useUser();
  const router = useRouter();
  const { setDashPage, loadingScreen } = useModal();
  const [show, setShow] = useState(true);
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { setLoadingScreen } = useModal();

  const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
    const isEmail = emailRegex.test(
      data.username ? data.username : "undefined"
    );
    let newData;
    if (isEmail) {
      newData = {
        email: data.username,
        password: data.password,
      };
      setUser(newData);
    } else {
      newData = {
        username: data.username,
        password: data.password,
      };
      setUser(newData);
    }

    // info("LOGANDO...");

    setLoadingScreen(true);

    await login(newData)
      .then((res) => {
        setToken(res.token);
        setAuth(true);
        setDashPage(0);
        sessionStorage.setItem("UMAMI@TOKEN", res.token);
      })
      .catch((err) => {
        error("CREDENCIAIS INVÁLIDAS");
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  if (auth) {
    router.push("/dashboard");
  }

  return (
    <>
      <Seo
        title="BEM VINDO - UMAMI IA"
        description="Robo de qualidade para verificação de planilhas"
      />
      <main className="bg-branco-secundario h-screen flex justify-between">
        <div className="flex flex-col justify-center items-center w-[65%] px-[10%]">
          <Image
            src={icon_Robo}
            alt="Mascote qualidade Shopper"
            className="w-[25%] pb-[3rem] drop-shadow-xl"
          />
          <h1 className="text-[4rem] font-bold text-roxo-secundario drop-shadow-sm">
            OLA ME CHAMO{" "}
            <span className="text-severity-2 cursor-pointer drop-shadow-sm hover:animate-pulse">
              SUPP
            </span>
          </h1>
          <h2 className="text-[3.5rem] font-bold text-center text-roxo-secundario drop-shadow-sm ">
            AUDITOR QUE AUXILIA NA QUALIDADE SHOPPER SUPPLY
          </h2>
        </div>
        <div className="bg-branco-primario w-[35%] drop-shadow-lg flex flex-col justify-end items-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[100%] pb-[50%] flex flex-col justify-around items-center gap-5"
          >
            <input
              {...register("username")}
              type="text"
              placeholder="exemplo@mail.com or Lancao"
              className="w-[60%] rounded-full border-roxo-primario px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none"
            />
            <div className=" flex justify-between items-center w-[60%] rounded-full border-roxo-primario px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none">
              <input
                {...register("password")}
                type={show ? "password" : "text"}
                placeholder="senha"
                className="h-[98%] border-none outline-none focus:outline-none bg-none"
              />
              {show ? (
                <HiEye
                  onClick={() => setShow(false)}
                  className="cursor-pointer"
                />
              ) : (
                <HiEyeSlash
                  onClick={() => setShow(true)}
                  className="cursor-pointer"
                />
              )}
            </div>
            {loadingScreen ? (
              <button className="bg-roxo-primario text-branco-primario text-[1.5rem] py-3 rounded-full ">
                <LoadingLogin />
              </button>
            ) : (
              <button className="bg-roxo-primario text-branco-primario text-[1.5rem] px-8 py-3 rounded-full ">
                Entrar
              </button>
            )}
          </form>
          <span className="mb-5">
            © 2023 Shopper Supply™ - Todos os direitos reservados.
          </span>
        </div>
      </main>
    </>
  );
};
export default Login;
