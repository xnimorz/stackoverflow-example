import React, { Component } from "react";
import { DragSource } from "react-dnd";
import logo from "./logo.svg";

export const tokenCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

class TokenClass extends React.Component {
  componentDidMount() {
    const { connectDragPreview } = this.props;
    const img = new Image();
    img.src = logo;
    img.onload = () => connectDragPreview(img);
  }
  render() {
    const { connectDragSource, isDragging, children } = this.props;
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: "red" }}>
        {children}
      </div>
    );
  }
}

const tokenSpec = {
  beginDrag(props) {
    return {};
  }
};

export default DragSource("DropType.Token", tokenSpec, tokenCollector)(
  TokenClass
);
