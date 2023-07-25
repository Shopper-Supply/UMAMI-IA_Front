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
import iconRobo from "../../public/favicon.ico";
import ModalSku from "@/components/modalSku";
import { useData } from "@/providers/dataProvider";
import MarketingPlace from "@/components/marketingPlaces";

const Home: NextPage = () => {
  const { loadingScreen, dashPage } = useModal();
  const [isFirstVisit, setFirstVitit] = useState(true);
  const { repitedSku } = useData();
  const [duplicatedSkuIsOpen, setDuplicatedSkuIsOpen] = useState(false);

  const componentsPageDash: JSX.Element[] = [
    <HomeDashboard key={0} />,
    <QADashboard key={1} />,
    <CuratorDashboard key={2} />,
    <MarketingPlace key={3} />,
  ];

  const getRepitedListlength = () => {
    let length = 0;
    repitedSku.map((e) => {
      if (e.length > 1) {
        length++;
        return;
      }
      return;
    });
    return length;
  };
  const repitedListlength = getRepitedListlength();

  return (
    <>
      <Seo title="SUPP - Shopper supply" description="Auditor tech-humano" />
      <main className="bg-branco-secundario">
        <Modal />
        {isFirstVisit && <WellcomeModal setFirstVitit={setFirstVitit} />}
        {loadingScreen && <LoadingScreen />}
        <Menu />
        {repitedListlength > 0 && !duplicatedSkuIsOpen && (
          <ModalSku
            duplicatedSkuIsOpen={duplicatedSkuIsOpen}
            setDuplicatedSkuIsOpen={setDuplicatedSkuIsOpen}
          />
        )}
        <div className="flex justify-start">
          {componentsPageDash[dashPage]}
          <ModalAprovacaoErros />
        </div>
      </main>
    </>
  );
};
export default Home;
