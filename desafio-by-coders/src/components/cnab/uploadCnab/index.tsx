import { useState } from "react";
import { useFileReader } from "../../../hooks";
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
  AsideContainer,
} from "./style";

export const UploadCnab: React.FC<{
  onClose?(): void;
  isModal?: boolean;
}> = ({ onClose, isModal }) => {
  const {
    cnabFileClickHandler,
    cnabFileDropHandler,
    previewData,
    setPreviewData,
  } = useFileReader();
  const [isFileHovering, setIsFileHovering] = useState<boolean>(false);
  return (
    <Container layout $isModal={isModal}>
      <Header>
        <Title>{!previewData ? "Importar CNAB" : "Revisar Informações"}</Title>
        {isModal && (
          <CloseButton
            onClick={onClose}
            whileTap={{
              scale: 0.9,
            }}
          />
        )}
      </Header>

      {previewData ? (
        <>
          <CnabPreview data={previewData} />
          <AsideContainer>
            <Button
              onClick={() => setPreviewData(undefined)}
              deleteButton
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
            >
              Enviar
            </Button>
          </AsideContainer>
        </>
      ) : (
        <FileContainer
          $isFileHovering={isFileHovering}
          onDrop={(e) => {
            setIsFileHovering(false);
            cnabFileDropHandler(e);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragEnter={() => setIsFileHovering(true)}
          onDragLeave={() => setIsFileHovering(false)}
        >
          <Icon
            className={`bx bxs-file-txt ${isFileHovering ? "bx-flashing" : ""}`}
          />
          <UploadText>
            Arraste um ou mais arquivos ou{" "}
            <LinkText>
              <input
                style={{
                  display: "none",
                }}
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
