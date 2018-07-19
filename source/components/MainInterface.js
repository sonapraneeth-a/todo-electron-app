import React from "react";
import moment from "moment";
import fs from "fs";
import path from "path";

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import BootstrapButton from "./bootstrap/Button";

import TodoModal from "./TodoModal";
import TestModal from "./TestModal";
import TodoItem from "./TodoItem";

class MainInterface extends React.Component
{
  constructor()
  {
    super();
    console.log("Name: " + process.env.USERPROFILE);
    let listLocation = path.join(process.env.USERPROFILE, "\\Documents", "\\TodoApp", "data.json");
    console.log("Location: " + listLocation)
    let loadTodoList = [];
    if (fs.existsSync(listLocation))
    {
      loadTodoList = JSON.parse(fs.readFileSync(listLocation));
      console.log("Load: " + loadTodoList);
    }
    else
    {
      console.log("No todo");
    }
    this.state = {
      showTodoModal: false,
      todoList: loadTodoList,
    }
  }

  toggleTodo()
  {
    console.log("MI Todo");
    let currentModalState = this.state.showTodoModal;
    this.setState({
      showTodoModal: !currentModalState,
    })
  }

  handleForTodoModal(open)
  {
    this.setState({
      showTodoModal: open
    })
  }

  handleForDeleteItem(itemNo)
  {
    console.log("Delete item: " + itemNo);
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    todoList.splice(itemNo, 1);
    console.log(todoList);
    this.setState({
      todoList: todoList,
    })
  }

  handleForCompletedItem(itemNo)
  {
    console.log("Completed item: " + itemNo);
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    todoList[itemNo].status = (todoList[itemNo].status === "Pending" ? "Completed": "Pending");
    console.log("Completed Item: " + JSON.stringify(todoList[itemNo]));
    this.setState({
      todoList: todoList,
    })
  }

  handleForTodoInfo(todo_info)
  {
    console.log("Main interface::Handle for todo infoi");
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    this.setState({
      todoList: todoList.concat(todo_info)
    })
  }

  componentDidUpdate()
  {
    let listDir = path.join(process.env.USERPROFILE, "\\Documents", "\\TodoApp");
    let listLocation = path.join(process.env.USERPROFILE, "\\Documents", "\\TodoApp", "data.json");
    if (!fs.existsSync(listDir))
    {
      fs.mkdirSync(listDir);
    }
    console.log("Location CDU: " + listLocation)
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
    console.log("Render::Main interface");
    console.log(JSON.stringify(this.state.todo));
    console.log("Main interface: " + this.state.showTodoModal);
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
      <div className="main-interface">
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
          style={{"position": "absolute", "right": "25px", "bottom": "25px"}}
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


export default MainInterface;