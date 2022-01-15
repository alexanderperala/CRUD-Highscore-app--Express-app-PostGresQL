var express = require("express");
var router = express.Router();

const { Client } = require("pg");

// GET /search
router.get("/", function (req, res, next) {
  
  const searchTerm = req.query.q;

  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `
        SELECT id, 
               name,
               genre, 
               description,
               image_url,
               url_slug 
         FROM games
        WHERE name ILIKE $1`;

  client.query(query,[`%${searchTerm}%`], (err, result) => {
    
    const games = result.rows;


    res.render("search", {
      title: "Highscores",
      games,
      searchTerm,
    });

    client.end();
  });
});

module.exports = router;
