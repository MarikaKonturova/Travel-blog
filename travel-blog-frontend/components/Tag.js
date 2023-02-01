import React from "react";

const Tag = ({ title }) => {
  const getColor = () => {
    let color;
    switch (title.toLowerCase()) {
      case "travel":
        color = "rgb(210,138,138)";
        break;
      case "storytime":
        color = "rgb(168,218,138";
        break;
      default:
        color = "rgb(129,138,210)";
    }
    return color;
  };
  return (
    <div style={{ backgroundColor: getColor() }} className="tag">
      {title}
    </div>
  );
};

export default Tag;
