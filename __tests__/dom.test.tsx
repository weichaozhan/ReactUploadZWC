import * as React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act, fireEvent } from '@testing-library/react';
import Upload from '../src/component/Index';

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
    act(() => {
      render(<Upload action="/user/upload" />, container);
    });
  
    const button = document.querySelector('input');
    const label = document.querySelector('label');
    act(() => {
      if (label && button) {
        const fnBtnClick = jest.fn();

        button.onclick = fnBtnClick;

        fireEvent.click(label);

        expect(fnBtnClick).toHaveBeenCalledTimes(1);
      }
    });
  });
});
