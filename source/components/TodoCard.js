import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

class TodoCard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      open: this.props.display
    }
  }

  toggleCard()
  {
    console.log("Todo card: " + this.state.open);
    let open_status = !this.state.open;
    this.setState({
      open: open_status
    })
    console.log("Todo card: " + this.state.open);
    this.props.handleForCard(open_status);
  }

  render()
  {
    let open = this.state.open;
    return (
      open &&
      <Card>
        <div className="modal-content">
          <IconButton style={{"position": "absolute", "top": "10px", "right": "10px"}} aria-label="Close Modal">
            <CloseIcon onClick={this.toggleCard.bind(this)}/>
          </IconButton>
          <h1>Name</h1>
        </div>
      </Card>
    );
  }
}

export default TodoCard;