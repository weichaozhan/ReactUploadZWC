import React, { FC, ReactNode, useState } from 'react';
import classNames from 'classnames';

import styles from './index.scss';

interface IProps {
  demo: ReactNode | ReactNode[] | string;
  code: ReactNode | ReactNode[];
  title: string;
  anchor: string;
}

const DemoWrapper: FC<IProps> = ({
  demo,
  code,
  title,
  anchor
}) => {
  const [codeShow, setCodeShow] = useState(false);

  const clickCode = () => {
    setCodeShow(!codeShow);
  };

  return <section id={anchor} className={styles['exp-wrapper']} >
    <h3
      className={styles['exp-title']}
    >
      {title}
    </h3>

    <div className={styles['exp-result']} >
      {demo}
    </div>

    <div className={styles['exp-code']} >
      <div className={styles['exp-code-header']} >
        <span className={styles['code-toggle']} onClick={clickCode} >{codeShow ? '隐藏' : '显示'}代码</span>
      </div>
      
      <div
        className={classNames(
          styles['exp-code-content'],
          {
            [styles['exp-code-content--show']]: codeShow
          }
        )}
      >
        {code}
      </div>
    </div>
  </section>;
};

export default DemoWrapper;
