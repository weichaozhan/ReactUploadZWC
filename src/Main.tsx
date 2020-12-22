import React from 'react';
import ReactDom from 'react-dom';

import Upload, { Dragger } from './component/Index';

import styles from './index.scss';

const changeFiles: ReactUploadZWC.IHandlerFile = (files) => {
  console.log('e.target.files', files);
};

ReactDom.render(
  <div>
    <Upload
      className={styles['upload-exp']}
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
      innerClassName={styles['dragger-inner']}
      outterClassName={styles['dragger-outter']}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px dashed #1890ff',
        borderRadius: '10px'
      }}
      // multiple={true}
    >
      <p>
        拖拽文件
      </p>
    </Dragger>
  </div>,
  document.getElementById('root')
);
