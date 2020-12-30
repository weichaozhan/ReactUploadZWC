import React from 'react';
import ReactDom from 'react-dom';
import { ReactUploadZWC } from '../@types';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { jsx, javascript } from 'react-syntax-highlighter/dist/esm/languages/prism';
import { base16AteliersulphurpoolLight as syncStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);

import Upload from './component/Index';

import styles from './index.scss';

const changeFiles: ReactUploadZWC.IHandlerFile = (files) => {
  console.log('e.target.files', files);
};

const { Dragger } = Upload;

ReactDom.render(
  <div>
    <section className={styles['exp-wrapper']} >
      <div className={styles['exp-result']} >
        <Upload
          className={styles['upload-exp']}
          action="http://localhost:9001/api/upload"
          onChange={changeFiles}
          multiple={true}
        >
          上传文件
        </Upload>
      </div>

      <div className={styles['exp-code']} >
        <SyntaxHighlighter language="jsx" style={syncStyle} >
          {`
            <Upload
              className={styles['upload-exp']}
              action="http://localhost:9001/api/upload"
              onChange={changeFiles}
              multiple={true}
            >
              上传文件
            </Upload>
          `}
        </SyntaxHighlighter>
      </div>
    </section>

    <section className={styles['exp-wrapper']} >
      <div className={styles['exp-result']} >
        <Dragger
          width={300}
          height={300}
          action="http://localhost:9001/api/upload"
          onChange={changeFiles}
          beforeUpload={(files) => {
            console.log(files);
            return true;
          }}
          innerClassName={styles['dragger-inner']}
          outterClassName={styles['dragger-outter']}
          uploadSuccess={res => {
            console.log('res', res);
          }}
          uploadFailed={err => {
            console.log('err', err);
          }}
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
      </div>

      <div className={styles['exp-code']} >
        <SyntaxHighlighter language="jsx" style={syncStyle} >
          {`
            <Dragger
              width={300}
              height={300}
              action="http://localhost:9001/api/upload"
              onChange={changeFiles}
              beforeUpload={(files) => {
                console.log(files);
                return true;
              }}
              innerClassName={styles['dragger-inner']}
              outterClassName={styles['dragger-outter']}
              uploadSuccess={res => {
                console.log('res', res);
              }}
              uploadFailed={err => {
                console.log('err', err);
              }}
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
          `}
        </SyntaxHighlighter>
      </div>
    </section>
  </div>,
  document.getElementById('root')
);
