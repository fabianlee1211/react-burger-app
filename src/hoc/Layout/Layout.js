import React, { Component }from 'react';
import { connect } from 'react-redux';
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
        <Toolbar 
          isAuth={this.props.isAuthenticated} 
          toggleDrawer={this.toggleSideDrawer}/>
        <SideDrawer 
          isAuth ={this.props.isAuthenticated} 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
} 

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null ? true : false,
  };
}

export default connect(mapStateToProps)(Layout);