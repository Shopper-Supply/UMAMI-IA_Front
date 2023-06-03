import IlustrationRobot_01 from "../../../public/person_&_robot.png";
import Image from "next/image";

const WellcomeModal = ({ setFirstVitit }: any) => {
  return (
    <div className="absolute z-50 top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-branco-secundario w-[60%] h-[80%] rounded-md flex flex-col items-center">
        <div className="w-[100%] h-[7rem] flex justify-end items-center px-4">
          <div
            title="Fechar"
            onClick={() => setFirstVitit(false)}
            className="w-[1.5rem] h-[1.5rem] bg-severity-5 rounded-full cursor-pointer animate-bounce"
          ></div>
        </div>
        <div className="w-[80%] p-5 bg-roxo-primario bg-opacity-30  rounded-lg relative">
          <Image
            src={IlustrationRobot_01}
            alt="Ilustração robo de qualidade 01 "
            className=" absolute h-[13rem] w-[30rem] top-[-1.5rem] left-[-3rem]"
          />
          <div className="flex flex-col items-center">
            <h1 className="text-[4rem] text-roxo-secundario font-bold ">
              BEM-VINDO
            </h1>
            <h2 className="text-[2rem] text-roxo-secundario font-semibold">
              Versão: Beta 1.1.0
            </h2>
          </div>
        </div>
        <h4 className=" mt-10 text-[2rem] font-medium">DESCUBRA MAIS</h4>

        <div className="overflow-y-scroll mb-7">
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Comparação de planilhas
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              É possivel fazer comparação das planilhas de controle e planilhas
              do curador, todas as violações de dados serão inseridas na lista
              de aprovação.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Verificação de token de acesso (segurança)
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              verificamos o token de autorização antes de executar qualquer
              função, caso seu token não seja valido ou expirou a plataforma te
              leva de volta para a tela de login.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Relatorios
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Na pagina inicial é possivel visualizar a porcentagem baseado na
              quantidade de cada erro.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Corrreção de bugs
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Alguns bugs que atrapalhavam no fluxo foram corrigidos.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Validação de planilha
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Ao Arrastar ou clicar no input no menu principal é possivel fazer
              a validação de uma planilha.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Correção de planilha
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Sé uma planilha já foi validada e a verificação precisa ser
              refeita, troque o tipo da auditoria com um click para correção.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Pesquisa por titulo de um erro
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Na Lista de erros a serem aprovado é possivel fazer uma pesquisa
              pelo titulo de um erro.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WellcomeModal;
