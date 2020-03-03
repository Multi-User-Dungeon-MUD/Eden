import React from "react";
import {
  FlexibleXYPlot,
  LineSeries,
  MarkSeries,
  LineMarkSeries
} from "react-vis";

function DungeonMap() {
  return (
    <div>
      <div className="dunContainer">
        <FlexibleXYPlot width={600} height={600}>
          {/* {links.map(link => ( */}
          <LineMarkSeries
            strokeWidth="2"
            fill="#fff"
            stroke="#fff"
            data={[
              { x: 0, y: 1 },
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 4 },
              { x: 4, y: 5 },
              { x: 5, y: 6 },
              { x: 6, y: 7 },
              { x: 7, y: 7 },
              { x: 8, y: 7 },
              { x: 8, y: 7 },
              { x: 9, y: 7 }
            ]}

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
              { x: 0, y: 1 },
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 4 },
              { x: 4, y: 5 },
              { x: 5, y: 6 },
              { x: 6, y: 7 },
              { x: 7, y: 7 },
              { x: 8, y: 7 },
              { x: 8, y: 7 },
              { x: 9, y: 7 }
            ]}
            style={{ cursor: "pointer" }}
          />
        </FlexibleXYPlot>
      </div>
    </div>
  );
}

export default DungeonMap;
