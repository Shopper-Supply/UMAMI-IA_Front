import { ISheetRequest, ICompareSheets } from "@/interfaces/sheet";
import { IFormLogin } from "@/interfaces/form";
import { IErroLogResponse, IErroLogBody } from "@/interfaces/errors";
import { IPlaceRequest } from "@/interfaces/place";
import api from "./";

export function login(data?: IFormLogin) {
  const response = api.post("/login/", data).then((res) => res.data);

  return response;
}

export function validateSheet(token: string, body: FormData) {
  const response = api
    .post("/planilha/", body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err));
  return response;
}

export function submitErrorLog(
  token: string,
  body: IErroLogBody
): Promise<IErroLogResponse> {
  const response = api
    .post("/erros/log/", body, {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => res.data);

  return response;
}

export function compareSheets(token: string, body: FormData) {
  const response = api
    .post("/planilha/comparar/", body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));

  return response;
}

export function createPlace(token: string, body: IPlaceRequest) {
  const response = api
    .post("canal_de_vendas/", body, {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => res.data);

  return response;
}
