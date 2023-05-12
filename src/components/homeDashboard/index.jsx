import Image from "next/image";
import DunotDash from "@/components/dunotDash";
import IlustrationRobot_02 from "../../../public/robot_02.png";

const HomeDashboard = () => {
  return (
    <section
      id="DashBoard"
      className=" top-0 absolute ml-[21.5rem] w-[86%] h-screen pl-14 pt-14 overflow-y-scroll overflow-x-hidden"
    >
      <div className="w-[70%] h-[17rem] bg-roxo-primario bg-opacity-30 rounded-md flex justify-center items-center">
        <Image
          src={IlustrationRobot_02}
          alt="Ilustração robo de qualidade"
          className="w-[33rem] h-[21rem] absolute left-0 top-[-0.6rem]"
        />
        <div className="ml-[30rem] flex flex-col gap-6 text-roxo-secundario">
          <p className=" text-[1.6rem]">
            O Robô de qualidade Shopper está constantemente se aprimorando e se
            tornando mais eficiente. Se você notar qualquer problema ou erro,
            por favor, relate-o imediatamente para a nossa equipe de TI
          </p>
          <span className="text-[1.2rem] font-medium">
            tecnologia@shoppersupply.com.br
          </span>
        </div>
      </div>

      <ul className="pt-8 flex w-[92%] h-[75%] flex-wrap gap-4">
        <DunotDash porcent={23} title="Código" ranking={1} />
        <DunotDash ranking={2} title="Preenchimento" porcent={17} />
        <DunotDash ranking={3} />
        <DunotDash ranking={4} />
        <DunotDash ranking={5} />
        <DunotDash ranking={6} />
        <DunotDash ranking={7} />
        <DunotDash ranking={8} />
      </ul>
    </section>
  );
};
export default HomeDashboard;
