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
    return [
      ...Array.from({ length }, (_, index) => ({
        text: counter(index)
      }))
    ];
  }, [length]);

  const text = useMemo(() => title + length, [length, title]);

  return (
    <>
      <h2>{text}</h2>
      <div>Executed time: {executedTime}</div>
      {items.map(({ text }, index) => (
        <p key={index}>
          <Child
            text={text}
            onClick={() => {
              alert(index);
            }}
            caption={`Button №${index}`}
          />
        </p>
      ))}
    </>
  );
}
