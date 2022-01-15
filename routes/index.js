var express = require("express");
var router = express.Router();

const { Client } = require("pg");

/* GET home page. */
router.get("/", function (req, res, next) {
  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `
  SELECT games.name as game_name,
         scores.date,
	       scores.score,
	       players.firstname as first_name,
	       players.lastname as last_name
	    FROM scores
	    INNER JOIN players ON scores.player_id = players.id
	    LEFT JOIN games ON scores.game_id = games.id
      ORDER BY scores.date DESC`;

  client.query(query, (err, result) => {

      const scores = result.rows;

      let lastTenScores = scores.slice(0, 10);

      res.render("index", {
        title: "Highscores",
        scores: lastTenScores
      });

      client.end();
    }
  );
});

module.exports = router;
