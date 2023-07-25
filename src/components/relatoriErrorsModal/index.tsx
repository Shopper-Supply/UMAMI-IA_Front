import { IGroups } from "@/interfaces/dashboard";
import { useState } from "react";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";


const ModalRelatoriErrors = ({types}: IGroups) => {
  const currentDate = new Date();
  const monthNumber = currentDate.getMonth();

  // inportante coletar para essa seção a quantidade de skus errados de um unico tipo de erro dentro do grupo selecionado e o nome desse erro paginados.
  const mes = [
    "janeiro",
    "fevereiro",
    "março",
    "abriu",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const [select, setSelect] = useState(monthNumber);

  const newTypes = types.filter(type => type.month-1 == select)
  return (
    <div className="flex flex-col justify-start items-center gap-[3rem] w-[25%] pt-6 min-w-[35rem] h-screen bg-branco-primario drop-shadow-md px-5 transition-all absolute z-10">
      <div className="text-[3rem] text-roxo-secundario text-center font-bold flex gap-10 items-center">
        <div onClick={()=> {
          if (select > 0){
            setSelect(select - 1);
          }else{
            setSelect(11)
          }
        }}>
          <HiOutlineChevronLeft className="cursor-pointer" />
        </div>
        <h2>{mes[select].toUpperCase()}</h2>
        <div onClick={()=> {
          if (select == 11){
            setSelect(0)
          }else{
            setSelect(select + 1)
          }}}>
          <HiOutlineChevronRight className="cursor-pointer" />
        </div>
      </div>
      <div className="">
        {newTypes.length > 0 ? newTypes.map(type =>{
            return (
            <div className="w-[100%] h-[6rem] px-6 mb-5 bg-branco-secundario rounded-lg flex justify-between items-center hover:bg-severity-5 hover:bg-opacity-30 transition-all ease-in-out">
              <div className="flex flex-col items-center">
                <span className="text-[1.5rem] text-roxo-secundario font-bold whitespace-nowrap">
                  {type.logs}
                </span>
                <span className="text-[1.5rem] text-roxo-secundario font-semibold whitespace-nowrap">Erros</span>
              </div>
              <p
                className="text-[1.5rem] text-roxo-secundario font-semibold text-center ml-5"
                title="Descrição Explicativa do erro."
              >
                {type.title}
              </p>
            </div>
            )
        }): <div className="w-[100%] h-[6rem] px-6 mb-5 bg-branco-secundario rounded-lg flex justify-between items-center transition-all ease-in-out">
                <p
                  className="text-[1.5rem] text-roxo-secundario font-semibold text-center ml-5 mr-5"
                  title="Descrição Explicativa do erro."
                >
                  NENHUM DADO ENCONTRADO
                </p>
              </div>}
              </div>
            </div>
  );
};
export default ModalRelatoriErrors;
