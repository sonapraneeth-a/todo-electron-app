import React from "react";

class TodayTodos extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    const todoTodayItems = this.props.createTodayItems();
    return (
      <div>
        <h4>Today Todos</h4>
        <div id="accordion-today">
          {todoTodayItems}
        </div>
      </div>
    );
  }
}

export default TodayTodos;