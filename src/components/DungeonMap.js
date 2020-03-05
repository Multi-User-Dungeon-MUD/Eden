import React, { useState, useEffect } from "react";
import "./Dungeon.scss";
import { scaleLinear } from "d3-scale";
import {
  XYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  LabelSeries,
  Hint
} from "react-vis";

import axios from "axios";

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
// const data = alphabet.reduce((acc, letter1, idx) => {
//   return acc.concat(
//     alphabet.map((letter2, jdx) => ({
//       x: `${letter1}1`,
//       y: `${letter2}2`,
//       color: (idx + jdx) % Math.floor(jdx / idx) || idx
//     }))
//   );
// }, []);

// for (let i = 0; i < 25; i++) {
//   let randomInt = Math.floor(Math.random() * 100);
//   if (randomInt > 0) {
//     data.splice(randomInt, 1);
//   }
// }
// console.log(data);
function LabeledHeatmap(props) {
  const [value, setValue] = useState(false);
  const [selected, setSelected] = useState([]);

  const endpoint = `${process.env.REACT_APP_EDEN_HEROKU_API}adv/mapdata/`;
  const [mapData, setMapData] = useState();
  useEffect(() => {
    axios
      .get(endpoint)
      .then(res => {
        console.log(res, "this is the map");
        setMapData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const data = [
    { x: "A1", y: "A2", color: "player" },
    { x: "A1", y: "B2", color: "not" },
    { x: "A1", y: "C2", color: "not" },
    { x: "A1", y: "E2", color: "not" },
    { x: "A1", y: "F2", color: "not" },
    { x: "A1", y: "G2", color: "not" },
    { x: "A1", y: "H2", color: "not" },
    { x: "A1", y: "I2", color: "not" },
    { x: "A1", y: "J2", color: "not" },
    { x: "B1", y: "A2", color: "not" },
    { x: "B1", y: "B2", color: "not" },
    { x: "B1", y: "C2", color: "not" },
    { x: "B1", y: "D2", color: "not" }
    // { x: "B1", y: "E2", color: 1 },
    // { x: "B1", y: "F2", color: 1 },
    // { x: "B1", y: "G2", color: 1 },
    // { x: "B1", y: "H2", color: 1 },
    // { x: "B1", y: "I2", color: 1 },
    // { x: "B1", y: "J2", color: 1 },
    // { x: "C1", y: "A2", color: 2 },
    // { x: "C1", y: "B2", color: 2 }
  ];

  const { min, max } = data.reduce(
    (acc, row) => ({
      min: Math.min(acc.min, row.color),
      max: Math.max(acc.max, row.color)
    }),
    { min: Infinity, max: -Infinity }
  );

  {
    // const { value } = this.state;

    const exampleColorScale = scaleLinear()
      .domain([min, (min + max) / 2, max])
      .range(["orange", "white", "cyan"]);
    return (
      <div className="mapContainer">
        <XYPlot
          xType="ordinal"
          xDomain={alphabet.map(letter => `${letter}1`)}
          yType="ordinal"
          yDomain={alphabet.map(letter => `${letter}2`).reverse()}
          margin={50}
          width={900}
          height={900}
        >
          {/* <XAxis orientation="top" />
          <YAxis /> */}
          <HeatmapSeries
            colorType="literal"
            getColor={d => exampleColorScale(d.color)}
            style={{
              stroke: "white",
              strokeWidth: "2px",
              rectStyle: {
                rx: 10,
                ry: 10
              }
            }}
            className="heatmap-series-example"
            data={data}
            getColor={d => (d.color === "player" ? "red" : "cyan")}
            onValueClick={d => setSelected({ selected: d })}
            // style={selected ? { stroke: "red" } : { stroke: "green" }}

            // onSeriesMouseOut={v => setValue({ value: false })}
          />
          {console.log(selected)}
          <LabelSeries
            style={{ pointerEvents: "none" }}
            data={data}
            labelAnchorX="middle"
            labelAnchorY="baseline"
            // getLabel={d => `${d.color}`}
            // value={d => `${"A1"}`}
          />
          {/* {value !== false && <Hint value={value} />} */}
        </XYPlot>
      </div>
    );
  }
}
export default LabeledHeatmap;

// 21: {x: "C1", y: "C2", color: 2}
// 22: {x: "C1", y: "D2", color: 2}
// 23: {x: "C1", y: "E2", color: 2}
// 24: {x: "C1", y: "J2", color: 3}
// 25: {x: "D1", y: "A2", color: 3}
// 26: {x: "D1", y: "B2", color: 3}
// 27: {x: "D1", y: "E2", color: 3}
// 28: {x: "D1", y: "F2", color: 3}
// 29: {x: "D1", y: "G2", color: 1}
// 30: {x: "D1", y: "I2", color: 1}
// 31: {x: "D1", y: "J2", color: 3}
// 32: {x: "E1", y: "B2", color: 4}
// 33: {x: "E1", y: "D2", color: 4}
// 34: {x: "E1", y: "E2", color: 4}
// 35: {x: "E1", y: "F2", color: 4}
// 36: {x: "E1", y: "G2", color: 4}
// 37: {x: "E1", y: "I2", color: 4}
// 38: {x: "E1", y: "J2", color: 1}
// 39: {x: "F1", y: "A2", color: 5}
// 40: {x: "F1", y: "B2", color: 5}
// 41: {x: "F1", y: "C2", color: 5}
// 42: {x: "F1", y: "D2", color: 5}
// 43: {x: "F1", y: "E2", color: 5}
// 44: {x: "F1", y: "F2", color: 5}
// 45: {x: "F1", y: "G2", color: 5}
// 46: {x: "F1", y: "I2", color: 5}
// 47: {x: "G1", y: "B2", color: 6}
// 48: {x: "G1", y: "C2", color: 6}
// 49: {x: "G1", y: "D2", color: 6}
// 50: {x: "G1", y: "E2", color: 6}
// 51: {x: "G1", y: "F2", color: 6}
// 52: {x: "G1", y: "G2", color: 6}
// 53: {x: "G1", y: "H2", color: 6}
// 54: {x: "G1", y: "I2", color: 6}
// 55: {x: "H1", y: "A2", color: 7}
// 56: {x: "H1", y: "B2", color: 7}
// 57: {x: "H1", y: "C2", color: 7}
// 58: {x: "H1", y: "D2", color: 7}
// 59: {x: "H1", y: "E2", color: 7}
// 60: {x: "H1", y: "G2", color: 7}
// 61: {x: "H1", y: "H2", color: 7}
// 62: {x: "H1", y: "I2", color: 7}
// 63: {x: "I1", y: "B2", color: 8}
// 64: {x: "I1", y: "F2", color: 8}
// 65: {x: "I1", y: "G2", color: 8}
// 66: {x: "I1", y: "H2", color: 8}
// 67: {x: "I1", y: "I2", color: 8}
// 68: {x: "I1", y: "J2", color: 8}
// 69: {x: "J1", y: "A2", color: 9}
// 70: {x: "J1", y: "B2", color: 9}
// 71: {x: "J1", y: "C2", color: 9}
// 72: {x: "J1", y: "D2", color: 9}
// 73: {x: "J1", y: "F2", color: 9}
// 74: {x: "J1", y: "G2", color: 9}
// 75: {x: "J1", y: "H2", color: 9}
// 76: {x: "J1", y: "I2", color: 9}
// 77: {x: "J1", y: "J2", color: 9}
