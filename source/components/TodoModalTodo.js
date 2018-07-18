import React from "react";
import PropTypes from 'prop-types';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    //textTransform: "none",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginLeft: "auto",
  }
});

class TodoModalTodo extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      open: this.props.display,
    };
    this.todo = {
      title: "",
      details: "",
      dueDate: moment().format("YYYY-MM-DD"),
      reminderTime: moment().format("YYYY-MM-DD HH:mm"),
      status: "Pending",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleDueDate = this.handleDueDate.bind(this);
    this.handleReminderTime = this.handleReminderTime.bind(this);
  }

  toggleModal()
  {
    let open_status = !this.state.open;
    this.setState({
      open: open_status
    })
    this.props.handleForTodoModal(open_status);
  }

  handleSubmit(event)
  {
    event.preventDefault();
    let todo_info = {
      title: this.todo.title,
      details: this.todo.details,
      dueDate: this.todo.dueDate,
      reminderTime: this.todo.reminderTime,
      status: this.todo.status
    }
    this.toggleModal();
    this.props.handleForTodoInfo(todo_info);
  }

  handleTitle(event)
  {
    event.preventDefault();
    this.todo = {
      title: event.target.value,
      details: this.todo.details,
      dueDate: this.todo.dueDate,
      reminderTime: this.todo.reminderTime,
      status: this.todo.status,
    }
    this.render();
  }

  handleDetails(event)
  {
    event.preventDefault();
    this.todo = {
      title: this.todo.title,
      details: event.target.value,
      dueDate: this.todo.dueDate,
      reminderTime: this.todo.reminderTime,
      status: this.todo.status,
    }
  }

  handleDueDate(event)
  {
    event.preventDefault();
    this.todo = {
      title: this.todo.title,
      details: this.todo.details,
      dueDate: event.target.value,
      reminderTime: this.todo.reminderTime,
      status: this.todo.status,
    }
  }

  handleReminderTime(event)
  {
    event.preventDefault();
    this.todo = {
      title: this.todo.title,
      details: this.todo.details,
      dueDate: this.todo.dueDate,
      reminderTime: event.target.value,
      status: this.todo.status,
    }
  }

  render()
  {
    const { classes } = this.props;
    console.log("Todo: " + JSON.stringify(this.todo));
    const todoTitle = this.todo.title;
    console.log("Todo title: " + todoTitle);
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.toggleModal.bind(this)}
      >
        <div className="modal-content">
          <IconButton 
            style={{"position": "absolute", "top": "10px", "right": "10px"}}
            aria-label="Close Modal"
            onClick={this.toggleModal.bind(this)}>
            <CloseIcon />
          </IconButton>
          <h3>Create Todo</h3>
          <form
            onSubmit={this.handleSubmit}
            className={classes.formContainer}
            noValidate autoComplete="on"
          >
          {"title: '" + todoTitle + "'"}
          {"Todo: " + this.todo.title}
            { todoTitle != "" && todoTitle != null && 
                <TextField
                  id="title"
                  label="Title"
                  defaultValue={""}
                  margin="dense"
                  onChange={this.handleTitle}
                  helperText="Add a title for your Todo item"
                  placeholder={"Title for the TODO"}
                />
            }
            { (todoTitle == "" || todoTitle == null) && 
                <TextField
                  error
                  id="title"
                  label="Title"
                  defaultValue={""}
                  margin="dense"
                  onChange={this.handleTitle}
                  helperText="Add a title for your Todo item"
                  placeholder={"Title for the TODO"}
                />
            }
            <TextField
              id="dueDate"
              label="Due date"
              type="date"
              defaultValue={this.todo.dueDate}
              onChange={this.handleDueDate}
              margin="dense"
            />
            <TextField
              id="reminderTime"
              label="Remind me"
              type="datetime"
              defaultValue={this.todo.reminderTime}
              onChange={this.handleReminderTime}
              margin="dense"
            />
            <TextField
              id="details"
              label="Details"
              multiline
              rowsMax="4"
              defaultValue={""}
              onChange={this.handleDetails}
              margin="dense"
              helperText="Add a description for your Todo item"
              placeholder={"Details about the TODO"}
            />
            <div className={classes.buttonContainer}>
              <Button type="submit" variant="contained" size="small" color="primary" className={classes.button}>
                <SaveIcon className={classes.leftIcon} />
                Save
              </Button>
              <Button variant="contained" size="small" color="secondary" className={classes.button} onClick={this.toggleModal.bind(this)}>
                <CloseIcon className={classes.leftIcon} />
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

TodoModal.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TodoModalTodo);