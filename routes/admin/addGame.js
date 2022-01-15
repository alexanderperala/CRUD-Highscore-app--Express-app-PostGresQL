var express = require("express");
var router = express.Router();
const chalk = require('chalk');

const { Client } = require("pg");

// GET /admin/game/new
router.get("/new", function (req, res, next) {
  

    res.render("admin/addGame", {
    title: "Admin",
  });
});


// POST /admin/games/new
router.post("/new", function (req, res, next) {

  const client = new Client(req.app.locals.client);
  
  client.connect();

  const { name, genre, description, imageUrl } = req.body;

  let urlSlug = name.split(' ').join('-');


  const query = `INSERT INTO games (name, genre, description, image_url, url_slug) VALUES ($1, $2, $3, $4, $5)`;

  client.query(query,[name, genre, description, imageUrl, urlSlug],(err, result) => {
      if (err) {
        console.error(chalk.red(err));
      } else
      
      console.log(chalk.green.inverse("New Game Successfully Created"));
      
      client.end();
     
      res.redirect("/admin/games");
    }
  );
});

module.exports = router;
