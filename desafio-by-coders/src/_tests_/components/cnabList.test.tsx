import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
  } from "@testing-library/react";
  import { CnabList } from "../../components";
  import { ContextWrapper } from "../testBed";
import mock from "../testBed/cnabMock";
  
  jest.mock("axios");
  
  describe("<CnabList />", () => {
    beforeEach(() => {
      cleanup()
      jest.clearAllMocks();
    });
    test("Should render Cnab list and expand the first item informations", async () => {
      render(
        <ContextWrapper>
          <CnabList data={mock.mappedCnabListByStore} />
        </ContextWrapper>
      );
      await waitFor(() => {
        expect(screen.getByText('JOHN DOE123')).toBeInTheDocument()
      })
      fireEvent.click(screen.getByText('JOHN DOE123'))
      await waitFor(() => {
        expect(screen.getByTestId('lightbox-cnab-list')).toBeInTheDocument()
      })
      fireEvent.click(screen.getAllByText('Data')[0])
      fireEvent.click(screen.getByTestId('lightbox-cnab-list'))
      await waitFor(() => {
        expect(screen.queryByTestId('lightbox-cnab-list')).not.toBeInTheDocument()
      })
    });
});
  