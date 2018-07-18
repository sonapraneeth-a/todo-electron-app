import React from "react";
import BootstrapButton from "./bootstrap/Button";
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import moment from "moment";

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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleTitle = this.handleTitle.bind(this);
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
    console.log("Render TodoModal: " + todoDueDate);
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth: "100%"}}>
          <div className="modal-content" style={{padding: "0"}}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Todo</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={this.handleSubmit}
              >
              { todoTitle != "" && todoTitle != null && 
                <div className="input-group" style={{margin: "10px auto"}}>
                  <div className="input-group-prepend">
                    <label className="input-group-text" style={{width: "150px"}} htmlFor="inputGroupSelect01">Title</label>
                  </div>
                  <input key="createTodoTitle" type="text" className="form-control is-valid" placeholder={"Title for the TODO"} aria-label="TodoTitle" aria-describedby="basic-addon1" onChange={this.handleTitle}/>
                </div>
              }
              { (todoTitle == "" || todoTitle == null) && 
                <div className="input-group" style={{margin: "10px auto"}}>
                  <div className="input-group-prepend">
                    <label className="input-group-text" style={{width: "150px"}} htmlFor="inputGroupSelect01">Title</label>
                  </div>
                  <input key="createTodoTitle" type="text" className="form-control is-invalid" placeholder={"Title for the TODO"} aria-label="TodoTitle" aria-describedby="basic-addon1" onChange={this.handleTitle.bind(this)}/>
                </div>
              }
                <div className="input-group" style={{margin: "10px auto"}}>
                  <div className="input-group-prepend">
                    <label className="input-group-text" style={{width: "150px"}} htmlFor="inputGroupSelect02">Due Date</label>
                  </div>
                  <input key="createDueDate" type="date" className="form-control is-valid" defaultValue={todoDueDate} aria-label="TodoDueDate" aria-describedby="basic-addon2" onChange={this.handleDueDate}/>
                </div>
                <div className="input-group" style={{margin: "10px auto"}}>
                  <div className="input-group-prepend">
                    <label className="input-group-text" style={{width: "150px"}} htmlFor="inputGroupSelect03">Reminder time</label>
                  </div>
                  <input key="createReminderTime" type="datetime" className="form-control is-valid" defaultValue={todoReminderTime} aria-label="TodoReminderTime" aria-describedby="basic-addon3" onChange={this.handleRemiderTime}/>
                </div>
                <div className="input-group" style={{margin: "10px auto"}}>
                  <div className="input-group-prepend">
                    <label className="input-group-text" style={{width: "150px"}} htmlFor="inputGroupSelect04">Details</label>
                  </div>
                  <textarea key="createTodoDetails" type="text" rows="4" className="form-control is-valid" placeholder={"Details for the TODO"} aria-label="TodoDetails" aria-describedby="basic-addon4" onChange={this.handleDetails}/>
                </div>
                <div className="modal-footer" style={{borderTop: "1px solid white"}}>
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
                    onClick={this.toggleModal.bind(this)}
                    dataDismiss="modal"
                  >
                    <CloseIcon className={"left-icon"} />
                    Cancel
                  </BootstrapButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoModal;

{/*<BootstrapButton
                role="button"
                aria-label="Add"
                type="primary"
                outline={false}
                size={"large"}
                style={{"position": "absolute", "right": "25px", "bottom": "25px"}}
                onClick={this.toggleModal.bind(this)}>
                <CloseIcon />
                Cancel
              </BootstrapButton>*/}