import React, { Dispatch, FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { ReactUploadZWC } from '../../@types/reactUploadZWC';
import { DemoCxt, IDemoCxt } from './context';

import BaseDemo from './BaseDemo';
import DragDemo from './DragDemo';
import FileListDemo from './FileListDemo';
import { demoMemu } from './constants';

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
        {demoMemu.map(item => <a
          className={classNames({
            [styles['selected']]: `#${item.hash}` === location.hash
          })}
          key={item.hash}
          href={`#${item.hash}`}
        >
          {item.title}
        </a>)}
      </div>

      <div className={styles['container']} >
        <BaseDemo/>
        <DragDemo/>
        <FileListDemo/>
      </div>
    </div>
  </DemoCxt.Provider>;
};

export default Demos;
