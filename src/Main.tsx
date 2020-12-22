import React from 'react';
import ReactDom from 'react-dom';

import Upload, { Dragger } from './Index';

const changeFiles: ReactUploadZWC.IHandlerFile = (files) => {
  console.log('e.target.files', files);
};

ReactDom.render(
  <div>
    <Upload
      action="http://localhost:9001/api/upload"
      onChange={changeFiles}
      multiple={true}
    >
      上传文件
    </Upload>

    <Dragger
      width={300}
      height={300}
      action="http://localhost:9001/api/upload"
      onChange={changeFiles}
      style={{
        display: 'block',
        margin: '20px 10px',
        border: '1px dashed #1890ff',
        borderRadius: '10px'
      }}
      multiple={true}
    >
      <p>
        拖拽文件
      </p>
    </Dragger>
  </div>,
  document.getElementById('root')
);
