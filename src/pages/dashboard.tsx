import { NextPage } from "next";
import { useState } from "react";
import Seo from "@/components/seo";
import Menu from "@/components/menu";
import Modal from "@/components/modal";
import ModalAprovacaoErros from "@/components/modalAprovacaoErros";
import WellcomeModal from "@/components/wellcomeModal";
import ModalSku from "@/components/modalSku";
import HomeDashboard from "@/components/homeDashboard";
import LoadingScreen from "@/components/loadingScreen";
import RelatoriErrorsModal from "@/components/relatoriErrorsModal";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { useModal } from "@/providers/modaisProvider";

const Home: NextPage = () => {
  const { auth } = useUser();
  const { loadingScreen } = useModal();
  const router = useRouter();
  const [isFirstVisit, setFirstVitit] = useState(true);

  if (!auth) {
    if (typeof window !== "undefined") {
      router.push("/");
    }
  }

  const componentsPageDash: JSX.Element[] = [<HomeDashboard key={0} />];

  return (
    <>
      <Seo
        title="UMAMI IA"
        description="Robo de qualidade para verificação de planilhas"
      />
      <main className="bg-branco-secundario">
        <Menu />
        <Modal />
        {loadingScreen && <LoadingScreen />}
        {/* <ModalSku /> */}
        <div className="flex justify-end">
          <ModalAprovacaoErros />
          {isFirstVisit && <WellcomeModal setFirstVitit={setFirstVitit} />}
          {componentsPageDash[0]}
        </div>
      </main>
    </>
  );
};
export default Home;
