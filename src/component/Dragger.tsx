import React, { FC } from 'react';

import { ReactUploadZWC } from '../../@types';

import Upload from './Index';

const Dragger: FC<ReactUploadZWC.IDragger & ReactUploadZWC.IUploadProps> = ({
  height,
  width,
  children,
  style,
  ...restProps
}) => {
  return <Upload
    {...restProps}
    type="drag"
    style={{ height: `${height}px`, width: `${width}px`, ...style }}
  >
    {children}
  </Upload>;
};

export default Dragger;
