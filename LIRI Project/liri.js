require("dotenv").config();

//import key js and store in variable
var keys = require("./keys.js");
var args = process.argv;
var input = args[2];
var songTitle = ""

switch (input) {
    case "movie-this":
        movies()
        break;

    case "my-tweets":
        tweets()
        break;

    case "spotify-this-song":
        music()
        break;
}

// OMDB
function movies() {
    var request = require("request");

    var movieName = "";
    for (var i = 3; i < args.length; i++) {
        movieName += args[i] + "+"
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=1e18f2e5";
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (error) {
            console.log("error");
        }
        var response = JSON.parse(body)
        console.log("Title: " + response.Title);
        console.log("Year: " + response.Year);
        console.log("Rated " + response.Rated);
        console.log("Ratings: " + response.Ratings[1].Value);
        console.log("Country: " + response.Country);
        console.log("Language: " + response.Language);
        console.log("Brief Plot: " + response.Plot);
        console.log("Actors: " + response.Actors);
    });
};

//twitter

function tweets() {
    var Twitter = require("twitter");
    var client = new Twitter(keys.twitter);
    var params = {
        screename: "silkysheeets",
        count: 20
    };
    client.get('statuses/user_timeline', params, function (err, tweets, response) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text + " " + tweets[i].user.created_at + "\n" + "-----" + "\n");
        }
        if (err) {
            return console.log("Error Occurred: " + err)
        }
    });
}

// // spotify
function music() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    var songTitle = "";
    for (var i = 3; i < args.length; i++) {
        songTitle += args[i] + "+"
    }

    spotify.search({ type: "track", query: songTitle }, function (err, data) {
        if (err) {
            return console.log("Error Occurred: " + err)
        } else {
            console.log(JSON.stringify("Artist: " + data.tracks.items[0].album.artists[0].name, null, 2));
            console.log(JSON.stringify("Song: " + data.tracks.items[0].name, null, 2));
            console.log(JSON.stringify("Preview URL: " + data.tracks.items[0].external_urls.spotify, null, 2));
            console.log(JSON.stringify("Album: " + data.tracks.items[0].album.name, null, 2));
        }
    });
};

