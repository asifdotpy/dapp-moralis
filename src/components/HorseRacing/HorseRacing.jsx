//import statements goes here.

import "./horsegame.css";
import { useState, useEffect } from "react";
import { Button, Space, InputNumber } from "antd";
import { useMoralis } from "react-moralis";
import Countdown from "react-countdown";
import Horse from "./Horse";
import {
  setTwenty,
  setFifty,
  setHundred,
  setFiveHundred,
  incrementByAmount,
  betAmountSelector,
} from "../../reducers/reducer";
import { useSelector, useDispatch } from "react-redux";

var timer = Date.now() + 100000;

function HorseRacing() {
  //instantiate variables
  console.log("Horseracing function executed!!");
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    Moralis,
  } = useMoralis();
  //betAmount slice will be retrive from store.
  const betAmount = useSelector(betAmountSelector);
  // create usestate for betAmount
  const [betAmountVar, setBetAmountVar] = useState(0);
  const dispatch = useDispatch();
  const [selectedAnimal, setSelectedAnimal] = useState({
    white: false,
    blue: false,
  });
  //   const [timer, setTimer] = useState(0)
  const [balance, setBalance] = useState(0); //FIXME: at the end of the execution balance auto sets to 0. need to fix it.
  const num_lap = 1;
  //  setTimer(Date.now() + 10000);
  // console.log(Date.now(), typeof Date.now())
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3({ provider: connectorId });
    }
  }, [isAuthenticated, isWeb3Enabled]);

  var results = [];
  console.log(betAmount);
  //Start the function when the document loaded
  // Horse function ends

  window.onload = function () {
    window.resizeTo(window.screen.availWidth, window.screen.availHeight);
  };

  // This function will change the css property of selected button

  // FIXME: after this fucntion ran balance sets into its initial value 0.

  const Completionist = () => {
    let btns = document.getElementsByClassName("buttons");
    for (let i = 0; i < btns.length; i++) {
      btns[i].setAttribute("disabled", true);
    }
    return <span>Running</span>;
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div className="gameBody">
      <Horse id={"horse1"} number={1} x={20} y={4} />
      <Horse id={"horse2"} number={1} x={20} y={8} />
      <div className="track">
        <div id="startline"></div>

        <div className="inner">
          <button id="start" style={{ display: "none" }}>
            Start Race
          </button>

          <div id="bet">
            <p style={{ textAlign: "center" }}>
              Balance: <span id="funds">{balance}</span>
              <button
                id="sync-btn"
                style={{ margin: "0px 10px" }}
                onClick={() => balanceCheck()}
              >
                🔄
              </button>
            </p>
            <form>
              <div style={{ marginBottom: "5px" }}>Bet Amount</div>

              <InputNumber
                size="large"
                // defaultValue={betAmount}
                value={betAmount} //setting input value(input component text) to betAmount)
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                controls={false}
                onChange={(e) => {
                  setBetAmountVar(e);
                }}
              />
              <Space style={{ width: "100%" }}>
                <Button
                  className="buttons twenty"
                  type="primary"
                  shape="round"
                  size={"small"}
                  onClick={() => dispatch(setTwenty())}
                >
                  20
                </Button>
                <Button
                  type="primary"
                  className="buttons fifty"
                  shape="round"
                  size={"small"}
                  onClick={() => dispatch(setFifty())}
                >
                  50
                </Button>
                <Button
                  type="primary"
                  className="buttons hundred"
                  shape="round"
                  size={"small"}
                  onClick={() => dispatch(setHundred())}
                >
                  100
                </Button>
                <Button
                  type="primary"
                  className="buttons five-hundred"
                  shape="round"
                  size={"small"}
                  onClick={() => dispatch(setFiveHundred())}
                >
                  500
                </Button>
              </Space>
            </form>
            <div
              id="animalSelect"
              style={{
                display: "block",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Button
                id="white-btn"
                className="buttons bet-btn"
                type="primary"
                size="large"
                style={{ width: "100%", marginTop: "25px" }}
                // Disabled will be set here from Transfer.jsx
                ghost={!selectedAnimal.white}
                onClick={() => setSelectedAnimal({ white: true, blue: false })}
              >
                White
              </Button>
              <Button
                id="buttons blue-btn"
                type="primary"
                className="bet-btn buttons"
                size="large"
                style={{ width: "100%", marginTop: "25px" }}
                // Disabled will be set here from Transfer.jsx
                ghost={!selectedAnimal.blue}
                onClick={() => setSelectedAnimal({ white: false, blue: true })}
              >
                Blue
              </Button>
            </div>

            <div
              style={{
                display: "block",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Button
                type="primary"
                className="buttons confirm"
                size="large"
                style={{ width: "100%", marginTop: "25px" }}
                // Disabled will be set here from Transfer.jsx
                onClick={() => confirmBet()}
              >
                Confirm
              </Button>
            </div>
            <div id="report">
              <p style={{ fontWeight: 800 }}>
                Status:{" "}
                <span id="status" style={{ color: "coral" }}>
                  Not Confirmed
                </span>
              </p>
              <p style={{ fontWeight: 800 }}>
                Countdown:{" "}
                <Countdown
                  date={timer}
                  renderer={renderer}
                  zeroPadTime={3}
                  onComplete={() => document.getElementById("start").click()}
                />
              </p>
              <p style={{ fontWeight: 800 }}>
                Result:{" "}
                <span id="resultText" style={{ color: "coral" }}>
                  {" "}
                  Pending
                </span>{" "}
              </p>
            </div>
          </div>
          <table id="results" style={{ display: "none" }}>
            <thead>
              <tr>
                <th>Results</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st</td>
                <td className="result horse1"></td>
              </tr>
              <tr>
                <td>2nd</td>
                <td className="result horse2"></td>
              </tr>
              <tr>
                <td>3rd</td>
                <td className="result horse3"></td>
              </tr>
              <tr>
                <td>4th</td>
                <td className="result horse4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HorseRacing;
