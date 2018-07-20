import React from "react";
import fs from "fs";
import path from "path";

import TodoItem from "../TodoItem";

class ImportantTodos extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    const todoImportantItems = this.props.createImportantItems();
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