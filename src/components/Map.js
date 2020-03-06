import React, { useState, useEffect } from "react";
import {
  FlexibleXYPlot,
  LineSeries,
  MarkSeries,
  LineMarkSeries
} from "react-vis";
import axios from "axios";
import "./Dungeon.scss";
import axiosWithAuth from "../axiosWithAuth/axiosWithAuth";
import up from "../assets/chevron.png";
import down from "../assets/down-arrow.png";
import right from "../assets/right.png";
import left from "../assets/left.png";

function DungeonMap() {
  //////////map data object////////
  const [mapData, setMapData] = useState();
  const [playerCordData, setPlayerCordData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [gameData, setGameData] = useState([]);
  const moveEndPoint = `${process.env.REACT_APP_EDEN_HEROKU_API}adv/move/`;
  const endpoint = `${process.env.REACT_APP_EDEN_HEROKU_API}adv/mapdata/`;
  const init = `${process.env.REACT_APP_EDEN_HEROKU_API}adv/init/`;
  useEffect(() => {
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        setMapData(res.data);
      })
      .catch(err => console.log(err));
    axiosWithAuth()
      .get(init)
      .then(res => {
        setPlayerCordData([{ x: res.data.x, y: res.data.y }]);
      })
      .catch(err => console.log(err));
  }, []);
  // game data
  useEffect(() => {
    axiosWithAuth()
      .get(init)
      .then(res => {
        setGameData(res.data);
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  console.log(gameData.title);

  if (!mapData || playerCordData.length === 0) {
    return <div>loading...</div>;
  }
  let cordArr = [];
  if (mapData) {
    let sortedArr = mapData.data.map(item => {
      return [
        item.x,
        item.y,
        item.id,
        item.n_to,
        item.s_to,
        item.e_to,
        item.w_to,
        item.title
      ];
    });
    // sort rooms by id #  <_>
    sortedArr.sort((x, y) => x[2] - y[2]);
    for (let i = 0; i < sortedArr.length; i++) {
      let counter = 0;
      for (let j = 3; j < sortedArr[i].length; j++) {
        if (sortedArr[i][j] > 0) {
          counter += 1;
        }
      }
      if (counter > 1 || i === 0) {
        cordArr.push({
          x: sortedArr[i][0],
          y: sortedArr[i][1]
        });
      } else {
        cordArr.push({
          x: sortedArr[i][0],
          y: sortedArr[i][1]
        });

        cordArr.push({
          x: sortedArr[i - 1][0],
          y: sortedArr[i - 1][1]
        });
      }
    }
  }

  document.onkeydown = checkKey;
  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == "38") {
      // up arrow
      let north = {
        direction: "n"
      };
      axiosWithAuth()
        .post(moveEndPoint, north)
        .then(res => {
          console.log(res, "this is the player moves");
          setPlayerCordData([{ x: res.data.x, y: res.data.y }]);
        })
        .catch(err => console.log(err));
    } else if (e.keyCode == "40") {
      // down arrow
      let south = {
        direction: "s"
      };
      axiosWithAuth()
        .post(moveEndPoint, south)
        .then(res => {
          console.log(res, "this is the player moves");
          setPlayerCordData([{ x: res.data.x, y: res.data.y }]);
        })
        .catch(err => console.log(err));
    } else if (e.keyCode == "37") {
      // left arrow
      let west = {
        direction: "w"
      };
      axiosWithAuth()
        .post(moveEndPoint, west)
        .then(res => {
          console.log(res, "this is the player moves");
          setPlayerCordData([{ x: res.data.x, y: res.data.y }]);
        })
        .catch(err => console.log(err));
    } else if (e.keyCode == "39") {
      // right arrow
      let east = {
        direction: "e"
      };
      axiosWithAuth()
        .post(moveEndPoint, east)
        .then(res => {
          console.log(res, "this is the player moves");
          setPlayerCordData([{ x: res.data.x, y: res.data.y }]);
        })
        .catch(err => console.log(err));
    }
  }
  const controls = (e, direction) => {
    e.preventDefault();
    axiosWithAuth()
      .post(moveEndPoint, { direction })
      .then(res => {
        setPlayerCordData([{ x: res.data.x, y: res.data.y }]);
      })
      .catch(err => console.log(err));
  };

  console.log(cordArr);
  return (
    <>
      <div className="mapContainer">
        <div className="gameInner">
          <FlexibleXYPlot width={900} height={800}>
            <LineMarkSeries
              strokeWidth="2"
              fill="#c3c3c3"
              stroke="#c3c3c3"
              data={cordArr}
            />
            <MarkSeries
              strokeWidth={5}
              opacity="1"
              size="4"
              color="red"
              // fill="#fff"
              data={playerCordData}
              style={{ cursor: "pointer" }}
            />
          </FlexibleXYPlot>
        </div>
        <div className="controlContainer">
          <div className="controlTop">
            <p onClick={e => controls(e, "n")}>
              <img src={up} alt="up arrow" />
            </p>
          </div>
          <div className="controlMid">
            <p onClick={e => controls(e, "w")}>
              <img src={left} alt="up arrow" />
            </p>
            <p onClick={e => controls(e, "e")}>
              <img src={right} alt="up arrow" />
            </p>
          </div>
          <div className="controlBottom">
            <p onClick={e => controls(e, "s")}>
              <img src={down} alt="up arrow" />
            </p>
          </div>
        </div>
        <div className="messageContainer"></div>
      </div>
    </>
  );
}

export default DungeonMap;
