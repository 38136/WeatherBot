console.log("The follow bot is starting");

const Twit = require("twit");
const express = require("express");
const bodyParser = require("body-parser");
const apiai = require("apiai");
const APIAII = apiai('4972cb1a09044d17b37a11401ee7dfe5');
const fs = require("fs");
let weatherfunc = require('./weatherfunction');

// var uploadMedia = require("./uploadimage");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const config = require("./config");

let T = new Twit(config);
// console.log(T);

let stream = T.stream("user", {
    stringify_friend_ids: true
});

stream.on("direct_message", (directMsg) => {
    let directMessage = directMsg.direct_message;
    let sender_id = directms.sender_id_str;
    let screenName = directMessage.sender.name;
    let txt = directMessage.text;

    fs.writeFileSync("./app.json", JSON.stringify(directMsg), "utf-8");
    if (text) {
        let request = APIAI.textRequest(text, {
            sessionId: 'SessionBot'
        });
        request.on('response', (response) => {
            let responseQuery = response.result.resolvedQuery;
            let result = response;
            if (responseQuery == "hi") {
                let image_media = JSON.parse(uploadMedia.TwitterUpload());
                welcomeMsg = weatherfunc.WelcomeParams(sender_id, screen_name, image_media.media_id_string);
                Twitter.post("direct_messages/events/new", welcomeMsg, function (err, data, response) {
                    stream.stop();
                    stream.start();
                });
            } else if (responseQuery == "weather report") {
                welcomeMsg = weatherfunc.CategoryParams(sender_id, responseQuery);
                T.post("direct_messages/events/new", welcomeMsg, function (err, data, response) {
                    stream.stop();
                    stream.start();
                })
            }

        });
        request.end();
    }
})

app.get("/",function(req,res){
    res.send("Localhost Server is  running!!!");
});
app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
})
