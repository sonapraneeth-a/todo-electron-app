import React from "react";
import fs from "fs";
import path from "path";

import AddIcon from '@material-ui/icons/Add';

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import GenericTodo from "./GenericTodo";

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
    this.state = {
      showSidebar: true,
      interfaceToShow: "Todo",
    }
  }

  toggleSidebar()
  {
    let currentSidebarState = this.state.showSidebar;
    this.setState({
      showSidebar: !currentSidebarState,
    });
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
          <Sidebar show={this.state.showSidebar}/>
          <div id="content" style={contentWidth}>
            { this.state.interfaceToShow === "Todo" &&
              <GenericTodo />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MainInterface;