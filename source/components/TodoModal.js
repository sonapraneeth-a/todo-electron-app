import React from "react";
import BootstrapButton from "./bootstrap/Button";
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import moment from "moment";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

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
    console.log("Constructor");
    console.log(this.props.display);
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
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal()
  {
    console.log("Toggle test: " + this.state.open);
    let open_status = !this.state.open;
    this.setState({
      open: open_status
    })
    this.props.handleForTodoModal(open_status);
  }

  handleSubmit(event)
  {
    console.log("Handle submit");
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
    this.render();
    
  }

  handleTitle(event)
  {
    //event.preventDefault();
    console.log("Title Modal: " + event.target.value);
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
    const todoTitle = this.state.todoTitle;
    const todoDetails = this.state.todoDetails;
    const todoDueDate = this.state.todoDueDate;
    const todoReminderTime = this.state.todoReminderTime;
    const openStatus = this.props.display;
    console.log("Render TestModal: " + todoDueDate);
    console.log(this.state.open);
    return (
      <Modal isOpen={openStatus} toggle={this.toggleModal} centered style={{maxWidth: "100%", padding: "0"}}>
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
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

