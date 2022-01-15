var express = require("express");
var router = express.Router();

const { Client } = require("pg");

// GET  /game/:slug
router.get("/:url_slug", function (req, res, next) {
  
  const urlSlug = req.params.url_slug;

  const client = new Client(req.app.locals.client);

  client.connect();


  const query = ` SELECT games.name as game_name,
                        games.genre as game_genre,
                        games.description as game_about,
                        games.image_url as game_img,
                        players.id as player_id,
                        players.firstName as player_firstname,
                        players.lastName as player_lastname,
                        scores.date as score_date,
                        scores.score AS score_score
                      FROM games
                      FULL JOIN scores ON games.id = scores.game_id
                      LEFT JOIN players ON scores.player_id = players.id
                      WHERE games.url_slug = $1`;

  client.query(query, [urlSlug], (err, result) => {

    const data = result.rows;


    res.render("game", {
      title: "Highscores",
      data,
    });

    client.end();
  });
});

module.exports = router;
