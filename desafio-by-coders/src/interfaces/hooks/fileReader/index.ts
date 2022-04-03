import { SetStateAction } from "react";

interface ICnabValues {
  type: number;
  date: string;
  value: number;
  ownerDocument: string;
  bankCard: string;
  timestamp: string;
  storeName: string;
  ownerName: string;
}

interface ICnabStoreValues {
  storeName: string;
  ownerName: string;
  ownerDocument: string;
  transactions: ICnabStoreTransaction[]
  currentBalance: number
}

interface ICnabStoreTransaction {
  type: number;
  date: string;
  value: number;
  bankCard: string;
  timestamp: string;
}

interface IReturnFileReader {
  previewData?: Array<ICnabValues>;
  setPreviewData: React.Dispatch<SetStateAction<ICnabValues[] | undefined>>;
  cnabFileDropHandler(e: React.DragEvent<HTMLDivElement>): Promise<void>;
  cnabFileClickHandler(e: React.ChangeEvent<HTMLInputElement>): Promise<void>;
}

export type {
    ICnabValues,
    ICnabStoreValues,
    ICnabStoreTransaction,
    IReturnFileReader
}