import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";

const ModalRelatoriErrors = () => {
  // inportante coletar para essa seção a quantidade de skus errados de um unico tipo de erro dentro do grupo selecionado e o nome desse erro paginados.
  const mes = [
    "janeiro",
    "fevereiro",
    "março",
    "abriu",
    "maio",
    "junho",
    "julho",
  ];
  let select = 0;
  return (
    <div className="flex flex-col justify-start items-center gap-[3rem] w-[25%] pt-6 min-w-[35rem] h-screen bg-branco-primario drop-shadow-md px-5 transition-all absolute z-10">
      <div className="text-[3rem] text-roxo-secundario text-center font-bold flex gap-10 items-center">
        <div>
          <HiOutlineChevronLeft className="cursor-pointer" />
        </div>
        <h2>{mes[select].toUpperCase()}</h2>
        <div>
          <HiOutlineChevronRight className="cursor-pointer" />
        </div>
      </div>
      <div className="">
        <div className="w-[100%] h-[6rem] px-6 mb-5 bg-branco-secundario rounded-lg flex justify-between items-center hover:bg-severity-5 hover:bg-opacity-30 transition-all ease-in-out">
          <span className="text-[1.5rem] text-roxo-secundario font-semibold whitespace-nowrap">
            274 Erros
          </span>
          <p
            className="text-[1.5rem] text-roxo-secundario font-semibold text-center"
            title="Descrição Explicativa do erro."
          >
            Preenchimento dora do padrão Shopper Supply
          </p>
        </div>
        <div className="w-[100%] h-[6rem] px-6 mb-5 bg-branco-secundario rounded-lg flex justify-between items-center hover:bg-severity-5 hover:bg-opacity-30 transition-all ease-in-out">
          <span className="text-[1.5rem] text-roxo-secundario font-semibold whitespace-nowrap">
            274 Erros
          </span>
          <p
            className="text-[1.5rem] text-roxo-secundario font-semibold text-center"
            title="Descrição Explicativa do erro."
          >
            Preenchimento dora do padrão Shopper Supply
          </p>
        </div>
        <div className="w-[100%] h-[6rem] px-6 mb-5 bg-branco-secundario rounded-lg flex justify-between items-center hover:bg-severity-5 hover:bg-opacity-30 transition-all ease-in-out">
          <span className="text-[1.5rem] text-roxo-secundario font-semibold whitespace-nowrap">
            274 Erros
          </span>
          <p
            className="text-[1.5rem] text-roxo-secundario font-semibold text-center"
            title="Descrição Explicativa do erro."
          >
            Preenchimento dora do padrão Shopper Supply
          </p>
        </div>
      </div>
    </div>
  );
};
export default ModalRelatoriErrors;
