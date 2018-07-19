import React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import marked from "marked";

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StarIcon from '@material-ui/icons/Star';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import red from '@material-ui/core/colors/red';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IconBox from "./IconBox";
import { Icon } from "../../node_modules/@material-ui/core";

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

  render()
  {
    const { classNamees } = this.props;
    const dispDate = moment(this.props.todoDueDate, 'YYYY-MM-DD');
    const dispDateString = dispDate.format('DD MMMM YYYY');
    const dispTime = moment(this.props.todoReminderTime, 'YYYY-MM-DD HH:mm A');
    console.log("Disptime: " + dispTime);
    const dispTimeString = dispTime.format('DD MMMM YYYY HH:mm A');
    const checkboxValue = (this.props.todoStatus === "Pending" ? false : true);
    const itemCheckout = (checkboxValue === true ? "strike-out": "");
    const todoDetails = this.props.todoDetails.replace(/\n/g,"<br/>");
    /*const collapseClass = (this.props.itemNo === 0 ? "show": "");
    console.log(this.props.todoStatus);
    console.log(this.props.itemNo);*/
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
          <a 
            className="card-header card-link"
            data-toggle="collapse"
            href={"#collapse"+this.props.todoStatus+this.props.itemNo} style={{display: "block"}}>
            {this.props.todoTitle}
            <DownArrowIcon style={{position: "absolute", right: "10px"}}/>
          </a>
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
        { this.props.todoStatus === "Pending" &&
          <IconBox style={{color: "#ffc107"}}>
            <StarIcon 
              />
          </IconBox>
        }
      </div>
    );
  }
}

{/*<div style={{width: "100%"}}>
        <ExpansionPanel key={this.props.itemNo} style={{display: "flex"}} classNameName={itemCheckout}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Checkbox
            checked={checkboxValue}
            tabIndex={-1}
            disableRipple
            onClick={this.completedItem.bind(this)}
          />
          <DeleteIcon
            color="error"
            onClick={this.deleteItem.bind(this)}/>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
          </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>*/}

{/*<ListItem
        key={this.props.itemNo}
        role={undefined}
        dense
        //style={{textDecoration: "line-through"}}
        //classNameName={itemCheckout}
        classNameName={classNamees.strikeOut}
      >
        <Checkbox
          checked={checkboxValue}
          tabIndex={-1}
          disableRipple
          onClick={this.completedItem.bind(this)}
        />
        <ListItemText
          primary={this.props.todoTitle}
          secondary={this.props.todoDetails}
        />
        <ListItemText
          primary={dispDateString}
          secondary={dispTimeString}
          classNameName={classNamees.timeItem}
        />
        <DeleteIcon
          color="error"
          onClick={this.deleteItem.bind(this)}/>
      </ListItem>*/}
      

/*TodoItem.propTypes = {
  classNames: PropTypes.object.isRequired,
};*/


export default TodoItem;