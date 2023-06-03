import { useData } from "@/providers/dataProvider";
import { useModal } from "@/providers/modaisProvider";

const Modal = () => {
  const { isReversed, isOpen, content, hideModal } = useModal();
  const { errorsLog } = useData();

  return (
    <div
      className={`flex absolute w-screen  ${
        isReversed ? "flex-row-reverse z-20" : "flex-row z-10"
      } ${!isOpen ? "hidden" : ""} transition `}
    >
      {content}

      <div
        onClick={hideModal}
        className={`h-screen ${
          errorsLog ? "w-screen" : "w-3/4"
        } backdrop-blur-sm bg-black bg-opacity-20`}
      ></div>
    </div>
  );
};
export default Modal;
