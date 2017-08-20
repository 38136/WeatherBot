console.log("The follow bot is starting");

const Twit = require("twit");
const config = require("./config");
let T = new Twit(config);
// console.log(config);
// ---------------------------
// let params = {
//     q : "rainbow",
//     count : 2
// };

// T.get("search/tweets", params, gotData);

// function gotData(err, data, response) {
//     let tweets = data.statuses;
//     for (let i =0;i<tweets.length;i++){
//         console.log(tweets[i].text)
//     }
// }
//-----------------------

let stream = T.stream("user");
stream.on('follow', followed);

function followed(eventMsg){
    console.log('Follow event');
let name = eventMsg.source.name;
let screenName = eventMsg.source.screen_name;
tweetIt('. @'+ screenName + 'do you like rainbows ?');

}



// tweetIt();
// setInterval(tweetIt,1000*60*60);
function tweetIt(txt) {
    // let r = Math.floor(Math.random() * 100);
    let tweet = {
        // status: "#coding the random number "+ r +" Rainbow from node.js"
        status: txt
    };

    T.post("statuses/update", tweet, tweeted)

    function tweeted(err, data, response) {
        if (err) {
            console.log("something went wrong");
        } else {
            console.log(" it working");
        }
    }
}
