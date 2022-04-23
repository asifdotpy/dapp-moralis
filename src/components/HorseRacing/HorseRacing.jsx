//import statements goes here.

import "./horsegame.css";
import { useState, useEffect } from "react";
import { Button, Space, InputNumber } from "antd";
import { useMoralis } from "react-moralis";
import Countdown from "react-countdown";

function HorseRacing() {
    //instantiate variables
    const {
        isWeb3Enabled,
        enableWeb3,
        isAuthenticated,
        isWeb3EnableLoading,
        Moralis,
    } = useMoralis();

    const [betAmount, setbetAmount] = useState(0);
    const [selectedAnimal, setSelectedAnimal] = useState({
        white: false,
        blue: false,
    });
    const [balance, setBalance] = useState(0);
    const num_lap = 1;

    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
            enableWeb3({ provider: connectorId });
        }
    }, [isAuthenticated, isWeb3Enabled, balance]);

    function Horse(id, x, y) {
        this.element = document.getElementById(id); /*HTML element of the horse*/
        this.speed =
            Math.random() * 10 +
            10; /*Initiate a random speed for each horse, the greater speed, the faster horse. The value is between 10 and 20*/
        this.originX = x; /*Original X position*/
        this.originY = y; /*Original Y position*/
        this.x = x; /*Current X*/
        this.y = y; /*Current Y*/
        this.number = parseInt(
            id.replace(/[\D]/g, ""),
        ); /*Number of horse, number will be 1 or 2 or 3 or 4*/
        this.lap = 0; //Current lap of the horse

        this.moveRight = function () {
            var horse = this; /*Assign horse to this object*/

            /*Use setTimeout to have the delay in moving the horse*/
            setTimeout(function () {
                //Move the horse to right 1vw
                horse.x++;
                horse.element.style.left = horse.x + "vw";

                //Check if goes through the start line, if horse runs enough number of laps and has pass the start line then stop
                if (horse.lap == num_lap && horse.x > horse.originX + 6) {
                    horse.arrive();
                } else {
                    //Make decision to move Down or not
                    //The width of the Down Road is 10wh, then the distance of each horse is 2.5vw (4 horses). The right position of the road is 82.5vw
                    //Continue to move right if not reach the point to turn
                    if (horse.x < 82.5 - horse.number * 2.5) {
                        horse.moveRight();
                    } else {
                        //Change HTML class of horse to runDown
                        horse.element.className = "horse runDown";
                        //Change the speed, will be random value from 10 to 20
                        horse.speed = Math.random() * 10 + 10;
                        horse.moveDown();
                    }
                }
            }, 1000 / this.speed);
            /* 1000/this.speed is timeout time*/
        };

        /*Do the same for moveDown, moveLeft, moveUp*/
        this.moveDown = function () {
            var horse = this;
            setTimeout(function () {
                horse.y++;
                horse.element.style.top = horse.y + "vh";
                if (horse.y < horse.originY + 65) {
                    horse.moveDown();
                } else {
                    horse.element.className = "horse runLeft";
                    horse.speed = Math.random() * 10 + 10;
                    horse.moveLeft();
                }
            }, 1000 / this.speed);
        };
        this.moveLeft = function () {
            var horse = this;
            setTimeout(function () {
                horse.x--;
                horse.element.style.left = horse.x + "vw";
                if (horse.x > 12.5 - horse.number * 2.5) {
                    horse.moveLeft();
                } else {
                    horse.element.className = "horse runUp";
                    horse.speed = Math.random() * 10 + 10;
                    horse.moveUp();
                }
            }, 1000 / this.speed);
        };
        this.moveUp = function () {
            var horse = this;
            setTimeout(function () {
                horse.y--;
                horse.element.style.top = horse.y + "vh";
                if (horse.y > horse.originY) {
                    horse.speed = Math.random() * 10 + 10;
                    horse.moveUp();
                } else {
                    horse.element.className = "horse runRight";
                    //Nearly finish the lap
                    horse.lap++;
                    horse.moveRight();
                }
            }, 1000 / this.speed);
        };

        /*Trigger the horse by run*/
        this.run = function () {
            this.element.className = "horse runRight";
            this.moveRight();
        };
        this.arrive = function () {
            //Stop the horse run by change class to standRight
            this.element.className = "horse standRight";
            this.lap = 1; //Reset the lap

            /*Show the result*/
            var tds = document.querySelectorAll("#results .result"); //Get all table cell to display the result
            //results.length is the current arrive position
            tds[results.length].className = "result horse" + this.number; //The class of result look like: result horse1...

            //Push the horse number to results array, according the the results array, we know the order of race results
            results.push(this.number);

            //Win horse
            if (results.length == 1) {
                //If win horse is the bet horse, then add the fund
                if (this.number == bethorse) {
                    document.getElementById("resultText").innerHTML = "YOU WON";
                    funds += amount;
                } else {
                    document.getElementById("resultText").innerHTML = "YOU LOST";
                    funds -= amount;
                }
                document.getElementById("funds").innerText = funds;
            } else if (results.length == 4) {
                //All horse arrived, enable again the Start Button
            }
        };
    }

    //Start the function when the document loaded
    document.addEventListener("DOMContentLoaded", function (event) {
        var horse1 = new Horse("horse1", 20, 4);
        var horse2 = new Horse("horse2", 20, 8);

        //Event listener to the Start button
        document.getElementById("start").onclick = function () {
            amount = 0;
            //	console.log(amount);
            //  bethorse = selectedAnimal();
            //	console.log(bethorse);

            if (funds < amount) {
                alert("Not enough funds.");
            } else if (num_lap <= 0) {
                alert("Number of lap must be greater than 1.");
            } else {
                /*Started the game*/
                this.disabled = true; /*Disable the start button*/
                var tds = document.querySelectorAll("#results .result"); //Get all cells of result table.
                for (var i = 0; i < tds.length; i++) {
                    tds[i].className = "result"; //Reset the result.
                }

                document.getElementById("funds").innerText = funds;
                results = []; //Results array is to save the horse numbers when the race is finished.
                horse1.run();
                horse2.run();
            }
        };
    });

    // Input button function
    {
        /*
                // Timer function
                function startTimer(duration, display) {
                    var timer = duration,
                        minutes,
                        seconds;
                    setInterval(function () {
                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);

                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        display.textContent = minutes + ":" + seconds;

                        if (--timer < 0) {
                            //when countdown time reaches 00 display property
                            //will be changed to none for 15 seconds.
                            document.getElementById("countdownTimer").innerHTML = "Running";
                            //Trigerring the start button.
                            document.getElementById("start").click();
                            //This async function will check the winner. Till then
                            // the innerHtml will be Running
                            timer = duration;
                        }
                    }, 1000);
                }
            */
    }
    window.onload = function () {
        window.resizeTo(window.screen.availWidth, window.screen.availHeight);
    };

    // This function will change the css property of selected button

    async function animalSelect() {
        // Add active class to the current button (highlight it)
        var animalSelect = await document.getElementById("animalSelect");
        var btns = await animalSelect.getElementsByClassName("bn28");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("activeBtn");
                current[0].className = current[0].className.replace(" activeBtn", "");
                this.className += " activeBtn";
            });
        }
    }

    function confirmBet() {
        if (!selectedAnimal.white && !selectedAnimal.blue) {
            let betBtns = document.getElementsByClassName("bet-btn");
            for (let i = 0; i < betBtns.length; i++) {
                betBtns[i].setAttribute("style", "border-color: red");
            }
            setSelectedAnimal(selectedAnimal);
            setbetAmount(betAmount);
            console.log(betAmount);
            console.log(selectedAnimal);
        }
        else {
            setSelectedAnimal(selectedAnimal);
            setbetAmount(betAmount);
            console.log(betAmount);
            console.log(selectedAnimal);

        }
    }

    // balanceUpdate will update it's value in every render. setBalance function is added into useEffect.
    async function balanceCheck() {
        const query = new Moralis.Query("_User");
        const userData = await query.find();
        setBalance(userData[0].get("balance"));
        return userData;
    }

    const Completionist = () => {
        let btns = document.getElementsByClassName("buttons");
        for (let i = 0; i < btns.length; i++) {
            btns[i].setAttribute("disabled", true);
        }
        return <span>Running</span>
    }

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
            <div id="horse1" className="horse standRight">
                <div className="rider">
                    <div className="head"></div>
                    <div className="body"></div>
                </div>
            </div>

            <div id="horse2" className="horse standRight">
                <div className="rider">
                    <div className="head"></div>
                    <div className="body"></div>
                </div>
            </div>

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
                                onChange={(e) => {
                                    setbetAmount(e);
                                }}
                            />
                            <Space style={{ width: "100%" }}>
                                <Button
                                    className="buttons twenty"
                                    type="primary"
                                    shape="round"
                                    size={"small"}
                                    onClick={() => setbetAmount(20)}
                                >
                                    20
                                </Button>
                                <Button
                                    type="primary"
                                    className="buttons fifty"
                                    shape="round"
                                    size={"small"}
                                    onClick={() => setbetAmount(50)}
                                >
                                    50
                                </Button>
                                <Button
                                    type="primary"
                                    className="buttons hundred"
                                    shape="round"
                                    size={"small"}
                                    onClick={() => setbetAmount(100)}
                                >
                                    100
                                </Button>
                                <Button
                                    type="primary"
                                    className="buttons five-hundred"
                                    shape="round"
                                    size={"small"}
                                    onClick={() => setbetAmount(500)}
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
                                    date={Date.now() + 20000}
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
