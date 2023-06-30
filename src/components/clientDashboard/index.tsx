import { useUser } from "@/providers/userProvider";
import Image from "next/image";
import { getAllUsers } from "@/services/get";
import { useData } from "@/providers/dataProvider";
import { useEffect, useState } from "react";
import UserInFocus from "../userInFocus";
import CuratorErrors from "../curatorErros";
import { ICurator } from "@/interfaces/people";
import DunotDash from "../dunotDash";
import { useModal } from "@/providers/modaisProvider";
import { HiPlus, HiSearch } from "react-icons/hi";
import ModalCrateCurator from "../ModalCrateCurator";
import { IPlace } from "@/interfaces/place";

// objetivo: mostrar o nome dos shoppings e relatórios
// os dados dos shoppings estão armazenados aonde? - places, dentro do useData
// como esses dados estão formatados? - o place está vindo como um array

// abbr: 
//  "RJ4",
// client: 
//  "Also",
// id: 
//  "55b1474e-33c9-402d-9702-be4bf4da397b",
// is_active: 
//  true,
// mall: 
//  "Carioca",
// name: 
//  "Mundo Verde"

// como eu vou exibir esses dados?

const ClientDashboard = (): JSX.Element => {
  const { userData, token } = useUser();
  const { setAllUsers, allUsers, curators, shoppings, places } = useData();
  const { showModal, setContent, reverseModal } = useModal();
  const [search, setSearch] = useState<string>("");
  console.log(places)
  const sortedDashboardhomeCurators = places

    .filter((e) => {
      if (e.name?.includes(search)) {
        return e;
      }
      return;
    });

  return (
    <section
      id="DashBoard"
      className="-z-0 top-0 absolute ml-[21.5rem] h-screen w-[84%] pl-4 py-14 overflow-y-scroll overflow-x-hidden"
    >
      <div className="flex gap-3">
        <input
          type="text"
          className="drop-shadow-md w-[50%] rounded-full bg-branco-primario pl-5 text-[1.5rem] text-roxo-secundario font-semibold focus:outline-none"
          placeholder="Pesquisar cliente"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className="drop-shadow-md rounded-full bg-branco-primario text-branco-primario p-4 cursor-pointer"
        >
          <HiSearch size="2rem" color="#5F4B8B" />
        </div>
      </div>
      <div className="flex list-none mt-10 max-w-[75%] gap-5 flex-wrap">
        {sortedDashboardhomeCurators.length > 0 ? (
          sortedDashboardhomeCurators.map((element, index) => (
            <DunotDash
              title={element.mall} 
              porcent={Math.round(100)}
              key={element.id}
              ranking={index + 1}
            />
          ))
        ) : (
          <h1 className="text-[1.6rem] text-roxo-primario font-semibold">
            Nenhum usuario com o nome{" "}
            <span className="text-severity-5">{search}</span> foi encontrado.
          </h1>
        )}
      </div>
    </section>
  );
  

};
export default ClientDashboard;
