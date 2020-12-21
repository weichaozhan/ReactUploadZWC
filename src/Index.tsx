import React, { FC, useEffect, useRef } from 'react';
import cNames from 'classnames';

import http from './http';
import styles from './Index.scss';

type TProps = ReactUploadZWC.IUploadProps;
const Upload: FC<TProps> = ({
  accept,
  action,
  onChange,
  data,
  fileName,
  directory = false,
  multiple = false,
  disabled = false
}) => {
  const fileInputFile: any = useRef(null);

  useEffect(() => {
    (fileInputFile.current as (HTMLInputElement & {
      webkitdirectory: boolean
    })).webkitdirectory = directory;
  }, [fileInputFile.current]);
  
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.length ? [...e.target.files] : e.target.files;
    
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

    fileInputFile.current.value = '';
  };
  
  return <div className={styles['wrapper']} >
    <div className={styles['wrapper-real']} >
      <label
        className={cNames(
          styles['button-upload'],
          {
            [styles['disabled']]: disabled
          }
        )}
      >
        上传文件
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

export default Upload;