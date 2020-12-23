import * as React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act, fireEvent } from '@testing-library/react';
import Upload from '../src/component/Index';

import '@testing-library/jest-dom/extend-expect';

import http from '../src/component/http/index';

jest.mock('../src/component/http/index');

const mockHttp = http as jest.MockedFunction<typeof http>;

describe('Upload', () => {
  let container: Element | null;

  const success = new Promise(resolve => {
    resolve({
      status: 200,
      statusText: 'success'
    });
  });
  const errMsg = new Promise((...rest) => {
    rest[1](JSON.stringify({
      status: 500,
      statusText: 'Internal Server Error'
    }));
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
  
  test('should render without error', () => {
    const fnChange = jest.fn();

    act(() => {
      render(<Upload action="/user/upload" onChange={fnChange} />, container);
    });
  
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
      mockHttp.mockImplementation(() => success);
      button && fireEvent.change(button, {
        target: {
          files: [new File(['text'], 'text.txt')],
        },
      });
    });
    expect(fnChange).toHaveBeenCalledTimes(1);
  });

  test('Upload failed', () => {
    const fnChange = jest.fn();
    
    act(() => {
      render(<Upload action="/user/upload" onChange={fnChange} />, container);
    });
  
    const button = document.querySelector('input');
    
    act(() => {
      mockHttp.mockImplementation(() => errMsg);
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

  test('Upload action is drop:', () => {
    const fnChange = jest.fn();
    
    act(() => {
      render(<Upload action={(file) => file} onChange={fnChange} />, container);
    });
  
    const button = document.querySelector('input');

    act(() => {
      button && fireEvent.drop(button, {
        dataTransfer: {
          files: [new File(['text'], 'text.txt')]
        },
        type: 'drop'
      });
      expect(fnChange).toHaveBeenCalledTimes(0);
    });
  });
});
