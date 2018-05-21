var twit = require("twit");
var config = require("./config.js");

var Twitter = new twit(config);

window.open("hashtag.html");

// find latest tweet according the query 'q' in params
var GiveResult = function(paramFromUser) {
    //var paramFromUser = "banana, trump"
    //this.paramFromUser = paramFromUser;
    var params = {
        q: this.paramFromUser,  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data, response) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            console.log('Found!!!');
            //console.log('test err     : ' + err )
            str = JSON.stringify(data, null, 4); // (Optional) beautiful indented output.
            console.log(str);
            //console.log('test data    : ' + data )
            //console.log('test response: ' + response )
            console.log(retweetId);
            var fs = require('fs');

            fs.writeFile("output.json", str, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File saved successfully!");
});
            
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });

    
}

// grab & retweet as soon as program is running...
GiveResult();
// retweet in every 50 minutes - no