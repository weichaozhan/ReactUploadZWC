import React, { FC, useEffect, useRef } from 'react';

import styles from './Index.scss';

type TProps = ReactUploadZWC.IUploadProps;

const Upload: FC<TProps> = ({
  accept,
  directory = true,
  onChange
}) => {
  const fileInputFile: any = useRef(null);

  useEffect(() => {
    if (fileInputFile.current) {
      (fileInputFile.current as (HTMLInputElement & {
        webkitdirectory: boolean
      })).webkitdirectory = directory;
    }
  }, [fileInputFile.current]);
  
  const changeFile = (e) => {
    onChange?.(e);
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
      />
    </label>
  </div>;
};

export default Upload;