import React, { FC, useEffect, useRef } from 'react';
import cNames from 'classnames';

import http from './http';
import styles from './Index.scss';

import DraggerImp from './Dragger';

type TProps = ReactUploadZWC.IUploadProps;

const Upload: FC<TProps> = ({
  accept,
  action,
  onChange,
  data,
  fileName,
  children,
  className = '',
  directory = false,
  style = {},
  multiple = false,
  disabled = false,
}) => {
  const fileInputFile: any = useRef(null);

  useEffect(() => {
    (fileInputFile.current as (HTMLInputElement & {
      webkitdirectory: boolean
    })).webkitdirectory = directory;
  }, [fileInputFile.current]);
  
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.length ? [...e.target.files] : e.target.files;
    
    uploadFiles(files);

    fileInputFile.current.value = '';
  };

  const uploadFiles = (files: File[] | FileList | null) => {
    onChange?.(files);
    
    if (!files?.length) {
      return;
    }

    if (typeof action === 'string') {
      http({
        method: 'post',
        url: action,
        files: [...files],
        data,
        fileName,
        multiple
      })
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.log('err', err);
        });
    } else {
      action?.([...files]);
    }
  };

  const onFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files?.length ? [...e.dataTransfer.files] : e.dataTransfer.files;
    
    if (e.type === 'drop') {
      uploadFiles(files);
    }
  };
  
  return <div className={styles['wrapper']} >
    <div
      className={styles['wrapper-real']}
    >
      <label
        style={{ ...style }}
        className={cNames(
          styles['button-upload'],
          {
            [styles['disabled']]: disabled
          },
          className
        )}
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
          multiple={multiple}
          disabled={disabled}
        />
      </label>
    </div>
  </div>;
};

export const Dragger = DraggerImp;
export default Upload;