import React, { FC, useEffect, useState } from 'react';

import iconFile from '../assets/images/file.svg';

import styles from './fileList.scss';

interface IProps {
  fileList: (Partial<File>)[] | FileList;
  clickCloseIcon?: (index: number, file: IProps['fileList'][number], files: IProps['fileList']) => any;
}

const FileList: FC<IProps> = ({
  fileList,
  clickCloseIcon
}) => {
  const [files, setFiles] = useState<(Partial<File>)[]>([]);

  useEffect(() => {
    setFiles([...fileList]);
  }, [fileList]);
  console.log('files', files);
  return <ul className={styles['list-wrapper']} >
    {files.map((element, index) => {
      return <li key={`${index}_${element.lastModified}`} >
        <a>
          <img className={styles['item-preicon']} src={iconFile} />
          {element.name}
        </a>

        <i className={styles['item-state']} onClick={() => {
          clickCloseIcon?.(index, element, files);
        }} />
      </li>;
    })}
  </ul>;
};

export default FileList;
