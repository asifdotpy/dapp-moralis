import { Typography } from "antd";
import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";
import "bootstrap/dist/css/bootstrap.min.css";


const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();

  const isInchDex = useMemo(
    () => (Moralis.Plugins?.oneInch ? true : false),
    [Moralis.Plugins?.oneInch],
  );

  return (
    <div className="parent-stake-tab">
      <div className="stake-tab">
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Stake
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Unstake
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontSize: "30px", color: "rgb(18, 99, 241)" }}
            >
              <span>APR </span>
              <span>2000%</span>
            </h5>
            <div className="input-area">

              <input type="text" name="1Input" className="form-control" id="cell1Input" />
              <div className="token-info" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                <img src={require('./bnbemoji.png')} style={{ width: "17px", height: "18px", margin: "5px" }} />
                <h4 className="input-token-name">BNB</h4>
              </div>
            </div>
            <p className="card-text" style={{ padding: "10px" }}>
              Earn passive income with our staking reward.
            </p>
            <a href="#" className="btn btn-primary stake-btn">
              Unlock Wallet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
