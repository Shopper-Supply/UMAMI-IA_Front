import { useData } from "@/providers/dataProvider";
import { useModal } from "@/providers/modaisProvider";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { HiPencilAlt, HiLogout } from "react-icons/hi";
import { HiPlus, HiOutlineXMark } from "react-icons/hi2";
import UserProfile from "../userProfile";

const ModalUsuario = () => {
  const { userData, setToken, setAuth } = useUser();
  const router = useRouter();
  const { hideModal } = useModal();
  const { setAllUsers, allUsers, curators, shoppings } = useData();

  const sortedDashboardhome = allUsers.sort(
    (a, b) => b.relatory!.percentage - a.relatory!.percentage
  );

  const user_profile = sortedDashboardhome[0];

  return (
    <div className="flex flex-col text-center items-center gap-[3rem] w-[25%] min-w-[35rem] h-screen bg-branco-primario drop-shadow-md absolute z-50 py-20">
      <UserProfile
        percentage={user_profile?.relatory?.percentage}
        name={user_profile?.name}
        owned_errors={user_profile?.relatory?.owned_errors}
        is_manager={false}
      />
      <div className="gap-0">
        <p className="text-roxo-primario text-6xl font-semibold">
          {userData?.name.toUpperCase()}
        </p>
        <p className="text-2xl text-roxo-primario font-medium">
          {userData?.email}
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
        <button
          onClick={hideModal}
          className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
          title="Fechar"
        >
          <HiOutlineXMark color="#FFFFFF" size="2rem" />
        </button>
      </div>
    </div>
  );
};

export default ModalUsuario;
