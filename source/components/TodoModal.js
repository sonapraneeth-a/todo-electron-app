import React from "react";
import BootstrapButton from "./bootstrap/Button";
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import moment from "moment";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

const styles = {
  leftIcon: {
    marginRight: "20px",
  }
};

class TodoModal extends React.Component
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
      todoImportant: false,
      todoPriority: "Normal",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleDueDate = this.handleDueDate.bind(this);
    this.handleReminderTime = this.handleReminderTime.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleImportant = this.handleImportant.bind(this);
  }

  toggleModal()
  {
    let open_status = !this.state.open;
    this.setState({
      open: open_status
    });
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
      status: this.state.todoStatus,
      important: this.state.todoImportant,
      priority: this.state.todoPriority,
    }
    this.toggleModal();
    this.props.handleForTodoInfo(todo_info);
    this.render();
  }

  handleTitle(event)
  {
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

  handleImportant(event)
  {
    event.preventDefault();
    this.setState({
      todoImportant: event.target.checked,
    });
  }

  handleClickPriority(value)
  {
    this.setState({
      todoPriority: value,
    });
  }

  render()
  {
    const todoTitle = this.state.todoTitle;
    const todoDetails = this.state.todoDetails;
    const todoDueDate = this.state.todoDueDate;
    const todoReminderTime = this.state.todoReminderTime;
    const todoImportant = this.state.todoImportant;
    const todoPriority = this.state.todoPriority;
    const openStatus = this.props.display;
    return (
      <Modal isOpen={openStatus} toggle={this.toggleModal} centered style={{maxWidth: "100%", padding: "0"}}>
          <ModalHeader toggle={this.toggleModal}>Create a TODO</ModalHeader>
          <ModalBody>
            <form
              onSubmit={this.handleSubmit}
            >
            { todoTitle != "" && todoTitle != null && 
              <div className="input-group" key="createTodoTitleDiv1" style={{margin: "10px auto"}}>
                <div className="input-group-prepend" key="createTodoTitleDiv2">
                  <label className="input-group-text" key="createTodoTitleDiv3" style={{width: "150px"}} htmlFor="inputGroupSelect01">Title</label>
                </div>
                <input key="createTodoTitleInput" type="text" className="form-control is-valid" placeholder={"Title for the TODO"} aria-label="TodoTitle" aria-describedby="basic-addon1" onChange={this.handleTitle.bind(this)}/>
              </div>
            }
            { (todoTitle == "" || todoTitle == null) && 
              <div className="input-group" key="createTodoTitleDiv1" style={{margin: "10px auto"}}>
                <div className="input-group-prepend" key="createTodoTitleDiv2">
                  <label className="input-group-text" key="createTodoTitleDiv3" style={{width: "150px"}} htmlFor="inputGroupSelect01">Title</label>
                </div>
                <input key="createTodoTitleInput" type="text" className="form-control is-invalid" placeholder={"Title for the TODO"} aria-label="TodoTitle" aria-describedby="basic-addon1" onChange={this.handleTitle.bind(this)}/>
              </div>
            }
              <div className="input-group" key="createDueDateDiv1" style={{margin: "10px auto"}}>
                <div className="input-group-prepend" key="createDueDateDiv2">
                  <label className="input-group-text" key="createDueDateDiv3" style={{width: "150px"}} htmlFor="inputGroupSelect02">Due Date</label>
                </div>
                <input key="createDueDate" type="date" className="form-control is-valid" defaultValue={todoDueDate} aria-label="TodoDueDate" aria-describedby="basic-addon2" onChange={this.handleDueDate}/>
              </div>
              <div className="input-group" key="createReminderDateDiv1" style={{margin: "10px auto"}}>
                <div className="input-group-prepend" key="createReminderDateDiv2">
                  <label className="input-group-text" key="createReminderDateDiv3" style={{width: "150px"}} htmlFor="inputGroupSelect03">Reminder time</label>
                </div>
                <input key="createReminderTime" type="datetime" className="form-control is-valid" defaultValue={todoReminderTime} aria-label="TodoReminderTime" aria-describedby="basic-addon3" onChange={this.handleRemiderTime}/>
              </div>
              <div className="input-group" key="createImportantDiv1" style={{margin: "10px auto"}}>
                  <label className="input-group-text" key="createImportantDiv3" style={{width: "150px"}} htmlFor="inputGroupSelect05">Is Important?</label>
                <div className="input-group-append">
                  <div className="input-group-text">
                  { todoImportant === true &&
                    <input type="checkbox" aria-label="Checkbox for following text input" checked onChange={this.handleImportant}/>
                  }
                  { todoImportant === false &&
                    <input type="checkbox" aria-label="Checkbox for following text input" onChange={this.handleImportant}/>
                  }
                  </div>
                </div>
              </div>
              <div className="input-group" key="createPriorityDiv1" style={{margin: "10px auto"}}>
                <label className="input-group-text" key="createPriorityDiv3" style={{width: "150px"}} htmlFor="inputGroupSelect06">Priority</label>
                <div className="button-group" style={{margin: "auto 10px"}}>
                  <BootstrapButton
                    role="button"
                    size="small"
                    type="primary"
                    outline={todoPriority === "Low" ? false : true}
                    style={{margin: "auto 5px"}}
                    onClick={this.handleClickPriority.bind(this, "Low")}
                  >
                    Low
                  </BootstrapButton>
                  <BootstrapButton
                    role="button"
                    size="small"
                    type="dark"
                    outline={todoPriority === "Normal" ? false : true}
                    style={{margin: "auto 5px"}}
                    onClick={this.handleClickPriority.bind(this, "Normal")}
                  >
                    Normal
                  </BootstrapButton>
                  <BootstrapButton
                    role="button"
                    size="small"
                    type="warning"
                    outline={todoPriority === "Important" ? false : true}
                    style={{margin: "auto 5px"}}
                    onClick={this.handleClickPriority.bind(this, "Important")}
                  >
                    Important
                  </BootstrapButton>
                  <BootstrapButton
                    role="button"
                    size="small"
                    type="danger"
                    outline={todoPriority === "Critical" ? false : true}
                    style={{margin: "auto 5px"}}
                    onClick={this.handleClickPriority.bind(this, "Critical")}
                  >
                    Critical
                  </BootstrapButton>
                </div>
              </div>
              <div className="input-group" key="createDetailsDiv1" style={{margin: "10px auto"}}>
                <div className="input-group-prepend" key="createDetailsDiv2">
                  <label className="input-group-text" key="createDetailsDiv3" style={{width: "150px"}} htmlFor="inputGroupSelect04">Details (Markdown supported)</label>
                </div>
                <textarea key="createTodoDetails" type="text" rows="4" className="form-control is-valid" placeholder={"Details for the TODO"} aria-label="TodoDetails" aria-describedby="basic-addon4" onChange={this.handleDetails}/>
              </div>
              <ModalFooter>
                <BootstrapButton
                  role="submit"
                  type="primary"
                  outline={false}
                >
                  <SaveIcon className={"left-icon"} />
                  Save
                </BootstrapButton>
                <BootstrapButton
                  role="button"
                  type="danger"
                  outline={false}
                  onClick={this.toggleModal}
                >
                  <CloseIcon className={"left-icon"} />
                  Cancel
                </BootstrapButton>
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
    );
  }
}

export default TodoModal;