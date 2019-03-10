import React, { useMemo } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const Modal = props => {
  return useMemo(() => {
    return (
      <React.Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
          }}>
          {props.children}
        </div>
      </React.Fragment>
    );
  }, [props.children, props.show]);
};

export default Modal;
