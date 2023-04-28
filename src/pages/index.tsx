import { NextPage } from "next";
import Image from "next/image";
import Seo from "@/components/seo";
import icon_Robo from "../../public/Icon_Robo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormLogin } from "@/interfaces/form";
import { useUser } from "@/providers/userProvider";
import { login } from "@/services/post";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

const Login: NextPage = () => {
  
  const { user, setUser, setToken, token, auth} = useUser();
  const router = useRouter()
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

    toast("LOGANDO...", {
      icon: (
        <Image src={icon_Robo} alt="Supp" className="h-[3rem] w-[3rem]" />
      ),
      style: {
        borderRadius: "50px",
        background: "#F4F3F7",
        color: "#3C2F58",
        fontSize: "1.3rem",
        fontWeight: "bolder",
      },
    });

    await login(newData)
      .then((res) => {
        setToken(res.token);
        sessionStorage.setItem("UMAMI@TOKEN", res.token)
      }).catch(err => {
        toast("OPPS, ALGO DE ERRADO", {
          icon: (
            <Image src={icon_Robo} alt="Supp" className="h-[3rem] w-[3rem]" />
          ),
          style: {
            borderRadius: "50px",
            background: "#ff2828",
            color: "#ffffff",
            fontSize: "1.3rem",
            fontWeight: "bolder",
          },
        }
        );
      })
  };

  if(auth){
    router.push("/dashboard")
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
            ROBÔ QUE AUXILIA NA QUALIDADE SHOPPER SUPPLY
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
            <input
              {...register("password")}
              type="password"
              placeholder="senha"
              className="w-[60%] rounded-full border-roxo-primario px-[1rem] border-[.2rem] h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none"
            />
            <button className="bg-roxo-primario text-branco-primario text-[1.5rem] px-8 py-3 rounded-full ">
              Entrar
            </button>
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
