import React from "react";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class TodoItem extends React.Component
{
  render()
  {
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
          primary={this.props.todoDate}
        />
      </ListItem>
    );
  }
}

export default TodoItem;