var express = require("express");
var router = express.Router();

const { Client } = require("pg");

/* GET /admin/games */
router.get("/games", function (req, res, next) {
    
  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `SELECT id,
                        name, 
                        genre, 
                        url_slug 
                    FROM games
                    ORDER BY id`;

  client.query(query, (err, result) => {
    
      const games = result.rows;


      res.render("admin/listGames", {
        title: "Admin",
        games,
      });

      client.end();
  });
});

module.exports = router;
