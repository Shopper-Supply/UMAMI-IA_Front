import { NextPage } from "next";
import { useState } from "react";
import Seo from "@/components/seo";
import Menu from "@/components/menu";
import Modal from "@/components/modal";
import ModalAprovacaoErros from "@/components/modalAprovacaoErros";
import WellcomeModal from "@/components/wellcomeModal";
import HomeDashboard from "@/components/homeDashboard";
import LoadingScreen from "@/components/loadingScreen";
import RelatoriErrorsModal from "@/components/relatoriErrorsModal";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { useModal } from "@/providers/modaisProvider";
import QADashboard from "@/components/managerDashboard";
import CuratorDashboard from "@/components/curatorDashboard";

const Home: NextPage = () => {
  const { loadingScreen, dashPage } = useModal();
  const [isFirstVisit, setFirstVitit] = useState(true);

  const componentsPageDash: JSX.Element[] = [
    <HomeDashboard key={0} />,
    <QADashboard key={1} />,
    <CuratorDashboard key={2} />,
  ];

  return (
    <>
      <Seo
        title="UMAMI IA"
        description="Robo de qualidade para verificação de planilhas"
      />
      <main className="bg-branco-secundario">
        <Modal />
        {isFirstVisit && <WellcomeModal setFirstVitit={setFirstVitit} />}
        {loadingScreen && <LoadingScreen />}
        <Menu />
        <div className="flex justify-end">
          {componentsPageDash[dashPage]}
          <ModalAprovacaoErros />
        </div>
      </main>
    </>
  );
};
export default Home;
