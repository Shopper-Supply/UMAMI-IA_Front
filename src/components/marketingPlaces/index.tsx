import { IMallDash } from "@/interfaces/place";
import { useData } from "@/providers/dataProvider";
import { useUser } from "@/providers/userProvider";
import { getPlaces, getShoppings } from "@/services/get";
import { useEffect, useState } from "react";
import DunotDash from "../dunotDash";

const MarketingPlace = (): JSX.Element => {
  const { places, malls, setMalls } = useData();
  const { userData, token } = useUser();
  const [search, setSearch] = useState<string>("");
  const [newMallsList, setNewMallsList] = useState<IMallDash[]>([]);

  useEffect(() => {
    async function fetcheData() {
      await getShoppings(token, setMalls);
      places.forEach((place) => {
        const matchingMall = malls.find((mall) => {
          if (place.mall == mall.mallName && place.name == mall.sellerName) {
            return true;
          }
        });

        if (matchingMall) {
          const mallData = {
            mallName: matchingMall.mallName,
            sellerName: matchingMall.sellerName,
            percentage: matchingMall.percentage,
            total_errors: matchingMall.total_errors,
            owned_errors: matchingMall.owned_errors,
            group: matchingMall.group,
          };
          const mallListSpread: IMallDash[] = [...newMallsList, mallData];
          setNewMallsList(mallListSpread);
        } else {
          const mallData = {
            mallName: place.mall,
            sellerName: place.name,
            percentage: 0,
            total_errors: 0,
            owned_errors: 0,
            group: [],
          };
          const mallListSpread: IMallDash[] = [...newMallsList, mallData];
          setNewMallsList(mallListSpread);
        }
      });
    }
    fetcheData();
  }, [userData, token, setMalls, setNewMallsList]);

  const sortedMallList = newMallsList.sort(
    (a, b) => b.percentage - a.percentage
  );

  // console.log(places);
  // console.log(malls);
  return (
    <section
      id="DashBoard"
      className="-z-0 top-0 absolute ml-[21.5rem] h-screen w-[84%] pl-4 py-14 overflow-y-scroll overflow-x-hidden"
    >
      <div className="flex list-none mt-10 max-w-[75%] gap-5 flex-wrap">
        {sortedMallList.length > 0 ? (
          sortedMallList.map((element, index) => (
            <DunotDash
              title={`${element.mallName} ${element.sellerName}`}
              porcent={Math.round(element.percentage ? element.percentage : 0)}
              key={index}
              ranking={index + 1}
            />
          ))
        ) : (
          <h1 className="text-[1.6rem] text-roxo-primario font-semibold">
            Nenhum Canal de vendas com o nome{" "}
            <span className="text-severity-5">{search}</span> foi encontrado.
          </h1>
        )}
      </div>
    </section>
  );
};

export default MarketingPlace;
