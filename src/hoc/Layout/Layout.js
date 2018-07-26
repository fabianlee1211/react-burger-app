import React, { Component }from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  toggleSideDrawer = () => {
    this.setState((prevState) => { return {showSideDrawer: !prevState.showSideDrawer} });
  }

  render () {
    return (
      <React.Fragment>
        <Toolbar toggleDrawer={this.toggleSideDrawer}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
} 

export default Layout;