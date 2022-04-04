import { cleanup, renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react'
import { useSnackbarHelper } from '../../hooks'
import { act } from 'react-dom/test-utils'



jest.spyOn(global, 'setTimeout');
jest.useFakeTimers()


describe('Snackbar Helper Hook Functions and Render', () => {
    afterEach(cleanup)

    test('Should render and close a snackbar', async () => {
        const { result } = renderHook(() =>
            useSnackbarHelper()
        )

        act(() => {
            result.current.displayMessage('Testing Hook')
        })


        await waitFor(() => {
            expect(result.current.isOpen).toBe(true)
        })

        act(() => {
            result.current.displayMessage('Testing Hook With Active Timer')
        })

        act(() => {
            result.current.dismissMessage()
        })

        await waitFor(() => {
            expect(result.current.isOpen).toBe(false)
        })
    })

    test('Should render and close a snackbar with setTimeout', async () => {

        const { result } = renderHook(() =>
            useSnackbarHelper()
        )

        act(() => {
            result.current.displayMessage('Testing Hook')
        })


        await waitFor(() => {
            expect(result.current.isOpen).toBe(true)
        })

        act(() => {
            result.current.displayMessage('Testing Hook With Active Timer')
        })

        jest.runAllTimers();

        await waitFor(() => {
            expect(result.current.isOpen).toBe(false)
        })
    })
})
