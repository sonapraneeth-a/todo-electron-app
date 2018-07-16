import React from "react";
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class TodoModal extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      open: this.props.display
    }
  }

  toggleModal()
  {
    console.log("Todo Modal: " + this.state.open);
    this.setState({
      open: !this.state.open
    })
  }

  render()
  {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.toggleModal.bind(this)}
      >
        <div className="modal-content">
          <IconButton style={{"position": "absolute", "top": "10px", "right": "10px"}} aria-label="Close Modal">
            <CloseIcon onClick={this.toggleModal.bind(this)}/>
          </IconButton>
          <h1>Name</h1>
        </div>
      </Modal>
    );
  }
}

export default TodoModal;