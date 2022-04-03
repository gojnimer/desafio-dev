import {
  transactionDescription,
  transactionOperators,
} from "../../../constants/cnab";
import { ICnabValues } from "../../../interfaces";
import { formatCnabDate, prettifyCpf } from "../../../utils";
import { List, ListItem, Text, TextWrapper } from "./styles";

interface IList {
  data: ICnabValues[];
  reduceColumns?: boolean;
}

export const CnabPreview: React.FC<IList> = ({ data, reduceColumns }) => {
  return (
    <List>
      {data.map((store: any, index) => {
        const {
          storeName,
          ownerName,
          ownerDocument,
          value,
          bankCard,
          type,
          date,
          timestamp,
        } = store;
        const dateTime = formatCnabDate(date, timestamp).split(",");
        return (
          <ListItem key={`store-index-${index}`} $reduceColumns={reduceColumns}>
            {!reduceColumns && (
              <>
                <TextWrapper>
                  <Text $isTitle>Loja</Text>
                  <Text>{storeName}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Text $isTitle>Propietário</Text>
                  <Text>{ownerName}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Text $isTitle>Documento</Text>
                  <Text>{prettifyCpf(ownerDocument)}</Text>
                </TextWrapper>
              </>
            )}

            <TextWrapper>
              <Text $isTitle>Descrição</Text>
              <Text>{transactionDescription[type.toString()]}</Text>
            </TextWrapper>
            <TextWrapper>
              <Text $isTitle>Data</Text>
              <Text>{dateTime[0]}</Text>
            </TextWrapper>
            <TextWrapper>
              <Text $isTitle>Hora</Text>
              <Text>{dateTime[1]}</Text>
            </TextWrapper>
            <TextWrapper>
              <Text $isTitle>Cartão</Text>
              <Text>{bankCard}</Text>
            </TextWrapper>

            <TextWrapper>
              <Text $isTitle>Valor</Text>
              <Text $isNegative={transactionOperators[type] !== "+"}>
                {(transactionOperators[type] === "-" ? "-" : "") +
                  value.toFixed(2)}
              </Text>
            </TextWrapper>
          </ListItem>
        );
      })}
    </List>
  );
};
