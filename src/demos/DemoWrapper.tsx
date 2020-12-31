import React, { FC, ReactNode } from 'react';

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
      {code}
    </div>
  </section>;
};

export default DemoWrapper;
