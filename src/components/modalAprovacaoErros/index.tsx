import { HiCheck, HiDownload, HiPlus, HiOutlineTrash } from "react-icons/hi";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { useData } from "@/providers/dataProvider";
import { useModal } from "@/providers/modaisProvider";
import ModalEnvioErros from "../modalEnvioErros";
import ConfirmAction from "../confirmAction";
import { useEffect, useState } from "react";
import { submitErrorLog } from "@/services/post";
import { useUser } from "@/providers/userProvider";
import { IErroLogBody } from "@/interfaces/errors";
import { info } from "@/utils/toast";
import { triggerBase64Download } from "@/utils/downloadBlob";
import { verifyToken } from "@/utils/finds";
import { useRouter } from "next/router";

const ModalAprovacaoErros = () => {
  const {
    errorsLog,
    addError,
    ignoreError,
    setErrorsLog,
    responseFile,
    excelFile,
    currentCurator,
    currentPlace,
    setCurrentCurator,
    setCurrentPlace,
  } = useData();
  const { token, setAuth } = useUser();
  const { showModal, setContent, isAlertOpen, openAlert, hideModal } =
    useModal();
  const [statusErrorsLog, setStatusErrorsLog] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const getColor = (severity: number | undefined) => {
    switch (severity) {
      case 1:
        return "#EAFFB1";
      case 2:
        return "#BFE558";
      case 3:
        return "#FCFF53";
      case 4:
        return "#FB8B4B";
      case 5:
        return "#F83635";
    }
  };

  useEffect(() => {
    if (statusErrorsLog) {
      setErrorsLog([]), setStatusErrorsLog(false);
      setCurrentCurator({
        is_active: false,
        percentage: 0,
        total_errors: 0,
        owned_errors: 0,
        error_points: 0,
      });
      setCurrentPlace({});
    }
  }, [statusErrorsLog, setErrorsLog]);

  const searchedElement = errorsLog.filter((e) => {
    if (e.error_type?.title?.includes(search.toUpperCase())) {
      return e;
    }
    return;
  });

  const submitErrorsList = () => {
    // verificação de token de usuario.
    const verifyTokenResult = verifyToken(setAuth, hideModal, router);
    if (verifyTokenResult !== true) {
      return;
    }

    errorsLog.forEach((element) => {
      const skuError = {
        place: currentPlace,
        coor: element.coor,
        sheet: element.sheet,
      };
      const body: IErroLogBody = {
        curator_id: currentCurator.id,
        error_type_id: element.error_type!.id,
        sku_error: JSON.stringify(skuError),
      };
      submitErrorLog(token || "", body);
    });
    info("TODOS OS ERROS FORAM ADICIONADOS COM SUCESSO!");
    setErrorsLog([]);
  };

  return (
    <div
      className={`flex flex-row-reverse 
      } animate-showModalAnimation z-10`}
      style={
        errorsLog.length > 0
          ? { visibility: "visible" }
          : { visibility: "hidden" }
      }
    >
      {isAlertOpen && (
        <ConfirmAction
          message="TEM CERTEZA QUE DESEJA DESCARTAR TODOS OS ERROS?"
          setStatus={setStatusErrorsLog}
        />
      )}
      <div className=" flex flex-col justify-between items-center w-[25%] min-w-[35rem] h-screen bg-branco-primario drop-shadow-md">
        <input
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          type="text"
          defaultValue={""}
          placeholder="Pesquise pelo titulo de um erro."
          title="Nome do Usuario"
          className={`w-[90%] absolute mt-3 rounded-full border-roxo-primario px-[1.5rem] border-[.2rem] min-h-[4rem] text-[1.8rem] text-roxo-primario focus:border-roxo-primario focus:outline-none`}
        />
        <div className="overflow-y-auto flex flex-col items-center w-[100%] text-roxo-primario text-[1.2rem] font-semibold mt-[5rem]">
          {searchedElement.length > 0 ? (
            searchedElement?.map((error, i) => {
              return (
                <div
                  className="flex justify-between items-center bg-branco-secundario p-5 my-2 mx-4 rounded-md min-w-[94%] min-h-[5.5rem]"
                  key={i}
                >
                  <div
                    className={`rounded-full shadow-inner w-[2.3rem] h-[2.3rem]`}
                    title={`Erro de relevancia ${error.error_type?.severity}`}
                    style={{
                      backgroundColor: getColor(error.error_type?.severity),
                    }}
                  ></div>
                  <div className="text-center">
                    <p>{error.sheet}</p>
                    <p>{error.coor}</p>
                  </div>
                  <p
                    title={error.error_type?.description}
                    className="w-[60%] text-center"
                  >
                    {error.error_type?.title}
                  </p>
                  <HiOutlineTrash
                    title="Ignorar esse erro"
                    onClick={() => {
                      info("SEU ERRO FOI  IGNORADO");
                      ignoreError(i);
                    }}
                    size="2rem"
                    className="cursor-pointer"
                  />
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center bg-branco-secundario p-5 my-2 mx-4 rounded-md min-w-[94%] min-h-[5.5rem]">
              <p className="w-[60%] text-center">
                NADA COM{" "}
                <span className="text-severity-5">{search.toUpperCase()}</span>{" "}
                ENCONTRADO.{" "}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center content-center justify-center w-[100%] py-6 gap-3">
          <div
            onClick={() => {
              openAlert();
            }}
            title="Descartar Lista de Erros"
            className="drop-shadow-md rounded-full font-bold bg-branco-primario text-roxo-primario p-4 cursor-pointer"
          >
            <HiArrowUturnLeft size="2rem" fontWeight="900" />
          </div>
          <div
            onClick={() => {
              setContent(<ModalEnvioErros />);
              showModal();
            }}
            title="Adicionar Erro a Lista"
            className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer"
          >
            <HiPlus size="2rem" />
          </div>
          <div
            onClick={submitErrorsList}
            title="Aprovar Lista de Erros"
            className="drop-shadow-md rounded-full bg-roxo-primario text-branco-primario p-4 cursor-pointer"
          >
            <HiCheck size="2rem" />
          </div>
          <button
            onClick={() => {
              triggerBase64Download(responseFile, excelFile!.name);
              info(`PANILHA ${excelFile?.name} PRONTA!`);
            }}
            disabled={!responseFile}
            title={
              responseFile
                ? "Baixar Planilha Verificada"
                : "Nenhum Download Disponível"
            }
            className={`drop-shadow-md rounded-full bg-branco-primario text-roxo-primario p-4 ${
              !responseFile ? "opacity-50" : "cursor-pointer"
            }`}
          >
            <HiDownload size="2rem" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAprovacaoErros;
