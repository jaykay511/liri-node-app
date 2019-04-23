require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var command = process.argv[2];
var searchItem = process.argv.slice(3).join(" ");

switch (command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotSong();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doFile();
        break;
}

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.length; i++) {
                // print name of venue, location, and date of event MM/DD/YYYY
                console.log(response[i].data.venue);
            }
        });
}

function spotSong() {
    var spotify = new Spotify(keys.spotify);

    spotify.search(
        {
            type: "track",
            query: searchItem
        }, function (err, data) {
            if (err) {
                return console.log(err);
            }
            // print artist, song name, preview link, album
            console.log(data);
        });

        // if no song, default to Ace of Base - The Sign
}

function movie() {
    var movieName = searchItem.split(" ").join("+");
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName;

    axios.get(queryURL).then(
        function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    )
    // if no movie, default to Mr. Nobody
}

function doFile() {
    // use text inside random.txt file to call command
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        // rewrite data so command line can accept
        // run spotify function with data
    });
}