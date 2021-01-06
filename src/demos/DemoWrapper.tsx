import React, { FC, ReactNode, useReducer, useRef, MutableRefObject, useEffect } from 'react';

import styles from './index.scss';

interface IProps {
  demo: ReactNode | ReactNode[] | string;
  code: ReactNode | ReactNode[];
  title: string;
  anchor: string;
}

interface IState {
  codeShow: boolean;
  contentHeight: number;
}
interface IAction {
  type: keyof IState;
  payload: Partial<IState>;
}

const stateInitial: IState = {
  codeShow: false,
  contentHeight: 0
};
const initState = (initialState: IState) => {
  return { ...initialState };
};
const stateReducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action;
  switch(type) {
    case 'codeShow':
      return {
        ...state,
        codeShow: payload.codeShow ?? false
      };
    case 'contentHeight':
      return {
        ...state,
        contentHeight: payload.contentHeight ?? 0
      };
    default:
      throw new Error();
  }
};

const DemoWrapper: FC<IProps> = ({
  demo,
  code,
  title,
  anchor
}) => {
  const [state, dispatch] = useReducer(stateReducer, { ...stateInitial }, initState);
  const contentDom: MutableRefObject<null | HTMLDivElement> = useRef(null);

  useEffect(() => {
    dispatch({
      type: 'contentHeight',
      payload: {
        contentHeight: contentDom.current?.scrollHeight
      }
    });
  }, []);

  const clickCode = () => {
    dispatch({
      type: 'codeShow',
      payload: {
        codeShow: !state.codeShow
      }
    });
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
        <span className={styles['code-toggle']} onClick={clickCode} >{state.codeShow ? '隐藏' : '显示'}代码</span>
      </div>
      
      <div
        ref={contentDom}
        className={styles['exp-code-content']}
        style={{
          height: `${state.codeShow ? state.contentHeight : 0}px`,
          borderBottomWidth: `${state.codeShow ? 1 : 0}px`
        }}
      >
        {code}
      </div>
    </div>
  </section>;
};

export default DemoWrapper;
