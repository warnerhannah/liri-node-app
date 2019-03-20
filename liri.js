require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs")
var keys = require("./keys.js");

switch (process.argv[2]) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Invalid Input!")
};



// `concert-this`
function concertThis() {
    var artist = process.argv[3];
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
function spotifyThisSong() {
    var spotify = new Spotify({
        id: keys.spotifykeys.id,
        secret: keys.spotifykeys.secret,
      });

    var song = "";

    if (!process.argv[3]) {
        song = "The Sign";
    }
    else {
        for (var i = 3; i < process.argv.length; i++) {
            song += (process.argv[i] + "+");
        }
    };

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
function movieThis() {
    var movie = "";

    if (!process.argv[3]) {
        movie += "Mr. Nobody"
    }
    else {
        for (var i = 3; i < process.argv.length; i++) {
            movie += process.argv[i] + "+";
        }
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


};

/*    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Edit the text in random.txt to test out the feature for movie-this and concert-this.
*/ 