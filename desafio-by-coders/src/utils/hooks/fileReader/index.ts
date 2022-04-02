import { ICnabValues } from "../../../interfaces";

const processCNAB = (cnabTxt: Blob): Promise<Array<ICnabValues | string>> =>
  new Promise((resolve, reject) => {
    if (cnabTxt.type !== "text/plain") reject();
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
            value: (Number(line.substring(9, 19).trim()) / 100),
            ownerDocument: line.substring(19, 30),
            bankCard: line.substring(30, 42),
            timestamp: line.substring(42, 48),
            shopName: line.substring(48, 62).trim(),
            ownerName: line.substring(62, 81).trim(),
          };
        });
      if (conversion?.filter((x) => typeof x !== "string").length)
        resolve(conversion);
      reject();
    };
    reader.readAsText(cnabTxt);
  });

export { processCNAB };
