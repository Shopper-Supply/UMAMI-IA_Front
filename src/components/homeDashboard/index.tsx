import Image from "next/image";
import DunotDash from "@/components/dunotDash";
import IlustrationRobot_02 from "../../../public/robot_02.png";
import { useData } from "@/providers/dataProvider";

const HomeDashboard = () => {
  const { dashboardHome } = useData();
  const sortedDashboardhome = dashboardHome.groups.sort(
    (a, b) => b.percentage - a.percentage
  );
  return (
    <section
      id="DashBoard"
      className="-z-0 top-0 absolute ml-[21.5rem] w-[86%] h-screen pl-4 pt-14 pr-40 overflow-y-scroll overflow-x-hidden"
    >
      <div className="max-xl:w-[60%] max-w-[77rem] h-[17rem] bg-roxo-primario bg-opacity-30 rounded-md flex justify-center items-center">
        <Image
          src={IlustrationRobot_02}
          alt="Ilustração robo de qualidade"
          className="max-xl:hidden xl:w-[33rem] h-[21rem] absolute left-0 top-[-0.6rem]"
        />
        <div className="w-[85%] xl:ml-[32rem] flex flex-col gap-6 text-roxo-secundario">
          <p className="text-[1.6rem]">
            O Robô de qualidade Shopper está constantemente se aprimorando e se
            tornando mais eficiente. Se você notar qualquer problema ou erro,
            por favor, relate-o imediatamente para a nossa equipe de TI
          </p>
          <span className="text-[1.2rem] font-medium">
            tecnologia@shoppersupply.com.br
          </span>
        </div>
      </div>
      <ul className="pt-8 flex w-[75%] h-[75%] flex-wrap gap-4">
        {sortedDashboardhome.map((group, index) => (
          <DunotDash
            ranking={index}
            key={index}
            porcent={Math.round(group.percentage)}
            title={group.name}
          />
        ))}
      </ul>


    </section>
  );
};
export default HomeDashboard;
