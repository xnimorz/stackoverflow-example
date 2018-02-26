import React, { Component } from "react";
import { DragSource } from "react-dnd";
import logo from "./logo.svg";
import { getEmptyImage } from "react-dnd-html5-backend";

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

    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    connectDragPreview(getEmptyImage());
  }
  render() {
    const { connectDragSource, isDragging, children } = this.props;
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: "green" }}>
        {children}
      </div>
    );
  }
}

const tokenSpec = {
  beginDrag() {
    return {};
  }
};

export default DragSource("DropType.Markup", tokenSpec, tokenCollector)(
  TokenClass
);
