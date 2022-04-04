import { CnabList, Loader, UploadCnab } from "../../components";
import { useCnabContext } from "../../contexts/cnabContext";
import { useMessageCenterContext } from "../../contexts/messageCenter";
import { useModalHelper, useSnackbarHelper } from "../../hooks";
import {
  ButtonWrapper,
  Container,
  Title,
  TitleWrapper,
  UploadButton,
  LoaderContainer
} from "./styles";

export const Dashboard: React.FC = () => {
  const { modalHelper: { render: renderModal, openModal, closeModal } } = useMessageCenterContext();
  const {
    listData,
    clearList
  } = useCnabContext()

  return listData === undefined ?
    <LoaderContainer>
      <Loader />
    </LoaderContainer> : (
      <Container>
        {listData.length > 0 ? (
          <>
            <TitleWrapper>
              <Title>Relatório por Lojas</Title>
            </TitleWrapper>
            <CnabList data={listData} />
            <ButtonWrapper>
              <UploadButton
                whileTap={{
                  scale: 0.95,
                }}
                $isDeleteButton
                onClick={clearList}
              >
                Esvaziar Lista
              </UploadButton>
              <UploadButton
                whileTap={{
                  scale: 0.95,
                }}
                onClick={openModal}
              >
                Adicionar CNAB
              </UploadButton>
            </ButtonWrapper>
          </>
        ) : (
          <UploadCnab />
        )}
        {renderModal(<UploadCnab isModal onClose={() => closeModal()} />)}
      </Container>
    );
};
