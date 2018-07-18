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

class TestModal extends React.Component
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
    const openStatus = this.state.open;
    console.log("Render TestModal: " + todoDueDate);
    if(openStatus)
    {
    return (
      <div className="modal fade" key="todo-app-create" id={this.props.id} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    onClick={this.toggleModal}
                    //dataDismiss="modal"
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
    else
    {
      return (
        <div></div>
      );
    }
  }
}

export default TestModal;

