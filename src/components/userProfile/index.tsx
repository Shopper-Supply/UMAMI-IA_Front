import { IOldRelatory, IUserProfile } from "@/interfaces/people";

const UserProfile = ({
  percentage,
  name,
  owned_errors,
  is_manager,
}: IUserProfile): JSX.Element => {
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
    <div className="max-xl:w-[60%] w-[60%] h-[17rem] bg-branco-primario flex justify-center items-center">
      <div className="w-[85%] flex justify-center items-center text-roxo-secundario">
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
          <h3 className="text-[2.5rem] font-bold absolute translate-x-[4rem] -translate-y-[9.2rem] text-[#8d3ae5]">
            {Math.round(percentage ? percentage : 0)}%
          </h3>
        </div>
        <div className="text-[1.6rem]">
          <p className="text-[2rem] ml-10 font-bold relative">
            <span className="text-severity-2 text-[2.3rem]">
              {name?.toUpperCase()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
