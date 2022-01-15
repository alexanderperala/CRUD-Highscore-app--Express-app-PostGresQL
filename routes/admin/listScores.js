var express = require("express");
var router = express.Router();

const { Client } = require("pg");

/* GET /admin/players */
router.get("/scores", function (req, res, next) {
  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `
  SELECT scores.id,
         games.name as game_name,
         scores.date,
	       scores.score,
	       players.firstname as first_name,
	       players.lastname as last_name
	    FROM scores
	    INNER JOIN players ON scores.player_id = players.id
	    LEFT JOIN games ON scores.game_id = games.id
      ORDER BY games.name`;

  client.query(query, (err, result) => {
      
      const scores = result.rows;

      res.render("admin/listScores", {
        title: "Admin",
        scores
      });

      client.end();
  });
});

module.exports = router;
