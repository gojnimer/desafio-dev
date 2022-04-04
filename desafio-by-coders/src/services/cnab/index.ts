import axios, { AxiosResponse } from "axios";
import { ICnabValues } from "../../interfaces";

const { REACT_APP_MAIN_API: api } = process.env;

export const fetchStoreList = async (options: {
  signal: AbortSignal;
}): Promise<AxiosResponse<ICnabValues[]>> => {
  return await axios.get(`${api}/cnab`, { ...options });
};

export const postTransactions = async (
  body: ICnabValues[]
): Promise<AxiosResponse<ICnabValues[]>> => {
  return await axios.post(`${api}/cnab`, body);
};

export const clearStoreList = async (): Promise<AxiosResponse<ICnabValues[]>> => {
  return await axios.delete(`${api}/cnab/clear`);
};
