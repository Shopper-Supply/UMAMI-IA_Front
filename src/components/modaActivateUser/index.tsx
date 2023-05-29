import { useState } from "react";
import { useModal } from "@/providers/modaisProvider";
import iconRobo from "../../../public/Icon_Robo.svg";
import Image from "next/image";
import { HiOutlineArrowUpTray, HiOutlineXMark } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import { useData } from "@/providers/dataProvider";
import { activeUser, deleteUser } from "@/services/delete";
import { useUser } from "@/providers/userProvider";
import { info } from "@/utils/toast";

const ModaActivateUser = (): JSX.Element => {
  const { hideModal } = useModal();
  const { allUsers } = useData();
  const { token } = useUser();
  const [users, setUsers] = useState(allUsers);
  return (
    <div className="flex flex-col text-center justify-around items-center gap-[3rem] w-[25%] min-w-[35rem] h-screen bg-branco-primario drop-shadow-md absolute z-50 py-20">
      <div className="h-[20%] w-[90%] flex flex-col items-center mb-7">
        <Image src={iconRobo} alt="Incone robô de qualidade Shopper" />
        <p className="text-roxo-primario text-[1.8rem] text-center">
          Aqui esta uma lista de todos os usuarios Desativados.
        </p>
      </div>
      <div className="w-[100%] h-[60%] overflow-y-scroll flex flex-col it">
        {users.map((e, i) => {
          return (
            e.is_active == false && (
              <div
                className="flex justify-between items-center bg-branco-secundario p-5 my-2 mx-4 rounded-md w-[90%] min-h-[6rem]"
                key={i}
              >
                <p className="w-[60%] text-left text-[2rem] text-roxo-primario">
                  {e.name}
                </p>
                <div
                  onClick={() => {
                    console.log(token);

                    activeUser(token, e)
                      .then((res) => {
                        info("USUARIO ATIVADO COM SUCESSO");
                        setUsers(
                          users.filter((user) => user.is_active === true)
                        );
                      })
                      .catch((err) => console.error(err));
                  }}
                  className="p-[1rem] bg-roxo-primario rounded-full drop-shadow-md"
                >
                  <HiOutlineTrash
                    size="1.5rem"
                    className="cursor-pointer"
                    color="#FFFFFF"
                  />
                </div>
              </div>
            )
          );
        })}
      </div>
      <button
        onClick={hideModal}
        className="p-[1.5rem] bg-roxo-primario rounded-full drop-shadow-md"
        title="Fechar"
      >
        <HiOutlineXMark color="#FFFFFF" size="2rem" />
      </button>
    </div>
  );
};
export default ModaActivateUser;
