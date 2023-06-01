import { IUserDetail } from "@/interfaces/people";
import api from ".";

export function deleteUser(token: string | undefined, body: IUserDetail) {
  body.is_active = false;
  const response = api
    .patch(`suspender/usuario/${body.id}/`, body, {
      headers: {
        Authorization: "Token " + token,
      },
    })
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
}
