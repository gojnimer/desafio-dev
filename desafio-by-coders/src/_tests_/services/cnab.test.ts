import { postTransactions, clearStoreList } from './../../services/cnab/index';
import axios from 'axios'
import { fetchStoreList } from '../../services'
import mock from '../testBed/cnabMock'

jest.mock('axios')

describe('Cnab Service Requests', () => {
  test('Should fetch all cnab records', async () => {
    axios.get = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ data: mock.parsedFileString }))
    const request = await fetchStoreList({} as any)
    expect(request.data).toEqual(mock.parsedFileString)
  })
  test('Should create new cnab records', async () => {
    axios.post = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ status: 201 }))
    const request = await postTransactions(mock.parsedFileString)
    expect(request.status).toEqual(201)
  })
  test('Should clear cnab list', async () => {
    axios.delete = jest.fn().mockImplementationOnce(async () => await Promise.resolve({ status: 200 }))
    const request = await clearStoreList()
    expect(request.status).toEqual(200)
  })
})
