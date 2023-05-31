<<<<<<< HEAD
import api from ".";

export function deleteSku(token: string | undefined, sku_id: string) {
  // Apagar um Sku
  const sku = api
    .delete(`/sku/${sku_id}`, {
=======
import { IUserDetail } from "@/interfaces/people";
import api from ".";

export function deleteUser(token: string | undefined, body: IUserDetail) {
  body.is_active = false;
  const response = api
    .patch(`suspender/usuario/${body.id}/`, body, {
>>>>>>> b973aa2444661d916f25fa2cf8247ac5f003ccfa
      headers: {
        Authorization: "Token " + token,
      },
    })
<<<<<<< HEAD
    .then((res) => res)
    .catch((err) => console.error(err));
  return sku;
=======
    .then((res) => res.data)
    .catch((err) => console.error(err));

  return response;
}

export function activeUser(token: string | undefined, body: IUserDetail) {
  body.is_active = true;
  const response = api
    .patch(`suspender/usuario/${body.id}/`, body, {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));

  return response;
>>>>>>> b973aa2444661d916f25fa2cf8247ac5f003ccfa
}
