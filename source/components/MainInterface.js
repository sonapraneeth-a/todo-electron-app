import React from "react";
import moment from "moment";

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
    this.state = {
      showTodoModal: false,
      todoList: [],
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
    let todoList = this.state.todoList.slice(0, 3);
    this.setState({
      todoList: todoList.concat(todo_info)
    })
    this.render();
  }

  render()
  {
    const todoItems = this.state.todoList.map((step, move) =>
    {
      const todoTitle = this.state.todoList[move].title;
      const todoDetails = this.state.todoList[move].details;
      const todoDate = this.state.todoList[move].date;
      const todoTime = this.state.todoList[move].time;
      return (
        <TodoItem
          key={move} 
          todoTitle={todoTitle}
          todoDetails={todoDetails}
          todoDate={todoDate}
          todoTime={todoTime}
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