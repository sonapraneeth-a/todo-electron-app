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

import TodoModal from "./TodoModal";
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
    this.setState({
      showTodoModal: !this.state.showTodoModal
    })
  }

  handleForTodoModal(open)
  {
    this.setState({
      showTodoModal: open
    })
  }

  handleForTodoInfo(todo_info)
  {
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    this.setState({
      todoList: todoList.concat(todo_info)
    })
    this.render();
  }

  componentDidUpdate()
  {
    let listDir = path.join(process.env.USERPROFILE, "\\Documents", "\\TodoApp");
    let listLocation = path.join(process.env.USERPROFILE, "\\Documents", "\\TodoApp", "data.json");
    if (!fs.existsSync(listDir))
    {
      fs.mkdirSync(listDir);
    }
    console.log("Location: " + listLocation)
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
    const todoItems = this.state.todoList.map((step, move) =>
    {
      const todoTitle = this.state.todoList[move].title;
      const todoDetails = this.state.todoList[move].details;
      const todoDueDate = this.state.todoList[move].dueDate;
      const todoReminderTime = this.state.todoList[move].reminderTime;
      const todoStatus = this.state.todoList[move].status;
      return (
        <TodoItem
          key={move} 
          todoTitle={todoTitle}
          todoDetails={todoDetails}
          todoDueDate={todoDueDate}
          todoReminderTime={todoReminderTime}
          todoStatus={todoStatus}
          itemNo={move}
        />
      );
    });
    return (
      <div className="main-interface">
        <div className="todo-list">
          <List>
            {todoItems}
          </List>
        </div>
        <Button
          variant="fab" color="primary" 
          aria-label="Add" 
          style={{"position": "absolute", "right": "50px", "bottom": "50px"}}
          onClick={this.toggleTodo.bind(this)}>
          <AddIcon />
        </Button>
        {
          this.state.showTodoModal &&
          <TodoModal 
            display={this.state.showTodoModal}
            handleForTodoModal={this.handleForTodoModal.bind(this)}
            handleForTodoInfo={this.handleForTodoInfo.bind(this)}
          />
        }
      </div>
    );
  }
}


export default MainInterface;