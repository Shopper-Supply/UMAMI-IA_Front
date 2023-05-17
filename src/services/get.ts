import { ICurator, IUserDetail } from "@/interfaces/people";
import api from "./";
import { IErrosTypes } from "@/interfaces/errors";
import { IPlace } from "@/interfaces/place";
import { IhomeDashboard } from "@/interfaces/dashboard";

export function getCurators(
  token: string,
  setCurators: React.Dispatch<React.SetStateAction<ICurator[]>>
) {
  // Mostrar curadores.
  const curatores = api
    .get("/curadores", {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => setCurators(res.data))
    .catch((err) => console.error(err));
}

export function getErrorTypes(
  token: string,
  setErrorTypes: React.Dispatch<React.SetStateAction<IErrosTypes[]>>
) {
  api
    .get("/erros", {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => setErrorTypes(res.data));
}

export function getPlaces(
  token: string,
  setPlaces: React.Dispatch<React.SetStateAction<IPlace[]>>
) {
  api
    .get("/canal_de_vendas", {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => setPlaces(res.data));
}

export function getProfile(token: string): Promise<IUserDetail> {
  return api
    .get("usuarios/perfil", {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => res.data);
}

export function getHomeDashboardInfos(
  token: string,
  setDashboardHome: React.Dispatch<React.SetStateAction<IhomeDashboard>>
): Promise<IhomeDashboard | void> {
  return api
    .get("dashboard/grupos/", {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => setDashboardHome(res.data));
}
