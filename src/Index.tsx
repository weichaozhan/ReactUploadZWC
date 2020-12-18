import React, { FC, useEffect, useRef } from 'react';
import cNames from 'classnames';

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

    action && Promise.allSettled([...files].map(file => {
      if (typeof action === 'string') {
        const result = http({
          method: 'post',
          url: action,
          file,
          data,
          fileName
        });
        
        return result;
      } else {
        return action(file);
      }
    }))
      .then(res => {
        console.log('res', res);
      });

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