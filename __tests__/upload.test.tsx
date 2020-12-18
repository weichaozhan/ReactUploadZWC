import * as React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act, fireEvent } from '@testing-library/react';
import Upload from '../src/Index';

import { xhrMockClass } from '../__mocks__/http.__mock__';

import '@testing-library/jest-dom/extend-expect';

describe('Upload', () => {
  let container: Element | null;

  beforeEach(() => {
    jest.clearAllMocks();
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
  
  test('should render without error', () => {
    const fnChange = jest.fn();

    act(() => {
      render(<Upload action="/user/upload" onChange={fnChange} />, container);
    });

    const text = container?.innerHTML;
    
    expect(text).toBe('<div class="wrapper"><label class="button-upload">上传文件<input class="file-input" type="file"></label></div>');
  
    const button = document.querySelector('input');
    act(() => {
      button?.dispatchEvent(new MouseEvent('change', {
        bubbles: true
      }));
    });
    expect(fnChange).toHaveBeenCalledTimes(1);
  });

  test('Upload action is string', () => {
    const fnChange = jest.fn();
    
    act(() => {
      render(<Upload action="/user/upload" onChange={fnChange} />, container);
    });
  
    const button = document.querySelector('input');

    act(() => {
      button && fireEvent.change(button, {
        target: {
          files: [new File(['text'], 'text.txt')],
        },
      });
    });
    expect(fnChange).toHaveBeenCalledTimes(1);
  });

  test('Upload action is promise', () => {
    const fnChange = jest.fn();
    
    act(() => {
      render(<Upload action={(file) => file} onChange={fnChange} />, container);
    });
  
    const button = document.querySelector('input');

    act(() => {
      button && fireEvent.change(button, {
        target: {
          files: [new File(['text'], 'text.txt')],
        },
      });
    });
    expect(fnChange).toHaveBeenCalledTimes(1);
  });
});
