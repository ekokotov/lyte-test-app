import React from 'react';
import classNames from 'classnames';
import style from './style.m.scss';

function Divider() {
  return (
    <div className={style.divider}>
      <div className={style.divider__notch} />
      <div className={classNames(style.divider__notch, style.divider__notch_right)} />
    </div>
  );
}

export default Divider;
