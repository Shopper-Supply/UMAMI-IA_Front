import { IRepitedSku, ISheet } from "@/interfaces/sheet";
import api from ".";

export function updateSku(
  token: string | undefined,
  sku_id: string,
  body: IRepitedSku
) {
  // Apagar um Sku
  const sku = api
    .patch(`/sku/${sku_id}`, {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => res)
    .catch((err) => console.error(err));
  return sku;
}
