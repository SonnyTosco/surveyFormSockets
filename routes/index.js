module.exports = function Route(app){
  //root route to render the index.ejs view
  app.get('/', function(req, res) {
    res.render("index");
  })
  //post route for adding a data from a survey
  app.post('/results', function(req, res){
    submitted_info = {
      name: req.body.name,
      location: req.body.location,
      language: req.body.language,
      comments: req.body.comments
    };
    res.render("results", {users: submitted_info});
  })
};
