import React from "react";
import fs from "fs";
import path from "path";

import AddIcon from '@material-ui/icons/Add';

import BootstrapButton from "./bootstrap/Button";

import TodoModal from "./TodoModal";
import TodoItem from "./TodoItem";

class GenericTodo extends React.Component
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

  handleForDeleteItem(itemNo)
  {
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    todoList.splice(itemNo, 1);
    this.setState({
      todoList: todoList,
    });
  }

  handleForCompletedItem(itemNo)
  {
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    todoList[itemNo].status = (todoList[itemNo].status === "Pending" ? "Completed": "Pending");
    this.setState({
      todoList: todoList,
    });
  }

  handleForImportantItem(itemNo)
  {
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    todoList[itemNo].important = (todoList[itemNo].important === true ? false: true);
    this.setState({
      todoList: todoList,
    });
  }

  handleForTodoInfo(todo_info)
  {
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    this.setState({
      todoList: todoList.concat(todo_info)
    });
  }

  componentDidUpdate()
  {
    let listDir = path.join(process.env.USERPROFILE, "\\Documents", "\\TodoApp");
    let listLocation = path.join(process.env.USERPROFILE, "\\Documents", "\\TodoApp", "data.json");
    if (!fs.existsSync(listDir))
    {
      fs.mkdirSync(listDir);
    }
    fs.writeFile(
      listLocation,
      JSON.stringify(this.state.todoList), "utf-8", 
      function(err)
      {
        if(err) { console.log(err); }
      }
    );
  }

  render()
  {
    const todoPendingItems = this.state.todoList.map((step, move) =>
    {
      const todoTitle = this.state.todoList[move].title;
      const todoDetails = this.state.todoList[move].details;
      const todoDueDate = this.state.todoList[move].dueDate;
      const todoReminderTime = this.state.todoList[move].reminderTime;
      const todoStatus = this.state.todoList[move].status;
      const todoImportant = this.state.todoList[move].important;
      const todoPriority = this.state.todoList[move].priority;
      if ( todoStatus === "Pending" )
      {
        return (
          <TodoItem
            id={"#accordion-pending"}
            key={move} 
            todoTitle={todoTitle}
            todoDetails={todoDetails}
            todoDueDate={todoDueDate}
            todoReminderTime={todoReminderTime}
            todoStatus={todoStatus}
            todoImportant={todoImportant}
            todoPriority={todoPriority}
            itemNo={move}
            handleForDeleteItem={this.handleForDeleteItem.bind(this)}
            handleForCompletedItem={this.handleForCompletedItem.bind(this)}
            handleForImportantItem={this.handleForImportantItem.bind(this)}
          />
        );
      }
    });
    const todoCompletedItems = this.state.todoList.map((step, move) =>
    {
      const todoTitle = this.state.todoList[move].title;
      const todoDetails = this.state.todoList[move].details;
      const todoDueDate = this.state.todoList[move].dueDate;
      const todoReminderTime = this.state.todoList[move].reminderTime;
      const todoStatus = this.state.todoList[move].status;
      const todoImportant = this.state.todoList[move].important;
      const todoPriority = this.state.todoList[move].priority;
      if ( todoStatus === "Completed" )
      {
        return (
          <TodoItem
            id={"#accordion-completed"}
            key={move} 
            todoTitle={todoTitle}
            todoDetails={todoDetails}
            todoDueDate={todoDueDate}
            todoReminderTime={todoReminderTime}
            todoStatus={todoStatus}
            todoImportant={todoImportant}
            todoPriority={todoPriority}
            itemNo={move}
            handleForDeleteItem={this.handleForDeleteItem.bind(this)}
            handleForCompletedItem={this.handleForCompletedItem.bind(this)}
          />
        );
      }
    });
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

export default GenericTodo;