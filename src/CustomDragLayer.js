import React, { Component } from "react";
import { DragLayer } from "react-dnd";

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

class CustomDragLayer extends Component {
  render() {
    const isDragging = this.props.isDragging;
    if (!isDragging) {
      return null;
    }

    // You can specify acceptable type:
    if (this.props.itemType !== "DropType.Markup") {
      return null;
    }

    // The component will work only when dragging
    return (
      <div>
        <div style={getItemStyles(this.props)}>Custom drag layer!</div>
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer); // eslint-disable-line new-cap
