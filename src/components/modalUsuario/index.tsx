import { useModal } from "@/providers/modaisProvider";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { HiPencilAlt, HiLogout } from "react-icons/hi";

const ModalUsuario = () => {
  const { userData, setToken, setAuth } = useUser();
  const router = useRouter();
  const { hideModal } = useModal();

  return (
    <div className="flex flex-col text-center items-center gap-[3rem] w-[25%] min-w-[35rem] h-screen bg-branco-primario drop-shadow-md absolute z-50 py-20">
      {/* <Image src={iconRobo} alt="Incone robô de qualidade Shopper" /> */}
      <div>
        <div className="rounded-full w-[13rem] h-[13rem] animate-pulse bg-cinza-primario"></div>
      </div>
      <div className="gap-0">
        <p className="text-roxo-primario text-6xl font-semibold">
          {userData.name.toUpperCase()}
        </p>
        <p className="text-2xl text-roxo-primario font-medium">
          {userData.email}
        </p>
      </div>

      <div className="bg-cinza-primario drop-shadow-md w-[90%] h-[9.1rem] animate-pulse flex p-5 flex-col gap-4">
        <div className="bg-branco-secundario w-[70%] h-[25%] rounded-md opacity-80"></div>
        <div className="bg-branco-secundario w-[95%] h-[15%] rounded-md opacity-80"></div>
        <div className="bg-branco-secundario w-[95%] h-[15%] rounded-md opacity-80"></div>
        <div className="bg-branco-secundario w-[95%] h-[15%] rounded-md opacity-80"></div>
        <div className="bg-branco-secundario w-[95%] h-[15%] rounded-md opacity-80"></div>
      </div>
      <div className="flex gap-5">
        {/* <button
          className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
          title="Editar Dados"
        >
          <HiPencilAlt size={"2rem"} color="#FFFFFF" />
        </button> */}
        <button
          onClick={() => {
            setToken("");
            setAuth(false);
            sessionStorage.clear();
            hideModal();
            router.push("/");
          }}
          className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
          title="Sair"
        >
          <HiLogout size={"2rem"} color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
};

export default ModalUsuario;
