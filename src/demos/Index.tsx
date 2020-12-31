import React, { FC } from 'react';
import { ReactUploadZWC } from '../../@types';

import BaseDemo from './BaseDemo';
import DragDemo from './DragDemo';

export const changeFiles: ReactUploadZWC.IHandlerFile = (files) => {
  console.log('e.target.files', files);
};

const Demos: FC = () => {
  return <div>
    <BaseDemo/>
    <DragDemo/>
  </div>;
};

export default Demos;
