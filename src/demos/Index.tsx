import React, { FC } from 'react';

import { ReactUploadZWC } from '../../@types';
import BaseDemo from './BaseDemo';
import DragDemo from './DragDemo';

import styles from './index.scss';

export const changeFiles: ReactUploadZWC.IHandlerFile = (files) => {
  console.log('e.target.files', files);
};

const Demos: FC = () => {
  return <div className={styles['wrapper']} >
    <div className={styles['menu-list']} >
      <a href="#base" >基础</a>
      <a href="#drag" >拖拽</a>
    </div>

    <main className={styles['container']} >
      <BaseDemo/>
      <DragDemo/>
    </main>
  </div>;
};

export default Demos;
