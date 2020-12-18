interface IParams {
  status: number;
  statusText: string;
}

export const xhrMockClass = (params: IParams) => ({
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: params.status,
  statusText: params.statusText,
  onreadystatechange: jest.fn(),
  response: {
    code: 0
  },
  onload: jest.fn(),
  onerror: jest.fn()
});
