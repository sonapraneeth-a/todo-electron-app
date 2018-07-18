import React from "react";
import PropTypes from 'prop-types';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';


const styles = theme => ({
  timeItem: {
   textAlign: "right",
  },
});

class TodoItem extends React.Component
{
  deleteItem()
  {
    this.props.handleForDeleteItem(this.props.itemNo);
  }

  completedItem()
  {
    this.props.handleForCompletedItem(this.props.itemNo);
  }

  render()
  {
    const { classes } = this.props;
    const dispDate = moment(this.props.todoDueDate, 'YYYY-MM-DD');
    const dispDateString = dispDate.format('DD MMMM YYYY');
    const dispTime = moment(this.props.todoReminderTime, 'YYYY-MM-DD HH:mm A');
    const dispTimeString = dispTime.format('DD MMMM YYYY HH:mm A');
    const checkboxValue = (this.props.todoStatus === "Pending" ? false : true);
    return (
      <ListItem
        key={this.props.itemNo}
        role={undefined}
        dense
        button
        className={""}
      >
        <Checkbox
          checked={checkboxValue}
          tabIndex={-1}
          disableRipple
          onClick={this.completedItem.bind(this)}
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
        <DeleteIcon
          color="error"
          onClick={this.deleteItem.bind(this)}/>
      </ListItem>
    );
  }
}

TodoItem.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TodoItem);