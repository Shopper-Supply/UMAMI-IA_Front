export function extractDate(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);
  const day = String(dateTime.getDate()).padStart(2, "0");
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const year = dateTime.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
