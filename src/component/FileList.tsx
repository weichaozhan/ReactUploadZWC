import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import iconFile from '../assets/images/file.svg';

import styles from './fileList.scss';

export type TFileList = ({
  file: Partial<File>;
  state?: 'loading' | 'success' | 'failed';
})[];

interface IProps {
  fileList: TFileList;
  clickCloseIcon?: (index: number, file: Partial<File>, files: IProps['fileList']) => any;
}

const FileList: FC<IProps> = ({
  fileList,
  clickCloseIcon
}) => {
  const [files, setFiles] = useState<TFileList>([]);

  useEffect(() => {
    setFiles([...fileList]);
  }, [fileList]);
  
  return <ul className={styles['list-wrapper']} >
    {files.map((element, index) => {
      return <li key={`${index}_${element.file.lastModified}`} >
        <a>
          <img className={styles['item-preicon']} src={iconFile} />
          {element.file.name}
        </a>

        <i
          className={classNames(
            styles['item-state'],
            {
              [styles['item-state-loading']]: element.state === 'loading',
              [styles['item-state-success']]: element.state === 'success',
              [styles['item-state-failed']]: element.state === 'failed',
            }
          )}
          onClick={() => {
            clickCloseIcon?.(index, element.file, files);
          }}
        />
      </li>;
    })}
  </ul>;
};

export default FileList;
