import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import { Dashboard } from "../../pages"
import { ContextWrapper } from "../testBed"
import mock from "../testBed/cnabMock"

jest.mock('axios')

describe('<Dashboard />', () => {
    beforeEach(cleanup)
    test('Should render dashboard with a populated list successfully', async () => {
        axios.get = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ data: mock.parsedFileString }))
        render(
            <ContextWrapper>
                <Dashboard />
            </ContextWrapper>)
        await waitFor(() => {
            const element = screen.getByText('Esvaziar Lista')
            expect(element).toBeInTheDocument()
        })
    })

    test('Should render dashboard without any item in successfully', async () => {
        axios.get = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ data: [] }))
        render(
            <ContextWrapper>
                <Dashboard />
            </ContextWrapper>)
        await waitFor(() => {
            const element = screen.getByText('Importar CNAB')
            expect(element).toBeInTheDocument()
        })
    })

    test('Should render dashboard with a populated list and open and close the upload modal', async () => {
        axios.get = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ data: mock.parsedFileString }))
        render(
            <ContextWrapper>
                <Dashboard />
            </ContextWrapper>)
        
        await waitFor(() => {
            expect(screen.getByText('Adicionar CNAB')).toBeInTheDocument()  
        })
        fireEvent.click(screen.getByText('Adicionar CNAB'))
        await waitFor(() => {
            expect(screen.getByTestId('upload-modal-close-btn')).toBeInTheDocument()
        })
        fireEvent.click(screen.getByTestId('upload-modal-close-btn'))
        await waitFor(() => {
            expect(screen.getByText('Relatório por Lojas')).toBeInTheDocument()
        })
    })

    test('Should render dashboard with a populated list and clear the list', async () => {
        axios.get = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ data: mock.parsedFileString }))
        axios.delete = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ status: 200 }))
        render(
            <ContextWrapper>
                <Dashboard />
            </ContextWrapper>)
        await waitFor(() => {
            expect(screen.getByText('Esvaziar Lista')).toBeInTheDocument()
        })
        axios.get = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ data: [] }))
        fireEvent.click(screen.getByText('Esvaziar Lista'))
        await waitFor(() => {
            expect(screen.getByText('Importar CNAB')).toBeInTheDocument()
        })
    })
})