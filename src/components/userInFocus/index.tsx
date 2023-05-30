import IlustrationRobot_03 from "../../../public/robot_3.svg";
import { IUserInFocus } from "@/interfaces/people";
import Image from "next/image";
const UserInFocus = ({
  percentage,
  name,
  total_errors,
  owned_errors,
  is_manager,
}: IUserInFocus): JSX.Element => {
  const calcPorcent = (porcent: number | undefined) => {
    if (porcent !== undefined) {
      porcent = 100 - porcent;
      porcent = 100 / porcent;
      porcent = 283 / porcent;
      return porcent;
    }
    return 0;
  };

  return (
    <div className="max-xl:w-[60%] w-[60%] h-[17rem] bg-branco-primario drop-shadow-sm rounded-md flex justify-start items-center">
      <Image
        src={IlustrationRobot_03}
        alt="Ilustração robo de qualidade"
        className="max-xl:hidden xl:w-[33rem] h-[21rem] absolute -left-32 top-[-4rem] "
      />
      <div className="w-[85%] xl:ml-[20rem] pr-10 flex items-center  gap-6 text-roxo-secundario">
        <div className="text-[1.6rem]">
          <p className="text-[2rem] ml-10 font-bold relative">
            INCRIVEL!{" "}
            <span className="text-severity-2 text-[2.5rem]">
              {Math.round(percentage ? percentage : 0)}%
            </span>{" "}
            DE TODOS OS ERROS COLETADOS ESSE MÊS, FORAM REPORTADOS POR
            {is_manager ? " " : " VOCÊ "}
            <span className="text-severity-2 text-[2.3rem]">
              {name?.toUpperCase()}
            </span>
            .
          </p>
        </div>
        <div
          title={`${owned_errors ? owned_errors : "Carregando"} Erros`}
          className="w-[20rem]"
        >
          <svg width={120}>
            <circle
              cx="60"
              cy="78"
              r="45"
              stroke="#D9D9D9"
              strokeWidth="20px"
              fill="none"
              className={`shadow-inner ${!percentage && "animate-pulse"}`}
            ></circle>
            {percentage && (
              <circle
                cx="60"
                cy="78"
                r="45"
                stroke={"#8d3ae5"}
                strokeWidth="20px"
                fill="none"
                strokeDasharray={283}
                strokeDashoffset={calcPorcent(percentage)}
                className="transition-all ease-in-out duration-1000"
              ></circle>
            )}
          </svg>
          <h3 className="text-[2.5rem] font-bold absolute translate-x-[4.5rem] -translate-y-[9.2rem] text-[#8d3ae5]">
            {Math.round(percentage ? percentage : 0)}%
          </h3>
        </div>
      </div>
    </div>
  );
};
export default UserInFocus;
