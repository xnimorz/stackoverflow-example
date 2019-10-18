import React, { useState, useEffect } from "react";
import reactDOM from "react-dom";
import "./App.css";

import PureRenderer from "./pure/render";
import NotPureRenderer from "./notPure/render";
import BadPureRenderer from "./badPure/render";
import WithoutAnything from "./withoutAnything/render";
import OnlyDifficult from "./onlyDifficultCalculations/render";

const Config = [
  {
    Component: PureRenderer
  },
  {
    Component: NotPureRenderer
  },
  {
    Component: BadPureRenderer
  },
  {
    Component: WithoutAnything
  },
  {
    Component: OnlyDifficult
  }
];
function Noop() {
  return null;
}

function benchmark(Element, id, callback) {
  const runs = [];
  const COUNT = 100;
  const RERENDERS = 10;

  function avg() {
    callback(runs.reduce((store, current) => store + current));
  }

  function rerender(count, index, div, start) {
    reactDOM.render(
      <Element
        title={`Hell renders: ${count} items: `}
        length={100}
        key={id}
      />,
      div,
      () => {
        if (count === RERENDERS) {
          runs[index] = performance.now() - start;
          console.log(index, ": ", runs[index]);
          run(index + 1);
          return;
        }
        rerender(count + 1, index, div, start);
      }
    );
  }

  function run(index) {
    if (index === COUNT - 1) {
      avg();
      return;
    }
    const start = performance.now();
    const div =
      index === COUNT - 2
        ? document.querySelector(`.field-${id}`)
        : document.createElement("div");
    rerender(0, index, div, start);
  }

  run(0);
}

function App() {
  const [id, setId] = useState(null);
  const [time, setTime] = useState([
    "Not executed",
    "Not executed",
    "Not executed",
    "Not executed",
    "Not executed"
  ]);
  const Element = id !== null ? Config[id].Component : Noop;

  useEffect(() => {
    if (id === null) return;
    benchmark(Element, id, result => {
      setTime(time => {
        let times = [...time];
        times[id] = result;
        return times;
      });
    });
  }, [id]);

  return (
    <div>
      <button
        onClick={() => {
          setId(null);
          setTime([
            "Not executed",
            "Not executed",
            "Not executed",
            "Not executed",
            "Not executed"
          ]);
        }}
      >
        Очистить
      </button>
      <button
        onClick={() => {
          setId(0);
          setTime(time => {
            let times = [...time];
            times[0] = "executing";
            return times;
          });
        }}
      >
        Pure
      </button>
      <button
        onClick={() => {
          setId(1);
          setTime(time => {
            let times = [...time];
            times[1] = "executing";
            return times;
          });
        }}
      >
        Not Pure
      </button>
      <button
        onClick={() => {
          setId(2);
          setTime(time => {
            let times = [...time];
            times[2] = "executing";
            return times;
          });
        }}
      >
        Bad Pure
      </button>
      <button
        onClick={() => {
          setId(3);
          setTime(time => {
            let times = [...time];
            times[3] = "executing";
            return times;
          });
        }}
      >
        WithoutAnything
      </button>
      <button
        onClick={() => {
          setId(4);
          setTime(time => {
            let times = [...time];
            times[4] = "executing";
            return times;
          });
        }}
      >
        Only Difficult Calculations
      </button>
      <div>Pure executed time: {time[0]}</div>
      <div>Not Pure executed time: {time[1]}</div>
      <div>Bad Pure executed time: {time[2]}</div>
      <div>WithoutAnything executed time: {time[3]}</div>
      <div>OnlyDifficultCalculations executed time: {time[4]}</div>
      <div className={`field-${id}`} />
    </div>
  );
}

export default App;
