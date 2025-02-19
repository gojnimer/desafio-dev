/* eslint-disable no-eval */
import { transactionOperators } from "../../../constants/cnab";
import { ICnabStoreValues, ICnabValues } from "../../../interfaces";

const processCNAB = (cnabTxt: Blob): Promise<Array<ICnabValues | string>> =>
  new Promise((resolve, reject) => {
    if (cnabTxt.type !== "text/plain") reject((cnabTxt as any).name);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      const conversion = text
        ?.toString()
        .split(/\r?\n/)
        .map((line: string, i: number) => {
          if (!line || line.length !== 80)
            return `Invalid CNAB line at index ${i}`;
          return {
            type: Number(line.substring(0, 1)),
            date: line.substring(1, 9),
            value: Number(line.substring(9, 19).trim()) / 100,
            ownerDocument: line.substring(19, 30),
            bankCard: line.substring(30, 42),
            timestamp: line.substring(42, 48),
            storeName: line.substring(48, 62).trim(),
            ownerName: line.substring(62, 81).trim(),
          };
        });
      if (conversion?.filter((x) => typeof x !== "string").length)
        resolve(conversion);
      reject((cnabTxt as any).name);
    };
    reader.readAsText(cnabTxt);
  });

const mapCnabByStore = (cnabList: ICnabValues[]): ICnabStoreValues[] => {
  return cnabList.reduce(
    (
      prev: ICnabStoreValues[],
      { storeName, ownerDocument, ownerName, ...current }: ICnabValues
    ) => {
      const index = prev.findIndex(
        ({
          storeName: previewStoreName,
          ownerDocument: previewOwnerDocument,
        }) =>
          previewStoreName === storeName &&
          previewOwnerDocument === ownerDocument
      );
      if (index === -1) {
        prev.push({
          storeName,
          ownerName,
          ownerDocument,
          transactions: [{ ...current }],
          currentBalance: eval(
            `0 ${transactionOperators[current.type]} ${current.value}`
          ),
        });
      } else {
        prev[index].currentBalance = eval(
          `${prev[index].currentBalance} ${
            transactionOperators[current.type]
          } ${current.value}`
        );
        prev[index].transactions.push(current);
      }
      return prev;
    },
    []
  ) as ICnabStoreValues[];
};

const formatCnabDate = (date: string, timestamp: string) => {
  const data = Date.parse(
    `${date.substring(4, 6)}/${date.substring(6, 8)}/${date.substring(
      0,
      4
    )} ${timestamp.substring(0, 2)}:${timestamp.substring(
      2,
      4
    )}:${timestamp.substring(4, 6)}  GMT-0300`
  );
  return new Date(data).toLocaleString();
};

export { processCNAB, mapCnabByStore, formatCnabDate };
