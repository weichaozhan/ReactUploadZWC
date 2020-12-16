import * as React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from '@testing-library/react';
import Upload from '../src/Index';

import '@testing-library/jest-dom/extend-expect';

describe('Upload', () => {
  let container: Element | null;

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
      render(<Upload onChange={fnChange} />, container);
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

    act(() => {
      for (let i = 0; i <= 6; i++) {
        button?.dispatchEvent(new MouseEvent('change', {
          bubbles: true
        }));
      }
    });
    expect(fnChange).toHaveBeenCalledTimes(8);
  });
});
