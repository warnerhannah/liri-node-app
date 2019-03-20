require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs")
var keys = require("./keys.js");

let arg2 = "";


function argument2() {
    var arg = "";
    if (process.argv[3]) {
        for (var i = 3; i < process.argv.length; i++) {
            arg += (process.argv[i] + "+");
        }
    }
    arg2 = arg.slice(0, -1);
}
argument2();


// `concert-this`
function concertThis(arg2) {
    var artist = arg2;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryURL)
        .then(function (response) {
            console.log(queryURL);

            // VENUE NAME
            console.log("Venue: " + response.data[0].venue.name);

            // VENUE LOCATION
            console.log("Location: " + response.data[0].venue.city);

            // DATE OF EVENT
            var mydate = response.data[0].datetime;
            console.log("Date: " + moment(mydate).format("MM/DD/YYYY"));

        })
        .catch(function (error) {
            console.log(error);
        });
};



// `spotify-this-song`
function spotifyThisSong(arg2) {
    var spotify = new Spotify({
        id: keys.spotifykeys.id,
        secret: keys.spotifykeys.secret,
    });

    var song = "";

    if (arg2) {
        song = arg2;
    }
    else {
        song = "The Sign";
    };

    console.log(song)
    // SPOTIFY API
    spotify
        .search({ type: 'track', query: song })
        .then(function (data) {
            console.log("Artist: " + (data.tracks.items[0].album.artists[0].name));
            console.log("Song Title: " + (data.tracks.items[0].name));
            console.log("Preview Here: " + (data.tracks.items[0].preview_url));
            console.log("Album: " + (data.tracks.items[0].album.name));
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
};


// `movie-this`
function movieThis(arg2) {
    var movie = "";

    if (!arg2) {
        movie += "Mr. Nobody"
    }
    else {
        movie = arg2;
    }
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie


    axios.get(queryURL)
        .then(function (response) {
            console.log(queryURL)
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            console.log(error);
        });
};



// `do-what-it-says`
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        const newData = data.split(",");
        console.log(newData);

        arg2 = newData[1];
        switch (newData[0]) {
            case "concert-this":
                concertThis(arg2);
                break;
            case "spotify-this-song":
                spotifyThisSong(arg2);
                break;
            case "movie-this":
                movieThis(arg2);
                break;
            default:
                console.log("Invalid Input!")
        };
    })
};



switch (process.argv[2]) {
    case "concert-this":
        concertThis(arg2);
        break;
    case "spotify-this-song":
        spotifyThisSong(arg2);
        break;
    case "movie-this":
        movieThis(arg2);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Invalid Input!")
};