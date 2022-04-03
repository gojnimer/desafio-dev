import {  useState } from "react";
import { ICnabValues, IReturnFileReader } from "../../interfaces";
import { processCNAB } from "../../utils";

export const useFileReader = (): IReturnFileReader => {
  const [previewData, setPreviewData] = useState<Array<ICnabValues>>();
  const cnabFileDropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files?.length) {
      const process: Array<Array<ICnabValues | string> | boolean> =
        await Promise.all(
          Array.from(e.dataTransfer.files).map(
            async (file: any) => await processCNAB(file).catch(() => false)
          )
        );
      if (process.filter((x) => x).length) {
        const result = process
          .filter((x) => x !== false && typeof x !== "string")
          .reduce((a: any[], b) => a.concat(b), []) as Array<ICnabValues>;
        setPreviewData(result);
      }
    }
  };
  const cnabFileClickHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target?.files?.length) {
      const process: Array<Array<ICnabValues | string> | boolean> =
        await Promise.all(
          Array.from(e.target.files).map(
            async (file: any) => await processCNAB(file).catch(() => false)
          )
        );
      if (process.filter((x) => x).length) {
        console.log(process);
        const result = process
          .filter((x) => x !== false && typeof x !== "string")
          .reduce((a: any[], b) => a.concat(b), []) as Array<ICnabValues>;
        setPreviewData(result);
      }
    }
  };
  return {
    cnabFileDropHandler,
    cnabFileClickHandler,
    previewData,
    setPreviewData,
  };
};
