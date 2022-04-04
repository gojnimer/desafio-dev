import React, { createContext, ReactNode, useState } from "react";
import { useRequestHandler } from "../../hooks";
import { ICnabStoreValues } from "../../interfaces";
import { clearStoreList, fetchStoreList } from "../../services";
import { mapCnabByStore } from "../../utils";

export interface CnabContextProps {
  listData?: ICnabStoreValues[],
  isListLoaded: boolean,
  refreshList(): void
  clearList(): void
}

const defaultValues = {};

const CnabContext = createContext<CnabContextProps>(
  defaultValues as CnabContextProps
);

const CnabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state: listData, refresh: refreshList, requestSuccessfullyCompleted: isListLoaded, setState: setListData } = useRequestHandler<ICnabStoreValues[]>({
    request: fetchStoreList as any,
    responseMapper: mapCnabByStore as any,
    requestRetryAttempts: 3,
    mockDataWhenFail: []
  })

  const clearList = async () => {
    setListData(undefined)
    await clearStoreList()
    refreshList()
  }
  return (
    <CnabContext.Provider
      value={{ listData, refreshList, clearList, isListLoaded }}
    >
      {children}
    </CnabContext.Provider>
  );
};

const useCnabContext = (): CnabContextProps => {
  return React.useContext(CnabContext);
};

export { CnabContext, CnabProvider, useCnabContext };
