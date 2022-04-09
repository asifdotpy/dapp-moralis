import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/nftBalance.css";
import Address from "../components/Address/Address"

function NFTBalance() {
  return (
    <div id="mainContent" style={{ margin: "1.5px", padding: "1.5px" }}>
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4">
          <div className="image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary" style={{ height: "140px" }}>
              <img src={require("../../src/boardApe.png")}></img>
            </button>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
              <Address copyable size="6" />
            </div>
            <div className="d-flex mt-2">
              <span className="number">
                0
                <span className="follow">Invites</span>
              </span>
            </div>
            <div className="text mt-3">
              <span>Welcome to your own meta profile</span>
            </div>
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              <span>
                <i className="fa fa-twitter"></i>
              </span>{" "}
              <span>
                <i className="fa fa-facebook-f"></i>
              </span>{" "}
              <span>
                <i className="fa fa-instagram"></i>
              </span>{" "}
              <span>
                <i className="fa fa-linkedin"></i>
              </span>
            </div>
            <div className="px-2 rounded mt-4 date">
              <span className="join">Joined May, 2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTBalance;
