import React, { useCallback, memo, useRef } from "react";

export default function({ text, onClick, caption }) {
  const rendersCount = useRef(0);
  rendersCount.current += 1;
  return (
    <button
      title={text}
      onClick={e => {
        console.log(text);
        onClick(e);
      }}
    >
      {caption} Rendered: {rendersCount.current} times
    </button>
  );
}
