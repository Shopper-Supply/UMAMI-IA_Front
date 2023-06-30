import { useUser } from "@/providers/userProvider";
import Image from "next/image";
import { getAllUsers } from "@/services/get";
import { useData } from "@/providers/dataProvider";
import { useEffect } from "react";
import UserInFocus from "../userInFocus";
import CuratorErrors from "../curatorErros";
import { ICurator } from "@/interfaces/people";
import DunotDash from "../dunotDash";
import { useModal } from "@/providers/modaisProvider";
import ModalCrateUser from "../ModalCrateUser";
import ModaDesableUser from "../modaDesableUser";
import ModaActivateUser from "../modaActivateUser";
import ModalUsuarioSelecionado from "../modalSelectedUser";

const QADashboard = (): JSX.Element => {
  const { userData, token } = useUser();
  const { setAllUsers, allUsers, curators, shoppings } = useData();
  const { showModal, setContent, reverseModal } = useModal();
  const sortedDashboardhome = allUsers.sort(
    (a, b) => b.relatory!.percentage - a.relatory!.percentage
  );
  const sortedDashboardhomeCurators = curators.sort(
    (a, b) => b.percentage - a.percentage
  );
  const sortedDashboardhomeShoppings = shoppings?.sort(
    (a, b) => b.percentage - a.percentage
  );

  useEffect(() => {
    if (userData?.role?.id !== 1) {
      getAllUsers(token, setAllUsers);
    }
  }, [userData]);

  const userIn_focus = sortedDashboardhome[0];
  const limitedArray = sortedDashboardhomeCurators.slice(0, 3);
  const limitedShoppingArray = sortedDashboardhomeShoppings?.slice(0, 6);

  if (userData?.role?.id == 2 || userData?.role?.id == 3) {
    // pagina de Usuarios de Gestão (TI e Gestores)
    return (
      <section
        id="DashBoard"
        className="-z-0 top-0 absolute ml-[21.5rem] h-screen w-[84%] pl-4 pt-14 overflow-y-scroll overflow-x-hidden"
      >
        <UserInFocus
          percentage={userIn_focus?.relatory?.percentage}
          name={userIn_focus?.name}
          total_errors={userIn_focus?.relatory?.total_errors}
          owned_errors={userIn_focus?.relatory?.owned_errors}
          is_manager={true}
        />
        {/* Menu do Gestor */}
        <div
          id="ManagerMenu"
          className="max-xl:w-[60%] w-[60%] h-[5rem] mt-3 bg-branco-primario drop-shadow-sm rounded-md flex justify-start items-center"
        >
          <ul className="flex justify-center items-center w-[100%] h-[100%] text-[1.5rem] text-roxo-secundario font-bold cursor-pointer ">
            <li
              onClick={() => {
                setContent(<ModalCrateUser />);
                reverseModal();
                showModal();
              }}
              className="hover:bg-roxo-primario hover:bg-opacity-20 w-[100%] h-[100%] text-center flex items-center justify-center rounded-l-[0.3rem] drop-shadow-sm"
            >
              CADASTRAR QA
            </li>
            <li
              onClick={() => {
                setContent(<ModaDesableUser />);
                reverseModal();
                showModal();
              }}
              className="hover:bg-roxo-primario hover:bg-opacity-20  w-[100%] h-[100%] text-center flex items-center justify-center drop-shadow-sm"
            >
              DESATIVAR QA
            </li>
            <li
              onClick={() => {
                setContent(<ModaActivateUser />);
                reverseModal();
                showModal();
              }}
              className="hover:bg-roxo-primario hover:bg-opacity-20  w-[100%] h-[100%] text-center flex items-center justify-center rounded-r-[0.3rem] drop-shadow-sm"
            >
              ATIVAR QA
            </li>
          </ul>
        </div>
        {limitedArray.map((element) => (
          <CuratorErrors
            percentage={element.percentage}
            curatorName={element.name}
            errors={element.owned_errors}
            key={element.id}
          />
        ))}
        <div className="flex flex-wrap gap-5 mt-[3rem] list-none w-[80%]">
          {allUsers.map(
            (user, index) =>
              user.is_active === true && (
                <DunotDash
                  title={user.name}
                  porcent={Math.round(
                    user.relatory?.percentage ? user.relatory?.percentage : 0
                  )}
                  key={user.id}
                  ranking={index + 1}
                  action={() => {
                    setContent(<ModalUsuarioSelecionado user={user} />);
                    reverseModal();
                    showModal();
                  }}
                />
              )
          )}
        </div>
        <ul className="pt-8 flex w-[75%] flex-wrap gap-4"></ul>
      </section>
    );
  }
  // Pagina de usuario Padrão (Profissionais de Qualidade )
  return (
    <section
      id="DashBoard"
      className="-z-0 top-0 absolute ml-[21.5rem] h-screen pl-4 pt-14 overflow-y-scroll overflow-x-hidden"
    >
      <UserInFocus
        percentage={userData?.relatory?.percentage}
        name={userData?.name ? userData.name : "unknown"}
        total_errors={userData?.relatory?.total_errors}
        owned_errors={userData?.relatory?.owned_errors}
        is_manager={false}
      />
      {limitedArray.map((element) => (
        <CuratorErrors
          percentage={element.percentage}
          curatorName={element.name}
          errors={element.owned_errors}
          key={element.id}
        />
      ))}
      <div className="flex flex-wrap gap-5 mt-[3rem] list-none w-[80%]">
        {limitedShoppingArray?.map((shopping, index) => {
          console.table(shopping);
          return (
            <DunotDash
              title={shopping.mallName}
              porcent={Number(shopping.percentage.toFixed(1))}
              key={index}
              ranking={index + 1}
            />
          );
        })}
      </div>
    </section>
  );
};
export default QADashboard;
