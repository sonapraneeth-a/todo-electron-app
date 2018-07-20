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
  }

  toggleTodo()
  {
    this.props.handleForTodoToggle();
  }

  handleForTodoModal(open)
  {
    this.props.handleForTodoModal(open);
  }

  handleForTodoInfo(todo_info)
  {
    this.props.handleForTodoInfo(todo_info);
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
        { this.props.showTodoModal && 
          <TodoModal
            id={"todoModal"}
            display={this.props.showTodoModal}
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