import React from "react";

const styles = {
  iconBox: {
    display: "flex",
    alignItems: "center",
    padding: ".375rem .75rem",
    marginBottom: "0",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#495057",
    textAlign: "center",
    whiteSpace: "nowrap",
    backgroundColor: "#e9ecef",
    border: "1px solid #ced4da",
    borderRadius: "0"
  }
};

class IconBox extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div style={{display: "flex", position: "relative", flexWrap: "wrap", alignItems: "stretch", width: "50px", cursor: "pointer"}}>
        <div style={Object.assign({}, styles.iconBox, this.props.style)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default IconBox;