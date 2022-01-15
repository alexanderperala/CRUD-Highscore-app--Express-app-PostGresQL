const { query } = require("express");
var express = require("express");
var router = express.Router();

const { Client } = require("pg");

// GET /admin/players
router.get("/players", function (req, res, next) {
  
  const client = new Client(req.app.locals.client);

  client.connect();

  const query = `SELECT id, 
                        firstName, 
                        lastName, 
                        email 
                    FROM players 
                    ORDER BY id`;

  client.query(query, (err, result) => {
      
      const players = result.rows;

      res.render("admin/listPlayers", {
        title: "Admin",
        players,
      });

      client.end();
  });
});


// DELETE /admin/players/ 
router.delete("/players:id", function (req, res, next) {

  const client = new Client(req.app.locals.client);
  
  client.connect();

  const { id } = req.body.id;

  client.query(
    "DELETE FROM players WHERE id = $1",
    [ id ], (err, result) => {
      
      console.log(id);

      client.end();
      res.redirect("/admin/players");
    }
  );
});

module.exports = router;
