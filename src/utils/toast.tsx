import Image from "next/image";
import Icon_Robo from "../../public/Icon_Robo.svg";
import { toast } from "react-hot-toast";

export function info(message: string) {
  toast(message, {
    icon: <Image src={Icon_Robo} alt="Supp" className="h-[3rem] w-[3rem]" />,
    style: {
      borderRadius: "50px",
      background: "#F4F3F7",
      color: "#3C2F58",
      fontSize: "1.3rem",
      fontWeight: "bolder",
    },
  });
}

export function error(message: string) {
  toast(message, {
    icon: <Image src={Icon_Robo} alt="Supp" className="h-[3rem] w-[3rem]" />,
    style: {
      borderRadius: "50px",
      background: "#ff2828",
      color: "#ffffff",
      fontSize: "1.3rem",
      fontWeight: "bolder",
    },
  });
}

export function loading(
  promise: Promise<void>,
  message?: string,
  error?: string,
  succeess?: string
) {
  toast.promise(
    promise,
    {
      loading: message || "CARREGANDO...",
      error: error || "OPS ALGO DEU ERRADO",
      success: succeess || "TUDO PRONTO",
    },
    {
      icon: <Image src={Icon_Robo} alt="Supp" className="h-[3rem] w-[3rem]" />,
      style: {
        borderRadius: "50px",
        background: "#F4F3F7",
        color: "#3C2F58",
        fontSize: "1.3rem",
        fontWeight: "bolder",
      },
    }
  );
}
