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

class TodoGoogleModal extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      open: this.props.display,
      todoTitle: "",
      todoDetails: "",
      todoDueDate: moment().format("YYYY-MM-DD"),
      todoReminderTime: moment().format("YYYY-MM-DD HH:mm A"),
      todoStatus: "Pending",
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
      title: this.state.todoTitle,
      details: this.state.todoDetails,
      dueDate: this.state.todoDueDate,
      reminderTime: this.state.todoReminderTime,
      status: this.state.todoStatus
    }
    this.toggleModal();
    this.props.handleForTodoInfo(todo_info);
  }

  handleTitle(event)
  {
    event.preventDefault();
    this.setState({
      todoTitle: event.target.value,
    });
  }

  handleDetails(event)
  {
    event.preventDefault();
    this.setState({
      todoDetails: event.target.value,
    });
  }

  handleDueDate(event)
  {
    event.preventDefault();
    this.setState({
      todoDueDate: event.target.value,
    });
  }

  handleReminderTime(event)
  {
    event.preventDefault();
    this.setState({
      todoReminderTime: event.target.value,
    });
  }

  render()
  {
    const { classes } = this.props;
    const todoTitle = this.state.todoTitle;
    const todoDetails = this.state.todoDetails;
    const todoDueDate = this.state.todoDueDate;
    const todoReminderTime = this.state.todoReminderTime;
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
          {/*Reference: https://stackoverflow.com/questions/42573017/in-react-es6-why-does-the-input-field-lose-focus-after-typing-a-character*/}
            { todoTitle != "" && todoTitle != null && 
                <TextField
                  id="title"
                  key="createTodoTitle"
                  label="Title"
                  defaultValue={todoTitle}
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
                  key="createTodoTitle"
                  label="Title"
                  defaultValue={todoTitle}
                  margin="dense"
                  onChange={this.handleTitle}
                  helperText="Add a title for your Todo item"
                  placeholder={"Title for the TODO"}
                />
            }
            <TextField
              id="dueDate"
              key="createTodoDueDate"
              label="Due date"
              type="date"
              defaultValue={todoDueDate}
              onChange={this.handleDueDate}
              margin="dense"
            />
            <TextField
              id="reminderTime"
              key="createTodoReminderTime"
              label="Remind me"
              type="datetime"
              defaultValue={todoReminderTime}
              onChange={this.handleReminderTime}
              margin="dense"
            />
            <TextField
              id="details"
              key="createTodoDetails"
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

TodoGoogleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TodoGoogleModal);