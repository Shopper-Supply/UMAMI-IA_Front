import { useData } from "@/providers/dataProvider";
import { useModal } from "@/providers/modaisProvider";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { HiPencilAlt, HiLogout } from "react-icons/hi";
import { HiPlus, HiOutlineXMark } from "react-icons/hi2";
import UserDonut from "../userDonut";

const ModalUsuario = () => {
  const { userData, setToken, setAuth } = useUser();
  const router = useRouter();
  const { hideModal } = useModal();
  const { setAllUsers, allUsers, curators, shoppings } = useData();

  console.log(userData?.relatory?.old_relatory);

  return (
    <div className="flex flex-col text-center items-center gap-[3rem] w-[25%] min-w-[35rem] h-screen bg-branco-primario drop-shadow-md absolute z-50 py-20">
      <UserDonut
        percentage={userData?.relatory?.percentage}
        owned_errors={userData?.relatory?.owned_errors}
      />
      <div className="gap-0">
        <p className="text-roxo-primario text-6xl font-semibold">
          {userData?.name.toUpperCase()}
        </p>
        <p className="text-2xl text-roxo-primario font-medium">
          {userData?.email}
        </p>
      </div>

      <div className="bg-branco-secundario drop-shadow-md w-[90%] h-fit flex p-5 flex-col gap-4 rounded-sm">
        {userData?.relatory?.old_relatory?.map((relatore, index) => {
          const [mes, ano] = relatore.relatory_date?.split("/");
          const dataCompleta = new Date(parseInt(ano), parseInt(mes) - 1);
          const nomeMes = dataCompleta.toLocaleString("default", {
            month: "long",
          });
          return (
            <div key={index} className="flex pl-3">
              <h1 className="text-[1.2rem] text-roxo-primario font-bold">
                {nomeMes.toUpperCase()}
              </h1>
              <div className="ml-3 w-[100%] bg-cinza-primario rounded-full drop-shadow-sm">
                <div
                  className={`h-[100%] bg-severity-2 w-[${
                    relatore.percentage
                  }%] ${
                    relatore.percentage < 100
                      ? "rounded-l-full"
                      : "rounded-full"
                  } drop-shadow-sm flex justify-end items-center pr-3`}
                >
                  {" "}
                  <span className="text-[1.2rem] text-roxo-primario font-semibold">
                    {`${relatore.owned_errors} Erros`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
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
