import React from "react";
import fs from "fs";
import path from "path";

import AddIcon from '@material-ui/icons/Add';

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import GenericTodos from "./interfaces/GenericTodos";
import ImportantTodos from "./interfaces/ImportantTodos";
import TodayTodos from "./interfaces/TodayTodos";

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

  handleforSidebarItem(value)
  {
    this.setState({
      interfaceToShow: value,
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
          <Sidebar
            show={this.state.showSidebar}
            handleSidebarItem={this.handleforSidebarItem.bind(this)}
            interfaceToShow={this.state.interfaceToShow}
          />
          <div id="content" style={contentWidth}>
            { this.state.interfaceToShow === "Todo" &&
              <GenericTodos />
            }
            { this.state.interfaceToShow === "Today" &&
              <TodayTodos />
            }
            { this.state.interfaceToShow === "Important" &&
              <ImportantTodos />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MainInterface;