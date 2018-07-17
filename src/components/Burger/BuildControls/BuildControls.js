import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Meat', type: 'meat'},
]

const BuildControls = () => 
  (
    <div className={classes.BuildControls}>
      {controls.map(ctrl => (
        <BuildControl key={ctrl.label} label={ctrl.label} />
      ))}
    </div>
  );


export default BuildControls;