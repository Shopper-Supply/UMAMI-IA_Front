import api from ".";

export function deleteSku(token: string | undefined, sku_id: string) {
  // Apagar um Sku
  const sku = api
    .delete(`/sku/${sku_id}`, {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((res) => res)
    .catch((err) => console.error(err));
  return sku;
}
