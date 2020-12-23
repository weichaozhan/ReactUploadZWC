import * as React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act, fireEvent } from '@testing-library/react';
import Upload from '../src/component/Index';

import '@testing-library/jest-dom/extend-expect';

import http from '../src/component/http/index';

jest.mock('../src/component/http/index');

const { Dragger } = Upload;

const mockHttp = http as jest.MockedFunction<typeof http>;

describe('Upload', () => {
  let container: Element | null;

  const success = new Promise(resolve => {
    resolve({
      status: 200,
      statusText: 'success'
    });
  });
  
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container);
      container?.remove?.();
    }
    container = null;
  });

  test('Dragger: drop files', () => {
    const fnChange = jest.fn();    

    act(() => {
      render(<Dragger action="/user/upload" onChange={fnChange} />, container);
    });
  
    const button = document.querySelector('input');
    act(() => {
      mockHttp.mockImplementation(() => success);
      button && fireEvent.drop(button, {
        dataTransfer: {
          files: [new File(['text'], 'text.txt')]
        },
        type: 'drop'
      });
    });
    expect(fnChange).toHaveBeenCalledTimes(1);
  });

  test('Dragger: drop no files', () => {
    const fnChange = jest.fn();    

    act(() => {
      render(<Dragger action="/user/upload" onChange={fnChange} />, container);
    });
  
    const button = document.querySelector('input');
    act(() => {
      mockHttp.mockImplementation(() => success);
      button && fireEvent.drop(button, {
        dataTransfer: {
          files: undefined
        },
        type: 'drop'
      });
    });
    expect(fnChange).toHaveBeenCalledTimes(1);
  });

  test('Dragger: dragOver no files', () => {
    const fnChange = jest.fn();    

    act(() => {
      render(<Dragger action="/user/upload" onChange={fnChange} />, container);
    });
  
    const button = document.querySelector('input');
    act(() => {
      mockHttp.mockImplementation(() => success);
      button && fireEvent.drop(button, {
        dataTransfer: {
          files: [new File(['text'], 'text.txt')]
        },
        type: 'dragOver'
      });
    });
    expect(fnChange).toHaveBeenCalledTimes(1);
  });
});
