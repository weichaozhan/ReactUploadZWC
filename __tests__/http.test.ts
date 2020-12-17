import http from '../src/http';

const xhrMockObj = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status,
  onreadystatechange: jest.fn(),
  response: JSON.stringify({

  }),
  onload: jest.fn()
};

const xhrMockClass = () => xhrMockObj;

// @ts-ignore
window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

setTimeout(() => {
  // @ts-ignore
  xhrMockObj['onreadystatechange']();
  xhrMockObj['onload']();
}, 1000);
// function mockFetch(status: number, data?: { [key: string]: string }[]) {
// }
// const xhrAPI = new XHRAPI();

// mockFetch(200, [data]);
      
// const res = await xhrAPI.fetchAllRepositories();

// expect(res).toEqual([data]);
describe('http', () => {
  test('test', async () => {
    const result = await http({
      method: 'post',
      url: '/user/upload'
    });
    console.log('result', result);
  });
});
