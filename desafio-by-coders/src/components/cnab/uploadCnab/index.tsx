import { useState } from "react";
import { useCnabContext } from "../../../contexts/cnabContext";
import { useMessageCenterContext } from "../../../contexts/messageCenter";
import { useFileReader } from "../../../hooks";
import { postTransactions } from "../../../services";
import { Loader } from "../../shared/loader";
import { CnabPreview } from "../cnabPreview";
import {
  Button,
  CloseButton,
  Container,
  FileContainer,
  Header,
  Icon,
  LinkText,
  UploadText,
  Title,
  AsideContainer
} from "./style";

export const UploadCnab: React.FC<{
  onClose?(): void;
  isModal?: boolean;
}> = ({ onClose, isModal }) => {

  const { snackbarHelper: {
    displayMessage,
    dismissMessage
  } } = useMessageCenterContext()

  const {
    cnabFileClickHandler,
    cnabFileDropHandler,
    previewData,
    setPreviewData,
  } = useFileReader();

  const {
    refreshList
  } = useCnabContext()

  const [isLoading, setIsLoading] = useState(false)


  const handleCreate = async () => {
    dismissMessage()
    setIsLoading(true)
    if (previewData) {
      const response = await postTransactions(previewData).catch((err) => {
        setIsLoading(false)
        return err
      })
      if (response.status === 201) {
        refreshList()
        onClose?.()
      } else displayMessage('Ocorreu um erro, tente novamente.')
    }


  }
  return (
    <Container $isModal={isModal}>
      <Header>
        <Title>{isLoading ? 'Enviando para o servidor' : !previewData ? "Importar CNAB" : "Revisar Informações"}</Title>
        {isModal && (
          <CloseButton
            data-testid="upload-modal-close-btn"
            onClick={onClose}
            whileTap={{
              scale: 0.9,
            }}
          />
        )}
      </Header>

      {previewData ? (
        <>
          {isLoading ? <Loader /> :

            <>
              <CnabPreview data={previewData} />
              <AsideContainer>
                <Button
                  onClick={() => setPreviewData(undefined)}
                  $isDeleteButton
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={handleCreate}
                >
                  Enviar
                </Button>
              </AsideContainer>
            </>}
        </>
      ) : (
        <FileContainer
          onDrop={cnabFileDropHandler}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Icon
            className={`bx bxs-file-txt bx-flashing`}
          />
          <UploadText>
            Arraste um ou mais arquivos ou{" "}
            <LinkText>
              <input
                style={{
                  display: "none",
                }}
                data-testid="upload"
                type="file"
                multiple
                onChange={cnabFileClickHandler}
                onClick={(e: any) => (e.target.value = null)}
              />
              clique aqui
            </LinkText>{" "}
            para procurar.
          </UploadText>
        </FileContainer>
      )}
    </Container>
  );
};
