import React, { FC, useEffect, useRef } from 'react';

import http from './http';
import styles from './Index.scss';

type TProps = ReactUploadZWC.IUploadProps;

const Upload: FC<TProps> = ({
  accept,
  action,
  directory = false,
  onChange,
  data,
  fileName,
  multiple=false
}) => {
  const fileInputFile: any = useRef(null);

  useEffect(() => {
    if (fileInputFile.current) {
      (fileInputFile.current as (HTMLInputElement & {
        webkitdirectory: boolean
      })).webkitdirectory = directory;
    }
  }, [fileInputFile.current]);
  
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    onChange?.(e.target.files);
    
    if (!file) {
      return;
    }

    if (typeof action === 'string') {
      http({
        method: 'post',
        url: action,
        file,
        data,
        fileName
      });
    } else if (action) {
      action(file);
    }
  };
  
  return <div className={styles['wrapper']} >
    <label className={styles['button-upload']} >
      上传文件
      <input
        accept={accept}
        className={styles['file-input']}
        ref={fileInputFile}
        type="file"
        onChange={changeFile}
        multiple={multiple}
      />
    </label>
  </div>;
};

export default Upload;