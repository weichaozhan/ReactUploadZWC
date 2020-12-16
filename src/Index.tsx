import React, { FC, useRef } from 'react';

import styles from './Index.scss';

const Upload: FC = () => {
  const fileLabel: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const changeFile = (e) => {
    console.log('e.target.value', e.target.files);
  };
  
  return <div className={styles['wrapper']} >
    <label className={styles['button-upload']} >
      上传文件
      <input ref={fileLabel} className={styles['file-input']} type="file" onChange={changeFile} />
    </label>
  </div>;
};

export default Upload;