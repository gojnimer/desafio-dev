import { ReactNode } from "react";

export interface IReturnModalHelper {
  render(children?: ReactNode): ReactNode;
  closeModal(): void;
  openModal(): void;
}
