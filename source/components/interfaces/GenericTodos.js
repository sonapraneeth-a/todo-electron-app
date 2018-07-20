import React from "react";
import fs from "fs";
import path from "path";

import AddIcon from '@material-ui/icons/Add';

import BootstrapButton from "../bootstrap/Button";

import TodoModal from "../TodoModal";
import TodoItem from "../TodoItem";

class GenericTodos extends React.Component
{
  constructor(props)
  {
    super(props);
    let listLocation = path.join(process.env.USERPROFILE, "\\Documents", "\\TodoApp", "data.json");
    let loadTodoList = [];
    if (fs.existsSync(listLocation))
    {
      loadTodoList = JSON.parse(fs.readFileSync(listLocation));
    }
    this.state = {
      showTodoModal: false,
      todoList: loadTodoList,
    }
  }

  toggleTodo()
  {
    let currentModalState = this.state.showTodoModal;
    this.setState({
      showTodoModal: !currentModalState,
    });
  }

  handleForTodoModal(open)
  {
    this.setState({
      showTodoModal: open
    });
  }

  render()
  {
    const todoPendingItems = this.props.createPendingItems();
    const todoCompletedItems = this.props.createCompletedItems();
    return (
      <div>
        <div className="todo-pending-list">
          <h4>Pending Items</h4>
          <div id="accordion-pending">
            {todoPendingItems}
          </div>
        </div>
        <div className="todo-completed-list">
          <h4>Completed Items</h4>
          <div id="accordion-completed">
            {todoCompletedItems}
          </div>
        </div>
        <BootstrapButton
          role="button"
          dataToggle="modal"
          dataTarget="#todoModal"
          ariaLabel="Add"
          type="primary"
          variant="fab"
          outline={false}
          size={"large"}
          style={{"position": "fixed", "right": "30px", "bottom": "30px"}}
          onClick={this.toggleTodo.bind(this)}>
          <AddIcon />
        </BootstrapButton>
        { this.state.showTodoModal && 
          <TodoModal
            id={"todoModal"}
            display={this.state.showTodoModal}
            handleForTodoModal={this.handleForTodoModal.bind(this)}
            handleForTodoInfo={this.handleForTodoInfo.bind(this)}
            onClick={this.toggleTodo.bind(this)}
          />
        }
      </div>
    );
  }
}

export default GenericTodos;