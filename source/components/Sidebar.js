import React from "react";

import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/Star";
import EditIcon from "@material-ui/icons/Edit";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

const styles = {
  leftIcon: {
    marginRight: "10px",
  }
};

// Reference: https://bootstrapious.com/p/bootstrap-sidebar
class Sidebar extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  handleItemClick(value)
  {
    this.props.handleSidebarItem(value);
  }

  render()
  {
    const activeClass = (this.props.show === true ? "" : "active");
    return (
      <nav id="sidebar" className={activeClass}>
        <ul className="list-unstyled components">
          <li onClick={this.handleItemClick.bind(this, "Today")}>
            { this.props.interfaceToShow === "Today" &&
              <a href="#" className="active"><AccessAlarmIcon style={styles.leftIcon} />Today</a>
            }
            { this.props.interfaceToShow !== "Today" &&
              <a href="#"><AccessAlarmIcon style={styles.leftIcon} />Today</a>
            }
          </li>
          <li onClick={this.handleItemClick.bind(this, "Todo")}>
            { this.props.interfaceToShow !== "Todo" &&
              <a href="#"><EditIcon style={styles.leftIcon} />Todo</a>
            }
            { this.props.interfaceToShow === "Todo" &&
              <a href="#" className="active"><EditIcon style={styles.leftIcon} />Todo</a>
            }
          </li>
          <li onClick={this.handleItemClick.bind(this, "Important")}>
            { this.props.interfaceToShow !== "Important" &&
              <a href="#"><StarIcon style={styles.leftIcon} />Important</a>
            }
            { this.props.interfaceToShow === "Important" &&
              <a href="#" className="active"><StarIcon style={styles.leftIcon} />Important</a>
            }
          </li>
        </ul>
        <ul className="list-unstyled components">
          <li onClick={this.handleItemClick.bind(this, "About")}>
            { this.props.interfaceToShow !== "About" &&
              <a href="#"><NewReleasesIcon style={styles.leftIcon} />About</a>
            }
            { this.props.interfaceToShow === "About" &&
              <a href="#" className="active"><NewReleasesIcon style={styles.leftIcon} />About</a>
            }
          </li>
          <li onClick={this.handleItemClick.bind(this, "Create New List")}>
            <a href="#"><AddIcon style={styles.leftIcon} />Create new list</a>
          </li>
        </ul>
        <ul className="list-unstyled components">
          <li>
            <a href="#"><FormatListBulletedIcon style={styles.leftIcon} />List name</a>
          </li>
        </ul>
    </nav>
    );
  }
}

export default Sidebar;