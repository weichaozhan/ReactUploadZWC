import React, { FC } from 'react';

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
    style={{ height: `${height}px`, width: `${width}px`, ...style }}
  >
    {children}
  </Upload>;
};

export default Dragger;
