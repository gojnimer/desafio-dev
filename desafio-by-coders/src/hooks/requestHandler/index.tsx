import React, { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'

type TRetryRequest = (params?: unknown) => void

interface IReturnUseRequestHandler<Type> {
  state: Type | undefined
  setState: React.Dispatch<React.SetStateAction<Type | undefined>>
  refresh: TRetryRequest
  hasRequestError: boolean
  requestSuccessfullyCompleted: boolean
}

interface IUseRequestHandlerParams<Type> {
  request: (options?: unknown) => Promise<AxiosResponse<unknown>>
  cancelableRequest?: boolean
  requestParams?: unknown
  responseMapper?: (response: unknown) => Type
  requestRetryAttempts?: number
  mockDataWhenFail?: Type
}

interface IRequestState {
  retryAttempt: number
  abortController: AbortController
  params?: unknown
  hasRequestError: boolean
  requestSuccessfullyCompleted: boolean
}

type TUseRequestHandler = <Type>(
  initialState: IUseRequestHandlerParams<Type>
) => IReturnUseRequestHandler<Type>

export const useRequestHandler: TUseRequestHandler = <T,>(
  options: IUseRequestHandlerParams<T>
): IReturnUseRequestHandler<T> => {
  const {
    request,
    requestParams,
    cancelableRequest,
    requestRetryAttempts,
    mockDataWhenFail,
    responseMapper
  } = options
  const [state, setState] = useState<T>()
  const [requestState, setRequestState] = useState<IRequestState>({
    retryAttempt: 1,
    abortController: new AbortController(),
    params: requestParams,
    hasRequestError: false,
    requestSuccessfullyCompleted: false
  })

  useEffect(() => {
    const maxRetriesAttempts = requestRetryAttempts ?? 1
    const {
      retryAttempt,
      params,
      hasRequestError,
      abortController,
      requestSuccessfullyCompleted
    }: IRequestState = requestState
    const call = async (): Promise<void> => {
      const newState: IRequestState = { ...requestState }
      const abortParam: { signal?: AbortSignal } = {}
      if (cancelableRequest) abortParam.signal = abortController.signal
      const reqParams = cancelableRequest
        ? ([{ ...abortParam }, params] as const)
        : [params]
      const req = await request(...reqParams).catch(() => {
        const newRetryAttempt = retryAttempt + 1
        if (newRetryAttempt > maxRetriesAttempts) {
          newState.hasRequestError = true
          mockDataWhenFail && setState(mockDataWhenFail)
        } else {
          newState.retryAttempt = newRetryAttempt
        }
      })
      if (req?.data) {
        const response = responseMapper ? responseMapper(req.data) : req.data
        newState.requestSuccessfullyCompleted = true
        setState(response as T)
      }
      if (newState.retryAttempt > retryAttempt)
        await new Promise((r) => setTimeout(r, 500))
      setRequestState(newState)
    }
    if (
      retryAttempt <= maxRetriesAttempts &&
      !requestSuccessfullyCompleted &&
      !hasRequestError
    )
      call()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestState])

  const retry = React.useCallback(
    (params?: unknown) => {
      requestState.abortController.abort()
      const newRequest = {
        retryAttempt: 1,
        params: params,
        hasRequestError: false,
        requestSuccessfullyCompleted: false,
        abortController: new AbortController()
      } as IRequestState
      setState(undefined)
      setRequestState(newRequest)
    },
    [requestState]
  )

  return {
    state,
    setState,
    refresh: retry,
    hasRequestError: requestState.hasRequestError,
    requestSuccessfullyCompleted: requestState.requestSuccessfullyCompleted
  }
}
