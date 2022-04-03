import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirect: React.FC<{ to: string }> = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

export const prettifyCpf = (cpf: string) =>
  cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");

export * from "./hooks/fileReader";
