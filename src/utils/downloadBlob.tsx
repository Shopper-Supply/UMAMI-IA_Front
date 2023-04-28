import b64toBlob from "b64-to-blob";
import { saveAs } from "file-saver";

export const triggerBase64Download = (base64: string, name: string) => {
  name = name.split(".")[0];
  if (base64.includes("data:")) {
    const base64Contents = base64.split(",");
    const contentType = "application/vnd.ms-excel";
    const base64Data = base64Contents[1];
    // b64toBlob()
    const blob = b64toBlob(base64Data, contentType);
    const file = new File([blob], `${name} verificada.xlsx`);
    saveAs(file);
  } else {
    throw new Error("Invalid extension to base64 string");
  }
};
