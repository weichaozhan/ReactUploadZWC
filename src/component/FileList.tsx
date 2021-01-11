import React, { FC, useEffect } from 'react';
import classNames from 'classnames';

import iconFile from '../assets/images/file.svg';

import styles from './fileList.scss';

export interface IFileShow {
  file: Partial<File>;
  state?: 'loading' | 'success' | 'failed';
}
export type TFileListShow = IFileShow[];

interface IProps {
  fileList: TFileListShow;
  clickCloseIcon?: (index: number, file: Partial<File>, files: IProps['fileList']) => any;
}

const FileList: FC<IProps> = ({
  fileList,
  clickCloseIcon
}) => {
  useEffect(() => {
    // setFiles([...fileList]);
  }, [fileList]);
  
  return <ul className={styles['list-wrapper']} >
    {fileList.map((element, index) => {
      return <li
        key={`${index}_${element.file.lastModified}`}
        tabIndex={index}
        onClick={(e) => {
          const tagName = (e.target as HTMLElement).tagName.toUpperCase();
          
          if (tagName === 'I') {
            const timeDelay = 300;

            e.currentTarget.style.height = '0px';
            e.currentTarget.style.transition = `all ${timeDelay}ms`;

            setTimeout(() => {
              clickCloseIcon?.(index, element.file, fileList);
            }, timeDelay);
          }
        }}
      >
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
        />
      </li>;
    })}
  </ul>;
};

export default FileList;
