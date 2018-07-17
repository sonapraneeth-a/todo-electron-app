import React from "react";
import PropTypes from 'prop-types';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
  timeItem: {
   textAlign: "right",
  },
});

class TodoItem extends React.Component
{
  render()
  {
    const { classes } = this.props;
    const dispDate = moment(this.props.todoDueDate, 'YYYY-MM-DD');
    const dispDateString = dispDate.format('DD MMMM YYYY');
    const dispTime = moment(this.props.todoReminderTime, 'YYYY-MM-DD HH:mm');
    const dispTimeString = dispTime.format('DD MMMM YYYY HH:mm');
    return (
      <ListItem
        key={this.props.itemNo}
        role={undefined}
        dense
        button
        className={""}
      >
        <Checkbox
          checked={false}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText
          primary={this.props.todoTitle}
          secondary={this.props.todoDetails}
        />
        <ListItemText
          primary={dispDateString}
          secondary={dispTimeString}
          className={classes.timeItem}
        />
      </ListItem>
    );
  }
}

TodoItem.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TodoItem);