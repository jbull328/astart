var express = require("express"),
    app = express();

app.get("/", function(req, res) {
  res.send("This will be the landing page!");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
