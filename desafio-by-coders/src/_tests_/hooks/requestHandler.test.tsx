import axios from 'axios'
import { cleanup, renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useRequestHandler } from '../../hooks'

jest.mock('axios')
jest.useFakeTimers()

describe('Request Handler Hook Functions', () => {
    afterEach(cleanup)

    test('Should GET a endpoint with success', async () => {
        const data = {
            mock: 'teste'
        }
        axios.get = jest.fn().mockImplementationOnce(
            async () =>
                await Promise.resolve({
                    status: 200,
                    data
                })
        )
        const { result } = renderHook(() =>
            useRequestHandler({
                request: async () => await axios.get('/')
            })
        )

        await waitFor(() => {
            expect(result.current.state).toEqual(data)
        })
    })

    test('Should GET a endpoint with success and map the response', async () => {
        const data = {
            mock: 'teste'
        }
        axios.get = jest.fn().mockImplementationOnce(
            async () =>
                await Promise.resolve({
                    status: 200,
                    data
                })
        )
        const { result } = renderHook(() =>
            useRequestHandler({
                request: async () => await axios.get('/'),
                responseMapper: (response: any) => {
                    return { mappedResponse: response }
                }
            })
        )

        await waitFor(() => {
            expect(result.current.state).toEqual({ mappedResponse: data })
        })
    })

    test('Should GET a endpoint with success passing custom arguments to the function', async () => {
        const data = {
            mock: 'teste'
        }
        axios.get = jest.fn().mockImplementationOnce(
            async () =>
                await Promise.resolve({
                    status: 200,
                    data
                })
        )
        const { result } = renderHook(() =>
            useRequestHandler({
                request: async (customArgs: any) => {
                    return customArgs ? await axios.get('/') : await Promise.reject(new Error('noArgs'))
                },
                requestParams: data
            })
        )

        await waitFor(() => {
            expect(result.current.state).toEqual(data)
        })
    })

    test('Should GET a endpoint failing after 3 retries', async () => {
        const mockDataWhenFail = {
            mock: 'teste'
        }
        axios.get = jest.fn().mockImplementation(
            async () =>
                // eslint-disable-next-line prefer-promise-reject-errors
                await Promise.reject({
                    status: 400
                })
        )
        const { result } = renderHook(() =>
            useRequestHandler({
                request: async () => await axios.get('/'),
                requestRetryAttempts: 3,
                mockDataWhenFail,
                cancelableRequest: true
            })
        )

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(2)
        })
        await waitFor(() => {
            expect(result.current.hasRequestError).toEqual(true)
        })
        await waitFor(() => {
            expect(result.current.state).toEqual(mockDataWhenFail)
        })
    })

    test('Should GET a endpoint failing after 1 retries and call retry function', async () => {
        const data = {
            mock: 'teste'
        }
        axios.get = jest.fn().mockImplementationOnce(
            async () =>
                // eslint-disable-next-line prefer-promise-reject-errors
                await Promise.reject({
                    status: 400
                })
        )
        const { result } = renderHook(() =>
            useRequestHandler({
                request: async () => await axios.get('/')
            })
        )

        await waitFor(() => {
            expect(result.current.hasRequestError).toEqual(true)
        })

        axios.get = jest.fn().mockImplementationOnce(
            async () =>
                await Promise.resolve({
                    status: 200,
                    data
                })
        )
        act(() => {
            result.current.refresh()
        })
        await waitFor(() => {
            expect(result.current.state).toEqual(data)
        })
    })
})
