import React, { useState, useEffect } from "react";
import {
  FlexibleXYPlot,
  LineSeries,
  MarkSeries,
  LineMarkSeries
} from "react-vis";
import axios from "axios";
import "./Dungeon.scss";

function DungeonMap() {
  const [mapData, setMapData] = useState();
  const endpoint = `${process.env.REACT_APP_EDEN_HEROKU_API}adv/mapdata/`;
  useEffect(() => {
    axios
      .get(endpoint)
      .then(res => {
        // console.log(res, "this is the map");
        setMapData(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(mapData, "this is map data");

  if (!mapData) {
    return <div>loading...</div>;
  }

  //   array[2], if array[3] x and y both change
  //   insert array[2] after array[3]

  //   map through mapData
  let cordArr = [];
  if (mapData) {
    console.log(mapData);
    let sortedArr = mapData.data.map(item => {
      return [item.x, item.y, item.id];
    });
    // sort rooms by id #  <_>
    sortedArr.sort((x, y) => x[2] - y[2]);
    for (let i = 0; i < sortedArr.length; i++) {
      cordArr.push({
        x: sortedArr[i][0],
        y: sortedArr[i][1]
      });
    }
  }
  console.log(cordArr, "this is the cord");

  return (
    <>
      <div className="mapContainer">
        <FlexibleXYPlot width={900} height={900}>
          <LineMarkSeries
            strokeWidth="2"
            fill="#fff"
            stroke="#fff"
            data={cordArr}

            //   key={Math.random() * 100}
          />
          {/* ))} */}
          <MarkSeries
            strokeWidth={5}
            opacity="1"
            size="4"
            color="Red"
            fill="#fff"
            data={[
              { x: 0, y: 1 }
              //   { x: 1, y: 2 },
              //   { x: 2, y: 3 },
              //   { x: 3, y: 4 },
              //   { x: 4, y: 5 },
              //   { x: 5, y: 6 },
              //   { x: 6, y: 7 },
              //   { x: 7, y: 7 },
              //   { x: 8, y: 7 },
              //   { x: 8, y: 7 },
              //   { x: 9, y: 7 }
            ]}
            style={{ cursor: "pointer" }}
          />
        </FlexibleXYPlot>
      </div>
    </>
  );
}

export default DungeonMap;
