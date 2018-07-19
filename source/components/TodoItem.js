import React from "react";
import moment from "moment";
import marked from "marked";

import DeleteIcon from '@material-ui/icons/Delete';
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StarIcon from '@material-ui/icons/Star';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

import IconBox from "./IconBox";

const styles = theme => ({
  timeItem: {
   textAlign: "right",
  },
  strikeOut: {
    textDecoration: "line-through",
  }
});

class TodoItem extends React.Component
{
  deleteItem()
  {
    this.props.handleForDeleteItem(this.props.itemNo);
  }

  completedItem()
  {
    this.props.handleForCompletedItem(this.props.itemNo);
  }

  importantItem()
  {
    this.props.handleForImportantItem(this.props.itemNo);
  }

  render()
  {
    const dispDate = moment(this.props.todoDueDate, 'YYYY-MM-DD');
    const dispDateString = dispDate.format('DD MMMM YYYY');
    const dispTime = moment(this.props.todoReminderTime, 'YYYY-MM-DD HH:mm A');
    const dispTimeString = dispTime.format('DD MMMM YYYY HH:mm A');
    const checkboxValue = (this.props.todoStatus === "Pending" ? false : true);
    const itemCheckout = (checkboxValue === true ? "strike-out": "");
    const todoDetails = this.props.todoDetails.replace(/\n/g,"<br/>");
    const todoPriority = this.props.todoPriority;
    let todoPriorityClass = "";
    if(todoPriority === "Low") todoPriorityClass = "primary";
    if(todoPriority === "Normal") todoPriorityClass = "dark";
    if(todoPriority === "Important") todoPriorityClass = "warning";
    if(todoPriority === "Critical") todoPriorityClass = "danger";
    // Reference: https://www.w3schools.com/bootstrap4/bootstrap_collapse.asp
    return (
      <div style={{display: "flex", margin: "10px auto"}}>
        <IconBox>
          { this.props.todoStatus === "Pending" && 
            <RadioButtonUncheckedIcon 
              onClick={this.completedItem.bind(this)}
            />
          }
          { this.props.todoStatus === "Completed" && 
            <CheckCircleIcon
              onClick={this.completedItem.bind(this)}
            />
          }
        </IconBox>
        <div className="card" style={{width: "100%", borderRadius: "0"}}>
          { this.props.todoStatus === "Pending" && 
          <a 
            className="card-header card-link"
            data-toggle="collapse"
            href={"#collapse"+this.props.todoStatus+this.props.itemNo} style={{display: "block"}}>
            <div style={{display: "flex", flexDirection: "row", alignSelf: "align-end"}}>
              <p className="text-info" style={{margin: "auto 10px", width: "90%", flexWrap: "wrap"}}>{this.props.todoTitle}</p>
              <div style={{justifyContent: "flex-end", width: "10%", marginRight: "10px", display: "flex", flexWrap: "wrap"}}>
                <p className={"text-"+todoPriorityClass} style={{margin: "auto 10px"}}>{todoPriority}</p>
              </div>
              <DownArrowIcon style={{position: "absolute", right: "10px"}}/>
            </div>
          </a>
          }
          { this.props.todoStatus === "Completed" && 
          <a 
            className="card-header card-link"
            data-toggle="collapse"
            href={"#collapse"+this.props.todoStatus+this.props.itemNo} style={{display: "block", textDecoration: "line-through"}}>
            <div style={{display: "flex", flexDirection: "row", alignSelf: "align-end"}}>
              <p className="text-info" style={{margin: "auto 10px", width: "90%", flexWrap: "wrap"}}>{this.props.todoTitle}</p>
              <div style={{justifyContent: "flex-end", width: "10%", marginRight: "10px", display: "flex", flexWrap: "wrap"}}>
                <p className={"text-"+todoPriorityClass} style={{margin: "auto 10px"}}>{todoPriority}</p>
              </div>
              <DownArrowIcon style={{position: "absolute", right: "10px"}}/>
            </div>
          </a>
          }
          <div
            id={"collapse"+this.props.todoStatus+this.props.itemNo}
            className={"collapse"}
            data-parent={this.props.id}>
            <div className="card-body">
              <p dangerouslySetInnerHTML={{__html: marked(this.props.todoDetails)}}/>
              <p>
                <span><AccessAlarmIcon /> {dispTimeString}</span>
              </p>
            </div>
          </div>
        </div>
        <IconBox>
          <DeleteIcon 
            color="error"
            onClick={this.deleteItem.bind(this)}/>
        </IconBox>
        { this.props.todoStatus === "Pending" && this.props.todoImportant === true && 
          <IconBox>
            <StarIcon style={{color: "#ffc107"}}
              onClick={this.importantItem.bind(this)}/>
          </IconBox>
        }
        { this.props.todoStatus === "Pending" && this.props.todoImportant === false && 
          <IconBox>
            <StarIcon 
              onClick={this.importantItem.bind(this)}/>
          </IconBox>
        }
      </div>
    );
  }
}

export default TodoItem;