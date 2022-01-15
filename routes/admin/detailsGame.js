var express = require("express");
var router = express.Router();
const chalk = require('chalk');


const { Client } = require("pg");

// GET /admin/games
router.get("/:url_slug", function (req, res, next) {
  
  const urlSlug = req.params.url_slug;
  

  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `SELECT name, genre, description, image_url, url_slug FROM games WHERE url_slug = $1`

  client.query(query,[urlSlug], (err, result) => {
      
      const game = result.rows[0];

      res.render("admin/detailsGame", {
        title: "Admin",
        game
      });

      client.end();
  });
});



// POST - DELETE /admin/games
router.get("/:url_slug/delete", function (req, res, next) {
  
  const urlSlug = req.params.url_slug;
  

  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `DELETE FROM games
                 WHERE games.url_slug = $1`;

  client.query(query,[urlSlug], (err, result) => {
      
    if (err) {
      console.error(chalk.red(err));
     
    } if (result) console.log(chalk.green.inverse("Game Successfully Deleted"));
      
   

      client.end();

      res.redirect("/admin/games");
  });
});

module.exports = router;
