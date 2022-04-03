import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ICnabStoreValues } from "../../../interfaces";
import { prettifyCpf } from "../../../utils";
import { CnabPreview } from "../cnabPreview";
import {
  LightBox,
  List,
  ListItem,
  InfoContainer,
  SelectedItemContainer,
  Text,
  TextWrapper,
} from "./styles";

interface IList {
  data: ICnabStoreValues[];
}

interface IStoreItem extends ICnabStoreValues {
  index: number;
}

export const CnabList: React.FC<IList> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<IStoreItem | undefined>();
  return (
    <>
      <List>
        <AnimatePresence>
          {data.map((store: any, index) => {
            const { storeName, ownerName, ownerDocument, currentBalance } =
              store;
            return (
              <ListItem
                layoutId={`store-layout-${index}`}
                key={`store-index-${index}`}
                onClick={() => setSelectedItem({ ...store, index })}
              >
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
                <TextWrapper>
                  <Text $isTitle>Saldo</Text>
                  <Text $isNegative={currentBalance < 0}>
                    {currentBalance.toFixed(2)}
                  </Text>
                </TextWrapper>
              </ListItem>
            );
          })}
        </AnimatePresence>
      </List>

      <AnimatePresence>
        {selectedItem !== undefined && (
          <LightBox onClick={() => setSelectedItem(undefined)}>
            <SelectedItemContainer
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              layoutId={`store-layout-${selectedItem.index}`}
            >
              <InfoContainer>
                <TextWrapper>
                  <Text $isTitle>Loja</Text>
                  <Text>{selectedItem.storeName}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Text $isTitle>Propietário</Text>
                  <Text>{selectedItem.ownerName}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Text $isTitle>Documento</Text>
                  <Text>{prettifyCpf(selectedItem.ownerDocument)}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Text $isTitle>Saldo</Text>
                  <Text $isNegative={selectedItem.currentBalance < 0}>
                    {selectedItem.currentBalance.toFixed(2)}
                  </Text>
                </TextWrapper>
              </InfoContainer>

              <CnabPreview
                reduceColumns
                data={selectedItem.transactions.map((x) => {
                  return {
                    ownerDocument: selectedItem.ownerDocument,
                    ownerName: selectedItem.ownerName,
                    storeName: selectedItem.storeName,
                    ...x,
                  };
                })}
              />
            </SelectedItemContainer>
          </LightBox>
        )}
      </AnimatePresence>
    </>
  );
};
