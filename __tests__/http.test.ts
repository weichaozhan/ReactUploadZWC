import http from '../src/http';

const xhrMockObj = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status,
  onreadystatechange: jest.fn(),
  response: {
    status: 500
  },
  onload: jest.fn()
};

const xhrMockClass = () => xhrMockObj;

// @ts-ignore
window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

setTimeout(() => {
  // @ts-ignore
  xhrMockObj['onload']();
});

describe('http', () => {
  test('test', async () => {
    const result = await http({
      method: 'post',
      url: '/user/upload'
    });
    expect(result).toEqual({
      status: 500
    });
  });
});
