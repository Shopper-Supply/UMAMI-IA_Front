import { ICurator, IUserDetail, IUserRelatory } from "@/interfaces/people";
import api from "./";
import { IErrosTypes } from "@/interfaces/errors";
import { IMallDash, IPlace } from "@/interfaces/place";
import { IShoppingDash, IhomeDashboard } from "@/interfaces/dashboard";
import { error } from "@/utils/toast";

export function getCurators(
  token: string | undefined,
  setCurators: React.Dispatch<React.SetStateAction<ICurator[]>>,
  role_id?: number
) {
  // Mostrar curadores.
  if (role_id != 1) {
    const curatores = api
      .get("/curadores", {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        if (res) {
          setCurators(res.data);
        }
      })
      .catch((err) => console.error(err));
  } else {
    const curatores = api
      .get("/curadores", {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        if (res) {
          setCurators(res.data);
        }
      })
      .catch((err) => console.error(err));
  }
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

export function getAllUsers(
  token: string | undefined,
  setAllUsers: React.Dispatch<React.SetStateAction<IUserRelatory[]>>
): Promise<IUserRelatory | void> {
  return api
    .get("/usuarios", {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => setAllUsers(res.data));
}

export function getShoppings(
  token: string | undefined,
  setShoppings: React.Dispatch<React.SetStateAction<IMallDash[]>>
): Promise<IMallDash | void> {
  return api
    .get("/dashboard/shopping", {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => {
      setShoppings(res.data);
    })
    .catch((err) => console.error(err));
}

export function getRelatoryInCSV(token: string | undefined, initDate?: string | undefined, finshDate?: string | undefined){
  return api.get(initDate && finshDate ? `/dashboard/export/?start_date=${initDate}&end_date=${finshDate}`: "/dashboard/export", {
    responseType: 'blob',
    headers: {
      Authorization: "Token " + token,
    },
  })
  .then( res => {
    const blob = new Blob([res.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Relatorio_De_Erros.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(err => console.error(err));
}
