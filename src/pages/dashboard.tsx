import { NextPage } from "next";
import { useState } from "react";
import Seo from "@/components/seo";
import Menu from "@/components/menu";
import Modal from "@/components/modal";
import ModalAprovacaoErros from "@/components/modalAprovacaoErros";
import WellcomeModal from "@/components/wellcomeModal";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { auth } = useUser();
  const router = useRouter();
  const [isFirstVisit, setFirstVitit] = useState(true);

  if (!auth) {
    if (typeof window !== "undefined") {
      router.push("/");
    }
  }

  return (
    <>
      <Seo
        title="UMAMI IA"
        description="Robo de qualidade para verificação de planilhas"
      />
      <main className="bg-branco-secundario">
        <Menu />
        <Modal />
        <ModalAprovacaoErros />
        {isFirstVisit && <WellcomeModal setFirstVitit={setFirstVitit} />}
      </main>
    </>
  );
};
export default Home;
