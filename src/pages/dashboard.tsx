import { NextPage } from "next";
import { useState } from "react";
import Seo from "@/components/seo";
import Menu from "@/components/menu";
import Modal from "@/components/modal";
import ModalAprovacaoErros from "@/components/modalAprovacaoErros";
import WellcomeModal from "@/components/wellcomeModal";
import HomeDashboard from "@/components/homeDashboard";
import LoadingScreen from "@/components/loadingScreen";
import QADashboard from "@/components/managerDashboard";
import RelatoriErrorsModal from "@/components/relatoriErrorsModal";
import CuratorDashboard from "@/components/curatorDashboard";
import iconRobo from "../../public/favicon.ico";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { useModal } from "@/providers/modaisProvider";


const Home: NextPage = () => {
  const { auth } = useUser();
  const {loadingScreen} = useModal();
  const router = useRouter();
  const [isFirstVisit, setFirstVitit] = useState(true);

  const componentsPageDash: JSX.Element[] = [
    <HomeDashboard key={0} />,
    <QADashboard key={1} />,
    <CuratorDashboard key={2} />,
  ];

  return (
    <>
      <Seo title="SUPP" description="Auditor tech-humano" icon={iconRobo} />
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
