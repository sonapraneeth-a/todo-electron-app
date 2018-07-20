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
  render()
  {
    const activeClass = (this.props.show === true ? "" : "active");
    return (
      <nav id="sidebar" className={activeClass}>
        <ul className="list-unstyled components">
          <li>
            <a href="#"><AccessAlarmIcon style={styles.leftIcon} />Today</a>
          </li>
          <li>
            <a href="#" className="active"><EditIcon style={styles.leftIcon} />Todo</a>
          </li>
          <li>
            <a href="#"><StarIcon style={styles.leftIcon} />Important</a>
          </li>
        </ul>
        <ul className="list-unstyled components">
          <li>
            <a href="#"><NewReleasesIcon style={styles.leftIcon} />About</a>
          </li>
          <li>
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