import React, { useCallback, memo, useRef } from "react";

export default memo(function({ text, onClick, caption }) {
  const rendersCount = useRef(0);
  rendersCount.current += 1;
  return (
    <button
      title={text}
      onClick={useCallback(
        e => {
          console.log(text);
          onClick(e);
        },
        [onClick]
      )}
    >
      {caption} Rendered: {rendersCount.current} times
    </button>
  );
});
