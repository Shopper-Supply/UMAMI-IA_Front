import { createContext, useContext, useState } from "react";
import { useData } from "./dataProvider";

interface IModalProvider {
  children: React.ReactNode;
}

interface IModalContext {
  isOpen: boolean;
  content?: JSX.Element;
  isReversed: boolean;
  hideModal: () => void;
  showModal: () => void;
  reverseModal: () => void;
  setContent: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;

  isAlertOpen: boolean;
  openAlert: () => void;
  closeAlert: () => void;
}

const ModalContext = createContext<IModalContext>({
  isOpen: false,
  isReversed: false,
  hideModal: () => {},
  showModal: () => {},
  reverseModal: () => {},
  setContent: () => {},

  isAlertOpen: false,
  openAlert: () => {},
  closeAlert: () => {},
});

export const ModalProvider = ({ children }: IModalProvider) => {
  const { setExcelFile } = useData();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element | undefined>(undefined);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  function hideModal() {
    // Esconder o Modal ja aberto, essa função deve ser chamada para fechar um modal.
    setIsOpen(false);
    setContent(undefined);

    if (isReversed) {
      reverseModal();
    }
  }
  function showModal() {
    // Mostrar um modal oculto, essa função deve ser chamada no componente para abrir o modal.
    setIsOpen(true);
  }
  function reverseModal() {
    // por padrão todos os modais são exibidos do lado esquerdo, caso queira alterar o lado que ele é exibido chame essa função.
    setIsReversed(!isReversed);
  }

  function openAlert() {
    setIsAlertOpen(true);
  }
  function closeAlert() {
    setIsAlertOpen(false);
  }

  return (
    // setContent é utilizado para definir qual componente deverar ser exibido quando o modal for aberto.
    <ModalContext.Provider
      value={{
        isOpen,
        content,
        isReversed,
        hideModal,
        showModal,
        reverseModal,
        setContent,

        isAlertOpen,
        openAlert,
        closeAlert,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
