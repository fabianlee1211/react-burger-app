import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = (props) => (
  <React.Fragment>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;