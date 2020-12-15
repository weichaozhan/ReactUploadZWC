import React, { FC, useRef } from 'react';

import styles from './index.scss';

const Upload: FC = () => {
  const fileLabel: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

  return <div className={styles['wrapper']} >
    <label className={styles['button-upload']} >
      上传文件
      <input ref={fileLabel} className={styles['file-input']} type="file" onChange={e => {
        console.log(e.target.files);
      }} />
    </label>
  </div>;
};

export default Upload;