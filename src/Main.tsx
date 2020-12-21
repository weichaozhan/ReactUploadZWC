import React from 'react';
import ReactDom from 'react-dom';

import Upload from './Index';

const changeFiles: ReactUploadZWC.IHandlerFile = (files) => {
  console.log('e.target.files', files);
};

ReactDom.render(
  <Upload
    action="http://localhost:9001/api/upload"
    onChange={changeFiles}
    multiple={true}
    // beforeUpload={() => {

    // }}
    // multiple={true}
  />,
  document.getElementById('root')
);
