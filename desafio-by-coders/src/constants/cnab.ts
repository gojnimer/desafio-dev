const transactionOperators: (string | null)[] = [
  null,
  "+",
  "-",
  "-",
  "+",
  "+",
  "+",
  "+",
  "+",
  "-",
];
const transactionDescription: Record<string, string> = {
  "1": "Débito",
  "2": "Boleto",
  "3": "Financiamento",
  "4": "Crédito",
  "5": "Recebimento Empréstimo",
  "6": "Vendas",
  "7": "Recebimento TED",
  "8": "Recebimento DOC",
  "9": "Aluguel",
};

export { transactionOperators, transactionDescription };
