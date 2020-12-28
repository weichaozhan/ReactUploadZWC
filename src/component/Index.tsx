import React, { FC, useEffect, useRef } from 'react';
// import cNames from 'classnames';

import { ReactUploadZWC } from '../../@types';

import http from './http/index';
import styles from './Index.scss';
import { useUploadAction } from './customHooks';

import Dragger from './Dragger';

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
  uploadFailed = (err) => err,
  uploadSuccess = (res) => res
}) => {
  const fileInputFile: any = useRef(null);
  const [beforeUploadAction] = useUploadAction(beforeUpload);

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

  const uploadFiles = async (files: File[] | FileList | null) => {
    onChange?.(files);
    
    try {
      await beforeUploadAction(files);
  
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
            uploadSuccess(res);
          })
          .catch((err) => {
            uploadFailed(err);
          });
      } else {
        action?.([...files]);
      }
    } catch {
    }
  };

  const onFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    if (type === 'drag') {
      e.preventDefault();
      const files = [...(e.dataTransfer.files ?? [])];
      
      e.type === 'drop' && uploadFiles(files);
    }
  };

  return <div className={
    // cNames(styles['wrapper'], outterClassName)
    `${styles['wrapper']} ${outterClassName}`
  }
  >
    <div
      className={
        // cNames(styles['wrapper-real'], innerClassName)
        `${styles['wrapper-real']} ${innerClassName}`
      }
    >
      <label
        style={{ ...style }}
        className={
          // cNames(
          //   styles['button-upload'],
          //   {
          //     [styles['disabled']]: disabled
          //   },
          //   className
          // )
          `
            ${styles['button-upload']}
            ${disabled ? [styles['disabled']] : ''}
            ${className}
          `
        }
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

Upload.Dragger = Dragger;

export default Upload;