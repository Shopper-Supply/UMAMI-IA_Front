import { ICuratorErrorsComponent } from "@/interfaces/dashboard";

const CuratorErrors = ({
  percentage,
  curatorName,
  errors,
}: ICuratorErrorsComponent): JSX.Element => {
  return (
    <>
      <div className="max-xl:w-[60%] w-[50vw] h-[5rem] mt-3 flex justify-between">
        <div className="max-xl:w-[60%] w-[90%] h-[5rem] mt-7 bg-branco-primario drop-shadow-sm rounded-md flex justify-between items-center transition-all">
          <div
            className={`h-[100%] bg-[#8d3ae5] rounded-l-[0.3rem] rounded-r-full flex items-center justify-center transition-all`}
            style={{ width: `${percentage}%` }}
          >
            {percentage > 15 ? (
              <p className="ml-5 text-[1.5rem] font-bold leading-5 text-branco-primario">
                {curatorName?.toUpperCase()}
              </p>
            ) : (
              <p className="ml-5 translate-x-[100%] text-[1.5rem] font-bold leading-5 text-roxo-secundario">
                {curatorName?.toUpperCase()}
              </p>
            )}
          </div>
          <p className="text-[2rem]  text-roxo-secundario font-bold w-[10%]  ">{`${Math.round(
            percentage
          )}%`}</p>
        </div>
        <p className="mr-5 text-[1.3rem] text-roxo-secundario font-semibold pt-10 text-center">
          {errors} <br /> ERROS
        </p>
      </div>
    </>
  );
};

export default CuratorErrors;
