import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { ReactUploadZWC } from '../../@types';

import http from './http/index';
import styles from './Index.scss';
import { useUploadAction } from './customHooks';

import Dragger from './Dragger';
import FileList from './FileList';

type TProps = ReactUploadZWC.IUploadProps;

const Upload: FC<TProps> & {
  Dragger: typeof Dragger;
} = ({
  type = 'select',
  accept,
  action,
  onChange,
  data,
  fileName,
  children,
  className = '',
  beforeUpload,
  directory = false,
  style = {},
  multiple = false,
  disabled = false,
  outterClassName = '',
  innerClassName = '',
  headers,
  withCredentials,
  customAction,
  showFileList,
  fileList,
  uploadFailed = (err) => err,
  uploadSuccess = (res) => res
}) => {
  const fileInputFile: React.MutableRefObject<any> = useRef(null);
  const [beforeUploadAction] = useUploadAction(beforeUpload);

  const [fileListInner, setFileListInner] = useState<ReactUploadZWC.TFileList>([]);

  useEffect(() => {
    setFileListInner(fileList ?? []);
  }, [fileList]);
  useEffect(() => {
    (fileInputFile.current as (HTMLInputElement & {
      webkitdirectory: boolean
    })).webkitdirectory = directory;
  }, [directory]);
  
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.length ? [...e.target.files] : e.target.files;
    const fileListCurrent = [...fileListInner, ...(e.target.files ?? [])];
    
    setFileListInner(fileListCurrent);
    uploadFiles(files);

    fileInputFile.current.value = '';
  };

  const uploadFiles = async (files: File[] | FileList | null) => {
    onChange?.(files, fileListInner);
    
    try {
      await beforeUploadAction(files);
  
      if (!files?.length) {
        return;
      }

      if (customAction) {
        customAction(files, fileListInner);
        return;
      }
  
      if (typeof action === 'string') {
        http({
          method: 'post',
          url: action,
          files: [...files],
          data,
          fileName,
          headers: {
            ...headers
          },
          multiple,
          withCredentials
        })
          .then(res => {
            uploadSuccess(res, files, fileListInner);
          })
          .catch((err) => {
            uploadFailed(err, files, fileListInner);
          });
      } else {
        action?.([...files]);
      }
    } catch {
    }
  };

  const clickCloseIcon = (index) => {
    const newFiles = [...fileListInner].filter((...rest) => rest[1] !== index);
    setFileListInner(newFiles);
  };

  const onFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    if (type === 'drag') {
      e.preventDefault();
      const files = [...(e.dataTransfer.files ?? [])];
      
      e.type === 'drop' && uploadFiles(files);
    }
  };

  const clickLabel = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
    fileInputFile.current.click();
  };

  const clickFileInputFile = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return <div className={classNames(styles['wrapper'], outterClassName)} >
    <div
      className={classNames(styles['wrapper-real'], innerClassName)}
    >
      <label
        style={{ ...style }}
        className={classNames(
          styles['button-upload'],
          {
            [styles['disabled']]: disabled
          },
          className
        )}
        onClick={clickLabel}
        onDrop={onFileDrop}
        onDragOver={onFileDrop}
        onDragLeave={onFileDrop}
      >
        {children}
        <input
          accept={accept}
          className={styles['file-input']}
          ref={fileInputFile}
          type="file"
          onChange={changeFile}
          onClick={clickFileInputFile}
          multiple={multiple}
          disabled={disabled}
        />
      </label>
    </div>
    {showFileList && <FileList
      fileList={fileListInner}
      clickCloseIcon={clickCloseIcon}
    />}
  </div>;
};

Upload.Dragger = Dragger;

export default Upload;