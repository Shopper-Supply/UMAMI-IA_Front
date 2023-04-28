import { useData } from "@/providers/dataProvider";

export function findCurator(curatorsList: any[], data: any) {
  const curator = curatorsList.find(
    (curador) => curador.name?.toLowerCase() == data.curator.toLowerCase()
  );

  return curator?.id;
}

export function findPlace(placesList: any[], data: any) {
  const place = placesList.find(
    (place) =>
      place.name?.toLowerCase() == data.place.toLowerCase() &&
      place.abbr?.toUpperCase() == data.abbr.toUpperCase()
  );

  return place;
}
