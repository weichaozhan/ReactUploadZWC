import React, { FC, Fragment, useState } from 'react';

import DemoWrapper from './DemoWrapper';
import Code from './Code';
import Upload from '../component/Index';

import styles from './index.scss';
import { changeFiles } from './Index';
import { ReactUploadZWC } from '../../@types/reactUploadZWC';

const FileListDemo: FC = () => {
  const [files, setFiles] = useState<ReactUploadZWC.TFileList>([{
    name: 'test'
  }]);
  const [filesCustom, setFilesCustom] = useState<ReactUploadZWC.TFileList>([{
    name: 'filesCustom.test'
  }]);

  console.log('filesCustom', filesCustom);
  return <DemoWrapper
    anchor="fileList"
    title="基本"
    demo={<div>
      <section className={styles['fileList-demo-wrapper']} >
        <h3>
          默认形式
        </h3>

        <Upload
          headers={{
            'Authorization': 'test'
          }}
          showFileList={true}
          className={styles['upload-exp']}
          action={`http://localhost:${process.env.SERVER_PORT}/api/upload`}
          onChange={changeFiles}
          multiple={true}
          onChangeFileList={(fileList) => {
            console.log('onChangeFileList', fileList);
          }}
          onDeleteFile={(file, index, fileList) => {
            console.log('file, index, fileList', file, index, fileList);
          }}
        >
          上传文件
        </Upload>
      </section>

      <section className={styles['fileList-demo-wrapper']} >
        <h3>
          设置可控文件列表
        </h3>

        <Upload
          headers={{
            'Authorization': 'test'
          }}
          showFileList={true}
          fileList={files}
          className={styles['upload-exp']}
          action={`http://localhost:${process.env.SERVER_PORT}/api/upload`}
          onChange={changeFiles}
          multiple={true}
          onChangeFileList={(fileList) => {
            setFiles(fileList);
            console.log('onChangeFileList', fileList);
          }}
          onDeleteFile={(file, index, fileList) => {
            console.log('file, index, fileList', file, index, fileList);
          }}
        >
          上传文件
        </Upload>
      </section>

      <section className={styles['fileList-demo-wrapper']} >
        <h3>
          自定义文件列表
        </h3>

        <Upload
          showFileList={true}
          fileList={filesCustom}
          className={styles['upload-exp']}
          action={`http://localhost:${process.env.SERVER_PORT}/api/upload`}
          onChange={changeFiles}
          multiple={true}
          onChangeFileList={(fileList) => {
            console.log('fileList', fileList);
            setFilesCustom(fileList);
          }}
          customFileList={<ul className={styles['custom-file-list']} >
            {(filesCustom as File[]).map((item, index: number) => <li key={`${index}_${item}`} >
              {item.name}
            </li>)}
          </ul>}
        >
          上传文件
        </Upload>
      </section>
    </div>}
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
          import React, { useState } from 'react';
          import Upload from 'react-upload-zwc';

          const [files, setFiles] = useState<ReactUploadZWC.TFileList>([{
            name: 'test'
          }]);
          const [filesCustom, setFilesCustom] = useState<ReactUploadZWC.TFileList>([{
            name: 'filesCustom.test'
          }]);
          
          // 默认
          <Upload
            headers={{
              'Authorization': 'test'
            }}
            showFileList={true}
            className={styles['upload-exp']}
            action="http://localhost:port/api/upload"
            onChange={changeFiles}
            multiple={true}
            onChangeFileList={(fileList) => {
              console.log('onChangeFileList', fileList);
            }}
            onDeleteFile={(file, index, fileList) => {
              console.log('file, index, fileList', file, index, fileList);
            }}
          >
            上传文件
          </Upload>

          // 设置可控文件列表
          <Upload
            headers={{
              'Authorization': 'test'
            }}
            showFileList={true}
            fileList={files}
            className={styles['upload-exp']}
            action="http://localhost:port/api/upload"
            onChange={changeFiles}
            multiple={true}
            onChangeFileList={(fileList) => {
              setFiles(fileList);
              console.log('onChangeFileList', fileList);
            }}
            onDeleteFile={(file, index, fileList) => {
              console.log('file, index, fileList', file, index, fileList);
            }}
          >
            上传文件
          </Upload>

          // 自定义文件列表
          <Upload
            showFileList={true}
            fileList={filesCustom}
            className={styles['upload-exp']}
            action="http://localhost:port/api/upload"
            onChange={changeFiles}
            multiple={true}
            onChangeFileList={(fileList) => {
              console.log('fileList', fileList);
              setFilesCustom(fileList);
            }}
            customFileList={<ul className={styles['custom-file-list']} >
              {(filesCustom as File[]).map((item, index: number) => <li key={index + '_' + item} >
                {item.name}
              </li>)}
            </ul>}
          >
            上传文件
          </Upload>
        `}
      />
    </Fragment>}
  />;
};

export default FileListDemo;
