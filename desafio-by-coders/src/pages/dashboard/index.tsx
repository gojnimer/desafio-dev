import { CnabList, UploadCnab } from "../../components";
import { useModalHelper, useRequestHandler } from "../../hooks";
import { fetchStoreList } from "../../services";
import { mapCnabByStore } from "../../utils";
import {
  ButtonWrapper,
  Container,
  Title,
  TitleWrapper,
  UploadButton,
} from "./styles";

export const Dashboard: React.FC = () => {
  const { render: renderModal, openModal, closeModal } = useModalHelper();
  const { state: data } = useRequestHandler<any[]>({
    request: fetchStoreList as any,
    responseMapper: mapCnabByStore as any,
    requestRetryAttempts: 3
  })

  return (
    <Container>
      {data && data.length > 0 ? (
        <>
          <TitleWrapper>
            <Title>Relatório por Lojas</Title>
          </TitleWrapper>
          <CnabList data={data} />
          <ButtonWrapper>
            <UploadButton
              whileTap={{
                scale: 0.95,
              }}
              onClick={openModal}
            >
              Enviar CNAB
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
