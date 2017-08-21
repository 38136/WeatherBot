// console.log("The follow bot is starting");

console.log("The follow bot is starting");

var Twit = require("twit");
var express = require("express");
var bodyParser = require("body-parser");
var apiai = require("apiai");
var APIAII = apiai('8e19b5f4bcee4ca484320e31dfdfebf9');
var fs = require("fs");
let weatherfunc = require('./weatherfunction');
let uploadMedia = require("./uploadpic");
 
const config = require("./config");

let app = express();
let T = new Twit(config);

let stream = T.stream("user", {
    stringify_friend_ids: true

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// console.log(T);

stream.on("direct_message", function (directMsg) {
    let directMessage = directMsg.direct_message;
    let sender_id = directms.sender_id_str;
    let screenName = directMessage.sender.name;
    let txt = directMessage.text;
    console.log(sender_id);
    console.log(screen_name);

    fs.writeFileSync("./app.json", JSON.stringify(directMsg), "utf-8");
    if (text) {
        let request = APIAII.textRequest(text, {
            sessionId: 'SessionBot'
        });
        request.on('response', function (response) {
            let responseQuery = response.result.resolvedQuery;
            let result = response;
            if (responseQuery == "hi") {
                let image_media = JSON.parse(uploadMedia.TwitterUpload());
                welcomeMsg = weatherfunc.WelcomeParams(sender_id, screenName, image_media.media_id_string);
                console.log(sender_id);
                console.log(screenName);
                T.post("direct_messages/events/new", welcomeMsg, function (err, data, response) {
                    stream.stop();
                    stream.start();
                });
            }
            //  else if (responseQuery == "weather report") {
            //     welcomeMsg = weatherfunc.CategoryParams(sender_id, responseQuery);
            //     T.post("direct_messages/events/new", welcomeMsg, function (err, data, response) {
            //         stream.stop();
            //         stream.start();
            //     })
            // }

        });
        request.on('error', function (error) {
            console.log(error);
        });
        request.end();
    }
})

app.get("/", function (req, res) {
    res.send("success");
});
app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
})
