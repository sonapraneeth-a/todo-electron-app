import React from "react";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import TodoCard from "./TodoCard";

class MainInterface extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      showTodoFill: false
    }
  }

  toggleTodo()
  {
    console.log("Main interface: " + this.state.showTodoFill);
    this.setState({
      showTodoFill: !this.state.showTodoFill
    })
  }

  handleForCard(open)
  {
    console.log("Handle main interface: " + open);
    this.setState({
      showTodoFill: open
    })
  }

  render()
  {
    return (
      <div className="main-interface">
        <div className="todos">
        </div>
        <Button
          variant="fab" color="primary" 
          aria-label="Add" 
          style={{"position": "absolute", "right": "50px", "bottom": "50px"}}
          onClick={this.toggleTodo.bind(this)}>
          <AddIcon />
        </Button>
        {
          this.state.showTodoFill &&
          <TodoCard 
            display={this.state.showTodoFill}
            handleForCard={this.handleForCard.bind(this)}
          />
        }
      </div>
    );
  }
}


export default MainInterface;