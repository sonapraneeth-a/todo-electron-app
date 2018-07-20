import React from "react";
import fs from "fs";
import path from "path";

import TodoItem from "../TodoItem";

class ImportantTodos extends React.Component
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
      todoList: loadTodoList,
    }
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

  createImportantItems()
  {
    let todoImportantItems = this.state.todoList.map((step, move) =>
    {
      const todoTitle = this.state.todoList[move].title;
      const todoDetails = this.state.todoList[move].details;
      const todoDueDate = this.state.todoList[move].dueDate;
      const todoReminderTime = this.state.todoList[move].reminderTime;
      const todoStatus = this.state.todoList[move].status;
      const todoImportant = this.state.todoList[move].important;
      const todoPriority = this.state.todoList[move].priority;
      if ( todoImportant === true )
      {
        return (
          <TodoItem
            id={"#accordion-important"}
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
    return todoImportantItems;
  }

  render()
  {
    const todoImportantItems = this.createImportantItems();
    return (
      <div>
        <h4>Important Todos</h4>
        <div id="accordion-important">
          {todoImportantItems}
        </div>
      </div>
    );
  }
}

export default ImportantTodos;