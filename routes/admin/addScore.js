var express = require("express");
var router = express.Router();
const chalk = require("chalk");

const { Client } = require("pg");

// GET /admin/players/new
router.get("/new", function (req, res, next) {
  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `
                SELECT games.id AS game_id,
                  games.name AS game_name,
                  players.id AS player_id,
                  players.firstName,
                  players.lastName
                  FROM games
                FULL JOIN players
                ON players.firstName = games.name
                ORDER BY players.firstName ASC, games.name ASC`;

  client.query(query, (err, result) => {
    const data = result.rows;

    res.render("admin/addScore", {
      title: "Admin",
      data,
    });

    client.end();
  });
});

// POST /admin/scores/new
router.post("/new", function (req, res, next) {
  const client = new Client(req.app.locals.client);

  client.connect();

  const { game_id, player_id, date, score } = req.body;

  const query = `INSERT INTO scores (game_id, player_id, date, score) 
                    VALUES ($1, $2, $3, $4)`;

  client.query(query, [game_id, player_id, date, score], (err, result) => {

    if (err) {
      console.error(chalk.red(err));
    } else {
      console.log(chalk.green.inverse(result));

      client.end();

      res.redirect("/admin/scores");
    }
  });
});








module.exports = router;
