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
import { useData } from "@/providers/dataProvider";
import ManagerDashboard from "@/components/managerDashboard";

const Home: NextPage = () => {
  const { auth } = useUser();
  const { loadingScreen, dashPage } = useModal();
  const router = useRouter();
  const { repitedSku } = useData();
  const [isFirstVisit, setFirstVitit] = useState(true);

  if (!auth) {
    if (typeof window !== "undefined") {
      router.push("/");
    }
  }

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

  const componentsPageDash: JSX.Element[] = [
    <HomeDashboard key={0} />,
    <ManagerDashboard key={1} />,
  ];

  return (
    <>
      <Seo
        title="UMAMI IA"
        description="Robo de qualidade para verificação de planilhas"
      />
      <main className="bg-branco-secundario">
        <Modal />
        {repitedListlength > 0 && <ModalSku />}
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
