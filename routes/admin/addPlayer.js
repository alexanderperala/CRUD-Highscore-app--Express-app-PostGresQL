var express = require("express");
var router = express.Router();
const chalk = require("chalk");

const { Client } = require("pg");

/* GET /admin/players/new */
router.get("/new", function (req, res, next) {
  res.render("admin/addPlayer", {
    title: "Admin",
  });
});

// POST /admin/players/new
router.post("/new", function (req, res, next) {
  const client = new Client(req.app.locals.client);

  client.connect();

  const { firstname, lastname, email } = req.body;

  const query = `INSERT INTO players (firstName, lastName, email) 
                    VALUES ($1, $2, $3)`;

  client.query(query, [firstname, lastname, email], (err, result) => {
    if (err) {
      console.error(chalk.red(err));
    } else {
      console.log(chalk.green.inverse("New Player Successfully Created"));

      client.end();
      
      res.redirect("/admin/players");
    }
  });
});

module.exports = router;
