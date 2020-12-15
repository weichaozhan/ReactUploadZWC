import * as React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Upload from '../src/Index';

describe('<Counter />', () => {
  it('renders', () => {
    const renderer = new ReactShallowRenderer()

    expect(renderer.render(
      <Upload />
    )).toMatchSnapshot()
  })
});
