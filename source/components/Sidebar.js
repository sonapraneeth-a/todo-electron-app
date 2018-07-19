import React from "react";

// Reference: https://bootstrapious.com/p/bootstrap-sidebar
class Sidebar extends React.Component
{
  render()
  {
    const activeClass = (this.props.show === true ? "" : "active");
    return (
      <nav id="sidebar" className={activeClass}>
        <div className="sidebar-header">
          <h3>Todo App</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
              <a href="#">About</a>
          </li>
          <li>
              <a href="#">New List</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
      </ul>
    </nav>
    );
  }
}

export default Sidebar;