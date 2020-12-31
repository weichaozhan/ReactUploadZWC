import React, { FC } from 'react';

import Code from './Code';
import Upload from '../component/Index';

import styles from '../index.scss';
import { changeFiles } from './Index';

const { Dragger } = Upload;

const BaseDemo: FC = () => {
  return <section className={styles['exp-wrapper']} >
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
      <Code
        lang="scss"
        code={`
          .dragger-inner {
            display: block;
          }
          
          .dragger-outter {
            display: flex;
            margin-top: 20px;
            padding: 20px 10px;
            justify-content: center;
            align-items: center;
            border: 1px dashed #8e8e8e;
          }
        `}
      />
      
      <Code
        lang="tsx"
        code={`
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
      />
    </div>
  </section>;
};

export default BaseDemo;
