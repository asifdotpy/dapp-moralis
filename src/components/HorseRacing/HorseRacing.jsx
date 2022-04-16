//import statements goes here.

import './horsegame.css';


export default function HorseRacing() {
    return (
        <div className='gameBody'>
            <div id="horse1" className="horse standRight">
                <div className="rider">
                    <div className="head">
                    </div>
                    <div className="body">
                    </div>
                </div>
            </div>


            <div id="horse2" className="horse standRight">
                <div className="rider">
                    <div className="head">
                    </div>
                    <div className="body">
                    </div>
                </div>
            </div>

            <div className="track">
                <div id="startline">
                </div>

                <div className="inner">
                    <button id="start" style={{ display: 'none' }}>Start Race</button>

                    <div id="bet">
                        <p style={{ textAlign: 'center' }}>You currently have <span id="funds">100</span></p>
                        <form>
                            <div style={{ marginBottom: "5px" }}>Bet Amount</div>
                            <div className="value-button" id="decrease" value="Decrease Value">-</div>
                            <input type="number" id="number" value="10" />
                            <div className="value-button" id="increase" value="Increase Value">+</div>
                        </form>
                        <div id="animalSelect" style={{ display: 'block', alignItems: 'center', textAlign: 'center' }}>
                            <button id="white-btn" className="bn632-hover bn28 white-btn">White</button>
                            <button id="blue-btn" className="bn632-hover bn28 blue-btn activeBtn">Blue</button>
                        </div>
                        <div style={{ display: 'block', alignItems: 'center', textAlign: 'center' }}>
                            <button id="confirm" className="bn632-hover bn28 confirm-btn">Confirm</button>
                        </div>
                        <div id="report">
                            <p style={{ fontWeight: 800 }}>Status:        <span id="status" style={{ color: 'coral' }}>Not Confirmed</span></p>
                            <p style={{ fontWeight: 800 }}>Countdown:        <span style={{ color: 'coral' }} id="countdownTimer"></span> </p>
                            <p style={{ fontWeight: 800 }}>Result:        <span id="resultText" style={{ color: 'coral' }}> Pending</span> </p>
                        </div>
                    </div>
                    <table id="results" style={{ display: 'none' }}>
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
    )
}

