import React, { FC, Fragment } from 'react';

import DemoWrapper from './DemoWrapper';
import Code from './Code';
import Upload from '../component/Index';

import styles from './index.scss';
import { changeFiles } from './Index';

const BaseDemo: FC = () => {
  return <DemoWrapper
    anchor="base"
    title="基本"
    demo={<Upload
      headers={{
        'Authorization': 'test'
      }}
      className={styles['upload-exp']}
      action={`http://localhost:${process.env.SERVER_PORT}/api/upload`}
      onChange={changeFiles}
      multiple={true}
    >
      上传文件
    </Upload>}
    code={<Fragment>
      <Code
        key="scss_0"
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
          import Upload from 'react-upload-zwc';

          <Upload
            headers={{
              'Authorization': 'test'
            }}
            className={styles['upload-exp']}
            action="http://localhost:port/api/upload
            onChange={changeFiles}
            multiple={true}
          >
            上传文件
          </Upload>
        `}
      />
    </Fragment>}
  />;
};

export default BaseDemo;
