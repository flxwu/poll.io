import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Drawer, AppBar, Toolbar, Typography, Divider, IconButton } from 'material-ui';
import List, { ListItem, ListItemText } from 'material-ui/List';

import AddIcon from 'material-ui-icons/Add';
import PollIcon from 'material-ui-icons/Poll';
import MenuIcon from 'material-ui-icons/Menu';
import SettingsIcon from 'material-ui-icons/Settings';
import ComputerIcon from 'material-ui-icons/Computer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import DashboardView from './DashboardView';
import NewPollView from './NewPollView';
import SettingsView from './SettingsView';
import AboutView from './AboutView';

import theme from '../styles/LandingDrawerStyle';
import Strings from '../assets/Strings';

class LandingDrawer extends React.Component {
  state = {
    open: false,
    anchor: 'left',
    contentView: 'dashboard',
    appBarTitle: Strings.dashboard
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleChangeContentContainer = (dest) => {
    let title;
    switch (dest) {
      case 'dashboard':
        title = Strings.dashboard
        break;
      case 'newPoll':
        title = Strings.newPoll
        break;
      case 'settings':
        title = Strings.settings
        break;
      case 'about':
        title = Strings.about
        break;
      default:
        title = Strings.dashboard
    }
    this.setState({
      contentView: dest,
      appBarTitle: title
    });
    this.handleDrawerClose();
  }

  render() {
    const { classes } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => this.handleChangeContentContainer('dashboard')}>
            <PollIcon />
            <ListItemText classes={{ primary: classes.drawerItemText }} primary={Strings.dashboard} />
          </ListItem>
          <ListItem button onClick={() => this.handleChangeContentContainer('newPoll')}>
            <AddIcon />
            <ListItemText classes={{ primary: classes.drawerItemText }} primary={Strings.newPoll} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => this.handleChangeContentContainer('settings')}>
            <SettingsIcon />
            <ListItemText classes={{ primary: classes.drawerItemText }} primary={Strings.settings} />
          </ListItem>
          <ListItem button onClick={() => this.handleChangeContentContainer('about')}>
            <ComputerIcon />
            <ListItemText classes={{ primary: classes.drawerItemText }} primary={Strings.about} />
          </ListItem>
        </List>
      </Drawer>
    );

    const contentContainer = () => {
      switch (this.state.contentView) {
        case 'polls':
          return ( <DashboardView /> )
        case 'newPoll':
          return ( <NewPollView /> )
        case 'settings':
          return ( <SettingsView /> )
        case 'about':
          return ( <AboutView /> )
        default:
          return ( <DashboardView /> )
      }
    }

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                poll.io
                <span className={classNames(classes.dynamicAppBarTitle)}> - {this.state.appBarTitle}</span>
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Typography>{
              contentContainer()
            }</Typography>
          </main>
          {after}
        </div>
      </div>
    );
  }
}

LandingDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(theme, { withTheme: true })(LandingDrawer);