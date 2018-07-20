import React from "react";
import fs from "fs";
import path from "path";
import moment from "moment";

import AddIcon from '@material-ui/icons/Add';

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import GenericTodos from "./interfaces/GenericTodos";
import ImportantTodos from "./interfaces/ImportantTodos";
import TodayTodos from "./interfaces/TodayTodos";
import TodoItem from "./TodoItem";
import { isMoment } from "../../node_modules/moment";

const styles = {
  contentPart: {
    width: "80%",
  },
  contentFull: {
    width: "100%",
  }
};

class MainInterface extends React.Component
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
      showSidebar: true,
      interfaceToShow: "Todo",
      todoList: loadTodoList,
    }
  }

  toggleSidebar()
  {
    let currentSidebarState = this.state.showSidebar;
    this.setState({
      showSidebar: !currentSidebarState,
    });
  }

  handleforSidebarItem(value)
  {
    this.setState({
      interfaceToShow: value,
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
    todoList[itemNo].important = false;
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

  handleForTodoInfo(todo_info)
  {
    let todoList = this.state.todoList.slice(0, this.state.todoList.length+1);
    this.setState({
      todoList: todoList.concat(todo_info)
    });
  }

  componentDidUpdate()
  {
    let listDir = path.join(process.env.USERPROFILE, "Documents", "TodoApp");
    let listLocation = path.join(process.env.USERPROFILE, "Documents", "TodoApp", "data.json");
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

  createPendingItems()
  {
    let todoPendingItems = this.state.todoList.map((step, move) =>
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
    return todoPendingItems;
  }

  createCompletedItems()
  {
    let todoCompletedItems = this.state.todoList.map((step, move) =>
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
    return todoCompletedItems;
  }

  createTodayItems()
  {
    let todoTodayItems = this.state.todoList.map((step, move) =>
    {
      const todoTitle = this.state.todoList[move].title;
      const todoDetails = this.state.todoList[move].details;
      const todoDueDate = this.state.todoList[move].dueDate;
      const todoReminderTime = this.state.todoList[move].reminderTime;
      const todoStatus = this.state.todoList[move].status;
      const todoImportant = this.state.todoList[move].important;
      const todoPriority = this.state.todoList[move].priority;
      if ( moment().format("YYYY-MM-DD") === todoDueDate && todoStatus !== "Completed" )
      {
        return (
          <TodoItem
            id={"#accordion-today"}
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
    return todoTodayItems;
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
    let contentWidth;
    if (this.state.showSidebar === true)
      contentWidth = Object.assign({}, styles.contentPart);
    else
      contentWidth = Object.assign({}, styles.contentFull);
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <Navbar onClick={this.toggleSidebar.bind(this)}/>
        <div className="main-interface">
          <Sidebar
            show={this.state.showSidebar}
            handleSidebarItem={this.handleforSidebarItem.bind(this)}
            interfaceToShow={this.state.interfaceToShow}
          />
          <div id="content" style={contentWidth}>
            { this.state.interfaceToShow === "Todo" &&
              <GenericTodos
                showTodoModal={this.state.showTodoModal}
                createPendingItems={this.createPendingItems.bind(this)}
                createCompletedItems={this.createCompletedItems.bind(this)}
                handleForTodoModal={this.handleForTodoModal.bind(this)}
                handleForTodoInfo={this.handleForTodoInfo.bind(this)}
                handleForTodoToggle={this.toggleTodo.bind(this)}
              />
            }
            { this.state.interfaceToShow === "Today" &&
              <TodayTodos
                createTodayItems={this.createTodayItems.bind(this)}
              />
            }
            { this.state.interfaceToShow === "Important" &&
              <ImportantTodos
                createImportantItems={this.createImportantItems.bind(this)}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MainInterface;