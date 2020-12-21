import { xhrMockClass } from '../__mocks__/http.__mock__';

import http, { buildFileName } from '../src/http';

describe('http', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('test post', async () => {
    const success = {
      status: 200,
      statusText: 'success'
    };
    const xhrMockObj = xhrMockClass(success);
    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(() => xhrMockObj);
    setTimeout(() => {
      // @ts-ignore
      xhrMockObj.onload();
    });
    const result = await http({
      method: 'post',
      url: '/user/upload',
      data: {
        test: 'test'
      },
      file: new File(['foo'], 'foo.txt', {
        type: "text/plain",
      })
    });

    expect(result).toEqual({
      code: 0
    });
  });

  

  test('test post files', async () => {
    const success = {
      status: 200,
      statusText: 'success'
    };
    const xhrMockObj = xhrMockClass(success);
    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(() => xhrMockObj);
    setTimeout(() => {
      // @ts-ignore
      xhrMockObj.onload();
    });
    const result = await http({
      method: 'post',
      url: '/user/upload',
      data: {
        test: 'test'
      },
      files: [
        new File(['foo1'], 'foo1.txt', {
          type: "text/plain",
        }),
        new File(['foo2'], 'foo2.txt', {
          type: "text/plain",
        })
      ]
    });

    expect(result).toEqual({
      code: 0
    });
  });

  test('test get', async () => {
    const errMsg = {
      status: 500,
      statusText: 'Internal Server Error'
    };
    const xhrMockObj = xhrMockClass(errMsg);
    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(() => xhrMockObj);
    setTimeout(() => {
      // @ts-ignore
      xhrMockObj.onload();
    });
    try {
      await http({
        method: 'get',
        url: '/user/upload',
        data: {
          test: 'test',
          name: 'Jack'
        }
      });
    } catch(err) {
      expect(err).toEqual(new Error(`status: ${errMsg.status}, statusText: ${errMsg.statusText}`));
    }
  });

  test('test no method, no data, no url', async () => {
    const success = {
      status: 200,
      statusText: 'success'
    };
    const xhrMockObj = xhrMockClass(success);
    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(() => xhrMockObj);
    setTimeout(() => {
      // @ts-ignore
      xhrMockObj.onload();
    });
    const result = await http({});

    expect(result).toEqual({
      code: 0
    });
  });
});

describe('buildFileName', () => {
  test('Length of files is one:', () => {
    expect(buildFileName('foo', 1, 0)).toBe('foo');
  });

  test('Length of files is more than one:', () => {
    expect(buildFileName('foo', 2, 0)).toBe('foo1');
  });
});
