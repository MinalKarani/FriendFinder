// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../app/data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    
      friendsData.push(req.body);
      var currentUserScore=0;
      var userscores=req.body.scores;
      var comparisonArr=[];
      for(var j=0;j<friendsData.length-1;j++)
      {
        var currentUserScore=0;
        for(var i=0;i<userscores.length;i++)
        {
            var Score1=userscores[i];
            var data=friendsData[j].scores;
            var score2=data[i];
            var score3=Math.abs(score2-Score1);
            currentUserScore=parseInt(currentUserScore) + parseInt(score3);
        }
        comparisonArr.push(currentUserScore);
        console.log("Score:  "+currentUserScore);
      }

      var small = comparisonArr[0];
      var index;
      for(var i=1;i< comparisonArr.length;i++)
      {
          if (comparisonArr[i] < small)
          {
              small = comparisonArr[i];
              index = i;
          }
      }
      console.log("Smallest  "+small);
      res.json(friendsData[index]);
    
  });
}
  