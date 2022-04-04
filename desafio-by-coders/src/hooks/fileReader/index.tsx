import { useState } from "react";
import { useMessageCenterContext } from "../../contexts/messageCenter";
import { ICnabValues, IReturnFileReader } from "../../interfaces";
import { processCNAB } from "../../utils";

export const useFileReader = (): IReturnFileReader => {
  const { snackbarHelper: {
    displayMessage
  } } = useMessageCenterContext();
  const [previewData, setPreviewData] = useState<Array<ICnabValues>>();

  const processFile = async (fileList: FileList) => {
    const processing: Array<Array<ICnabValues | string> | boolean> =
      await Promise.all(
        Array.from(fileList).map(
          async (file: any) => await processCNAB(file).catch((x) => x)
        )
      );
    if (processing.filter((x) => x && typeof x !== 'string').length) {
      const result = processing
        .filter((x) => x !== false && typeof x !== "string")
        .reduce((a: any[], b) => a.concat(b), []) as Array<ICnabValues>;
      setPreviewData(result);
    }
    if (processing
      .filter((x) => typeof x === 'string').length) {
      displayMessage(`Um ou mais arquivos não foram processados: [${processing
        .filter((x) => typeof x === 'string').join(', ')}]. Verifique a formatação/extensão e tente novamente.`, 5000)
    }
  }
  const cnabFileDropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files?.length) processFile(e.dataTransfer.files)
  };
  const cnabFileClickHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target?.files?.length) processFile(e.target.files)
  };
  return {
    cnabFileDropHandler,
    cnabFileClickHandler,
    previewData,
    setPreviewData,
  };
};
