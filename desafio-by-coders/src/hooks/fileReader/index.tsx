import { useState } from "react";
import { ICnabValues } from "../../interfaces";
import { processCNAB } from "../../utils";

export const useFileReader = () => {
  const [previewData, setPreviewData] = useState<Array<ICnabValues | string>>();
  const cnabFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target?.files?.length) {
      const process: Array<Array<ICnabValues | string> | boolean> =
        await Promise.all(
          Array.from(e.target.files).map(
            async (file: any) => await processCNAB(file).catch(() => false)
          )
        );
      if (process.filter((x) => x).length) {
        const result = process
          .filter((x) => x !== false)
          .reduce((a: any[], b) => a.concat(b), []) as Array<
          ICnabValues | string
        >;
        console.log(result);
        setPreviewData(result);
      }
    }
  };
  return {
    cnabFileHandler,
    previewData,
  };
};
