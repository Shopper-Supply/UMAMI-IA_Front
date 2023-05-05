import { useData } from "@/providers/dataProvider";
import { error } from "./toast";
import { useRouter } from "next/router";
import { useUser } from "@/providers/userProvider";
import { useModal } from "@/providers/modaisProvider";

export function findCurator(
  curatorsList: any[],
  data: any,
  getObj: boolean = false
) {
  const curator = curatorsList.find(
    (curador) => curador.name?.toLowerCase() == data.curator.toLowerCase()
  );

  if (getObj) {
    return curator;
  }

  return curator?.id;
}

export function findPlace(placesList: any[], data: any) {
  const place = placesList.find(
    (place) =>
      place.name?.toLowerCase() == data.place.toLowerCase() &&
      place.mall?.toUpperCase() == data.mall.toUpperCase()
  );

  return place;
}

export function verifyToken(setAuth: any, hideModal: any, router: any) {
  const token = sessionStorage.getItem("UMAMI@TOKEN");
  if (!token) {
    error("SUAS CREDENCIAIS DE ACESSO EXPIRARAM");
    setAuth(false);
    // sessionStorage.clear();
    hideModal();
    router.push("/");
    return false;
  } else {
    return true;
  }
}
