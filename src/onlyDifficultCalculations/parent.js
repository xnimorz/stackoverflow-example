import React, { useCallback, useMemo } from "react";
import Child from "./child";

function counter(length) {
  if (length === 0) {
    return "";
  }
  return `${length}_${counter(length - 1)}`;
}

export default function({ length, title, executedTime }) {
  const items = useMemo(() => {
    console.log("Calculation");
    return [
      ...Array.from({ length }, (_, index) => ({
        text: counter(index),
        onClick: () => {
          alert(index);
        }
      }))
    ];
  }, [length]);

  return (
    <>
      <h2>{title + length}</h2>
      {items.map(({ text, onClick }, index) => (
        <p key={index}>
          <Child text={text} onClick={onClick} caption={`Button №${index}`} />
        </p>
      ))}
    </>
  );
}
