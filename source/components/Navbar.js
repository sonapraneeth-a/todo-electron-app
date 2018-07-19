import React from "react";

import NoteIcon from "@material-ui/icons/Dehaze";

class Navbar extends React.Component
{
  render()
  {
    return (
      <nav id="sidebarCollapse" className="navbar fixed-top navbar-dark bg-dark">
        <div style={{color: "white"}} onClick={this.props.onClick}>
          <NoteIcon />
        </div>
        <a className="navbar-brand" href="#">Todo App</a>
      </nav>
    );
  }
}

export default Navbar;