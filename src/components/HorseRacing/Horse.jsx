import "./horsegame.css";
import { useState } from "react";

export default function Horse(props) {
  const [speed, setSpeed] = useState(Math.random() * 10 + 10);
  const originX = props.x;
 // const originY = props.y;
  var x = props.x;
  var y = props.y;
  const number = props.number;
  const [stand, setStand] = useState("horse standRight");
  const [positionX, setPositionX] = useState(x);
  //const [positionY, setPositionY] = useState(y);

  //Adding all move into the parent function.
 /* 
    const run = () => {
    const moveRight = () => {
      setTimeout(function () {
        //Move the horse to right 1vw
        setPositionX(positionX + 1);
        //Check if goes through the start line, if horse runs enough number of laps and has pass the start line then stop
        if (positionX > originX + 6) {
          //TODO: arrive function here.
        } else {
          //Make decision to move Down or not
          //The width of the Down Road is 10wh, then the distance of each horse is 2.5vw (4 horses). The right position of the road is 82.5vw
          //Continue to move right if not reach the point to turn
          if (positionX < 82.5 - number * 2.5) {
            //TODO: moveRight function here.
          } else {
            //Horse will run down.
            setStand("horse runDown");
            setSpeed(Math.random() * 10 + 10);
            //TODO: movedown function here.
          }
        }
      }, 1000 / speed);
    };
  };
*/
  return (
    <div id={props.id} className={stand} style={{ left: `${positionX}vw` }}>
      <div className="rider">
        <div className="head"></div>
        <div className="body"></div>
      </div>
    </div>
  );
}
