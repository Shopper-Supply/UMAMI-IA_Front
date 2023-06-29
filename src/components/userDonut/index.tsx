import { IOldRelatory, IUserProfile } from "@/interfaces/people";

const UserDonut = ({ percentage, owned_errors }: IUserProfile): JSX.Element => {
  const calcPorcent = (porcent: number | undefined) => {
    if (porcent !== undefined) {
      porcent = 100 - porcent;
      porcent = 100 / porcent;
      porcent = 283 / porcent;
      return porcent;
    }
    return 0;
  };

  // const dateFilter = (date: IOldRelatory) => {
  //   date.relatory_date
  // }

  return (
    <div
      title={`Você coletou ${percentage}% dos erros existentes na plataforma no mês atual.`}
      className="max-xl:w-[60%] w-[60%] h-[10rem] bg-branco-primario flex justify-center items-center"
    >
      <div className="text-roxo-secundario drop-shadow-md">
        <div className="w-[12rem]">
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
          <h3
            title={`${owned_errors ? owned_errors : "Carregando"} Erros`}
            className="text-[2.5rem] font-bold absolute translate-x-[44%] -translate-y-[9.2rem] text-[#8d3ae5]"
          >
            {Math.round(percentage ? percentage : 0)}%
          </h3>
        </div>
      </div>
    </div>
  );
};
export default UserDonut;
