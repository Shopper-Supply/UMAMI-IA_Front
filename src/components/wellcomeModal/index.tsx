const WellcomeModal = () => {
  return (
    <div className="absolute z-50 top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-branco-secundario w-[60%] h-[80%] rounded-md flex flex-col items-center">
        <div className="w-[100%] h-[7rem] flex justify-end items-center px-4">
          <div
            title="Fechar"
            className="w-[1.5rem] h-[1.5rem] bg-severity-5 rounded-full cursor-pointer animate-bounce"
          ></div>
        </div>
        <div className="w-[80%] p-5 bg-cinza-primario  rounded-lg">
          {/* pode inserir imagens aqui */}
          <div className="flex flex-col items-center">
            <h1 className="text-[4rem] text-roxo-secundario font-bold ">
              BEM-VINDO
            </h1>
            <h2 className="text-[2rem] text-roxo-secundario font-semibold">
              Versão: Alfa 1.1.0
            </h2>
          </div>
        </div>
        <h4 className=" mt-10 text-[2rem] font-medium">NOTAS DE ATUALIZAÇÂO</h4>

        <div className="overflow-y-scroll">
          <div className="mx-40 p-4 hover:bg-roxo-primario hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Comparação de planilhas
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora é possivel fazer comparação das planilhas de controle e
              planilhas do curador, todas as violações de dados serão inseridas
              na lista de aprovação.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-roxo-primario hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Visualizar senha
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora na tela de login é possivel visualizar a sua senha, deixando
              assim mais facil de saber qual foi o erro cometido na hora do
              credenciamento.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-roxo-primario hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Comparação de planilhas
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora é possivel fazer comparação das planilhas de controle e
              planilhas do curador, todas as violações de dados serão inseridas
              na lista de aprovação.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-roxo-primario hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Visualizar senha
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora na tela de login é possivel visualizar a sua senha, deixando
              assim mais facil de saber qual foi o erro cometido na hora do
              credenciamento.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-roxo-primario hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Comparação de planilhas
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora é possivel fazer comparação das planilhas de controle e
              planilhas do curador, todas as violações de dados serão inseridas
              na lista de aprovação.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-roxo-primario hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Visualizar senha
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora na tela de login é possivel visualizar a sua senha, deixando
              assim mais facil de saber qual foi o erro cometido na hora do
              credenciamento.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WellcomeModal;
