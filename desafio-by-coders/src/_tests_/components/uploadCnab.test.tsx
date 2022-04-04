import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  act
} from "@testing-library/react";
import axios from "axios";
import { UploadCnab } from "../../components";
import { ContextWrapper } from "../testBed";
import mock from "../testBed/cnabMock";

jest.mock("axios");

describe("<UploadCnab />", () => {
  beforeEach(() => {
    cleanup()
    jest.clearAllMocks();
  });
  test("Should render UploadCnab successfully", async () => {
    render(
      <ContextWrapper>
        <UploadCnab />
      </ContextWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Importar CNAB')).toBeInTheDocument()
    })

    //Misc branch cover
    fireEvent.dragOver(screen.getByTestId('upload'))
    fireEvent.click(screen.getByTestId('upload'))
    fireEvent.drop(screen.getByTestId('upload'), {
      dataTransfer: {
        files: []
      }
    })
    fireEvent.change(screen.getByTestId('upload'), {
      target: {
        files: []
      }
    })
    //

    
  });

  test("Should review a file dragging successfully and cancel", async () => {
    render(
      <ContextWrapper>
        <UploadCnab />
      </ContextWrapper>
    );
    await waitFor(() => {
      expect(screen.getByText('Importar CNAB')).toBeInTheDocument()
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.drop(screen.getByTestId('upload'), {
        dataTransfer: {
          files: [new Blob([mock.plainFileString], {
            type: "text/plain",
          })]
        }
      })
    })
    await waitFor(() => {
      expect(screen.getByText('Revisar Informações')).toBeInTheDocument()
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(screen.getByText('Cancelar'))
    })
    await waitFor(() => {
      expect(screen.getByText('Importar CNAB')).toBeInTheDocument()
    })
  });

  test("Should upload a file successfully", async () => {
    axios.get = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ data: mock.parsedFileString }))
    axios.post = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ status: 201 }))
    render(
      <ContextWrapper>
        <UploadCnab />
      </ContextWrapper>
    );
    await waitFor(() => {
      expect(screen.getByText('Importar CNAB')).toBeInTheDocument()
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByTestId('upload'), {
        target: {
          files: [new Blob([mock.plainFileString], {
            type: "text/plain",
          }), new File([""], 'fake.test')]
        }
      })
    })
    await waitFor(() => {
      expect(screen.getByText('Revisar Informações')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Enviar'))

    await waitFor(() => {
      expect(axios.get).toBeCalled()
    })
  });

  test("Should attemp to upload a file and fail", async () => {
    axios.get = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ data: [] }))
    axios.post = jest.fn().mockImplementationOnce(async () => await Promise.reject({ status: 400 }))
    render(
      <ContextWrapper>
        <UploadCnab />
      </ContextWrapper>
    );
    await waitFor(() => {
      expect(screen.getByText('Importar CNAB')).toBeInTheDocument()
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByTestId('upload'), {
        target: {
          files: [new Blob([mock.plainFileString], {
            type: "text/plain",
          })]
        }
      })
    })
    await waitFor(() => {
      expect(screen.getByText('Revisar Informações')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Enviar'))

    await waitFor(() => {
      expect(screen.getByText('Ocorreu um erro, tente novamente.')).toBeInTheDocument()
    })
  });
});
