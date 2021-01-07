import React, { Dispatch, FC, useEffect, useState } from 'react';

import { ReactUploadZWC } from '../../@types';
import { DemoCxt, IDemoCxt } from './context';

import BaseDemo from './BaseDemo';
import DragDemo from './DragDemo';

import styles from './index.scss';

export const changeFiles: ReactUploadZWC.IHandlerFile = (files) => {
  console.log('e.target.files', files);
};

const Demos: FC = () => {
  const [cxt, setCxt]: [IDemoCxt, Dispatch<React.SetStateAction<IDemoCxt>>] = useState({});

  useEffect(() => {
    setCxt({
      hashActive: location.hash
    });
    window.onhashchange = () => {
      setCxt({
        hashActive: location.hash
      });
    };
  }, []);

  return <DemoCxt.Provider value={cxt} >
    <div className={styles['wrapper']} >
      <div className={styles['menu-list']} >
        <a href="#base" >基础</a>
        <a href="#drag" >拖拽</a>
      </div>

      <div className={styles['container']} >
        <BaseDemo/>
        <DragDemo/>
      </div>
    </div>
  </DemoCxt.Provider>;
};

export default Demos;
