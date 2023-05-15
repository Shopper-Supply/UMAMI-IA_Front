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
              Versão: Alfa 1.1.0
            </h2>
          </div>
        </div>
        <h4 className=" mt-10 text-[2rem] font-medium">NOTAS DE ATUALIZAÇÂO</h4>

        <div className="overflow-y-scroll mb-7">
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Comparação de planilhas
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora é possivel fazer comparação das planilhas de controle e
              planilhas do curador, todas as violações de dados serão inseridas
              na lista de aprovação.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Visualizar senha
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora na tela de login é possivel visualizar a sua senha, deixando
              assim mais facil de saber qual foi o erro cometido na hora do
              credenciamento.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Botão de sair corrigido
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora é possivel deslogar facilmente atraves de um botão de sing
              out no modal de usuario.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Verificação de token de acesso (segurança)
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Nessa atualização, estamos verificsdo o token de autorização antes
              de executar qualquer função, caso seu token não seja valido ou
              expirou a plataforma te leva de volta para a tela de login.
            </span>
          </div>
          <div className="mx-40 p-4 hover:bg-severity-2 hover:bg-opacity-25 rounded-md">
            <p className="mt-2 text-[1.8rem] font-semibold text-left w-[78%]">
              - Comunicação
            </p>
            <span className="mt-2 text-[1.5rem] font-semibold text-left w-[78%]">
              Agora ao fim de cada tarefa irá aparecer um popup informando a sua
              conclusão.
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
        </div>
      </div>
    </div>
  );
};
export default WellcomeModal;
