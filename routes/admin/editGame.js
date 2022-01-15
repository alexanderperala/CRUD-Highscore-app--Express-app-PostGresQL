var express = require("express");
var router = express.Router();
const chalk = require('chalk');


const { Client } = require("pg");

// GET /admin/games/url_slug/edit
router.get("/:url_slug/edit", function (req, res, next) {
  const urlSlug = req.params.url_slug;

  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `SELECT id,
                        name,
                        genre,
                        description,
                        image_url,
                        url_slug
                 FROM games
                 WHERE url_slug = $1`;

  client.query(query, [urlSlug], (err, result) => {
    const game = result.rows[0];

    res.render("admin/editGame", {
      title: "Admin",
      game,
    });

    client.end();
  });
});

// POST - PUT /admin/games/:ul_slug/edit
router.post("/:url_slug/edit", function (req, res, next) {
  const urlSlug = req.params.url_slug;

  const client = new Client(req.app.locals.client);

  client.connect();

  const { name, genre, description, imageUrl } = req.body;

  let newSlug = name.split(" ").join("-");

  const query = `UPDATE games
                    SET name = $1,
                        genre = $2,
                        description = $3,
                        image_url = $4,
                        url_slug = $5
                    WHERE url_slug = $6`;

  client.query(query, [name, genre, description, imageUrl, newSlug, urlSlug], (err, result) => {
      if (err) {
        console.error(chalk.red(err));
      } else console.log(chalk.green.inverse("Game Successfully Edited"));
        
      client.end();

      res.redirect("/admin/games");
    }
  );
});

module.exports = router;
