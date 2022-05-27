const Moralis = require("moralis");


const serverUrl = "https://wr51xzfpnivi.usemoralis.com:2053/server";
const appId = "PDgnBWEqSUQFIRprxE5efDc7VeRnFSY6ljqP79xa";
const masterKey = "1hBTxsHv12lQjfBWeojSVrRVOS6LXmhJsu8rwWol";

const MoralisTest = async() => {
    await Moralis.start({ serverUrl, appId, masterKey });
    const query = new Moralis.Query("_User");
    return console.log(query)
}

MoralisTest();