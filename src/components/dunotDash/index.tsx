interface IDonutDash {
  porcent?: number;
  title?: string;
  ranking: number;
  action?: any;
}

const DunotDash = ({ porcent, title, ranking, action }: IDonutDash) => {
  const calcPorcent = (porcent: number) => {
    porcent = 100 - porcent;
    porcent = 100 / porcent;
    porcent = 345 / porcent;
    return porcent;
  };
  return (
    <li onClick={action}>
      <div className="bg-branco-primario w-[26rem] h-[23rem] rounded-md drop-shadow-md p-4 cursor-pointer hover:drop-shadow-xl transition-all">
        <h4
          className={`${
            ranking <= 0 ? "text-severity-5" : "text-roxo-secundario"
          } text-[1.5rem] text-center font-bold`}
        >
          {title ? (
            title?.toUpperCase()
          ) : (
            <div className="bg-cinza-primario h-[3rem] animate-pulse"></div>
          )}
        </h4>
        <div className="w-[100%]">
          <svg>
            <circle
              cx="120"
              cy="78"
              r="55"
              stroke="#D9D9D9"
              strokeWidth="25px"
              fill="none"
              className={`shadow-inner ${!porcent && "animate-pulse"}`}
            ></circle>
            {porcent && (
              <circle
                cx="120"
                cy="78"
                r="55"
                stroke={ranking <= 0.0 ? "#F83636" : "#8d3ae5"}
                strokeWidth="23px"
                fill="none"
                strokeDasharray={345}
                strokeDashoffset={calcPorcent(porcent)}
                className="transition-all ease-in-out duration-10000"
              ></circle>
            )}
          </svg>
          <div
            className={`text-[2.9rem] ${
              ranking <= 0.0 ? "text-[#F83636]" : "text-[#8d3ae5]"
            } font-bold absolute top-[40%] ${
              porcent != 100 ? "left-[40%]" : "left-[36%]"
            } ${!title && "animate-pulse"}`}
          >
            <h3>{title ? porcent : "??"}%</h3>
          </div>
        </div>
        <div className="flex justify-center w-[100%] gap-3 mt-5">
          <div className=" flex gap-2 items-center">
            <div className="w-5 h-5 bg-cinza-primario rounded-full"></div>
            <span>skus</span>
          </div>
          <div className=" flex gap-2 items-center">
            <div
              className={`w-5 h-5 ${
                ranking > 0 ? "bg-[#8d3ae5]" : "bg-severity-5"
              } rounded-full`}
            ></div>
            <span>Erros</span>
          </div>
        </div>
      </div>
    </li>
  );
};
export default DunotDash;
