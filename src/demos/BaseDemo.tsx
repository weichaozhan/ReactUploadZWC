import React, { FC } from 'react';

import Code from './Code';
import Upload from '../component/Index';

import styles from '../index.scss';
import { changeFiles } from './Index';

const BaseDemo: FC = () => {
  return <section className={styles['exp-wrapper']} >
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
      <Code
        lang="scss"
        code={`
          .upload-exp {
            padding: 8px 10px;
            color: #fff;
            background-color: #1890ff;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
              background-color: #40a9ff;
            }
          }
        `}
      />

      <Code
        lang="tsx"
        code={`
          <Upload
            className={styles['upload-exp']}
            action="http://localhost:9001/api/upload"
            onChange={changeFiles}
            multiple={true}
          >
            上传文件
          </Upload>
        `}
      />
    </div>
  </section>;
};

export default BaseDemo;
