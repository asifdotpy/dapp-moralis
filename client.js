const { request } = require('https-browserify');
var timeSyncClient = require('timesync')

var ts = timeSyncClient.create({
    server: 'localhost:8081'
})

async function tsnow() {
    var currentTime = await ts.now()
    return currentTime;
}

console.log(new Date(ts.now()))

ts.destroy()
