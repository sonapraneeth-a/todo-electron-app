import React from "react";

// Reference: https://stackoverflow.com/questions/34846352/how-to-add-multiple-style-attributes-to-a-react-element
const styles = {
  fabSmall:
  {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
  },
  fabLarge:
  {
    borderRadius: "50%",
    width: "60px",
    height: "60px",
  },
};

class BootstrapButton extends React.Component
{
  constructor(props)
  {
    super(props);
    this.buttonTypes = ["primary", "secondary", "success", 
                        "danger", "warning", "info", "light", 
                        "dark", "link"];
    this.buttonSizes = ["large", "small"];
    this.buttonClassSizes = ["lg", "sm"];
  }

  render()
  {
    let buttonStyle;
    let className = "btn";
    if(this.props.outline === false)
    {
      if(this.props.type != null && 
          this.props.type != "" && 
          this.buttonTypes.indexOf(this.props.type) !== -1)
      {
        className += " btn-"+this.props.type;
      }
    }
    else
    {
      if(this.props.type != null && 
        this.props.type != "" && 
        this.buttonTypes.indexOf(this.props.type) !== -1)
      {
        className += " btn-outline-"+this.props.type;
      }
    }
    if(this.props.type != null && 
      this.props.type != "" && 
      this.buttonSizes.indexOf(this.props.size) !== -1)
    {
      className += (" btn-"+this.buttonClassSizes[this.buttonSizes.indexOf(this.props.size)]);
      if (this.props.size === "large")
        buttonStyle = Object.assign({}, styles.fabLarge, this.props.style);
      if (this.props.size === "small")
        buttonStyle = Object.assign({}, styles.fabSmall, this.props.style);
    }
    return (
      <button
        data-toggle={this.props.dataToggle}
        data-target={this.props.dataTarget}
        data-dismiss={this.props.dataDismiss}
        type={this.props.role}
        className={className}
        style={buttonStyle}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default BootstrapButton;