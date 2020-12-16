import React from 'react';
import ReactDom from 'react-dom';

import Upload from './Index';

const changeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log('e.target.files', e.target.files);
};

ReactDom.render(
  <Upload onChange={changeFiles} />,
  document.getElementById('root')
);
