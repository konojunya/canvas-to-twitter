const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const Twitter = require("twitter");
const config = require("./env.json");

const client = new Twitter(config);

const getMediaUrl = async (base64data, res) => {
  const media_res = await client.post("media/upload", {
    media_data: base64data
  });
  const tweet_res = await client.post("statuses/update", {
    status: "canvas to twitter",
    media_ids: media_res.media_id_string
  });
  const image_url = tweet_res.entities.media[0].media_url;

  res.json({
    media_url: image_url
  });
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendfile("view/index.html");
});

app.post("/upload", (req, res) => {
  const base64data = req.body.image.replace(/^data:image\/png;base64,/, "");
  getMediaUrl(base64data, res);
});

app.listen(3000, () => {
  console.log("listen and serve http://localhost:3000");
});
