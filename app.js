var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var corse = require('cors');

// Users
let indexRouter = require('./routes/index');
let searchRouter = require('./routes/search');
let gameRouter = require('./routes/game');


// Administration
let adminPlayersRouter = require('./routes/admin/listPlayers');
let adminAddPlayerRouter = require('./routes/admin/addPlayer');

let adminGamesRouter = require('./routes/admin/listGames');
let adminAddGameRouter = require('./routes/admin/addGame');

let adminScoresRouter = require('./routes/admin/listScores');
let adminAddScoreRouter = require('./routes/admin/addScore');

let adminDetailsGameRouter = require('./routes/admin/detailsGame');
let adminEditGameRouter = require('./routes/admin/editGame');

var app = express();

app.locals.client = {
  user: "postgres",
  host: "localhost",
  database: "highscore",
  password: "secretpassword",
  post: 5432
};



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Users
app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/game', gameRouter);

// Administration
app.use('/admin', adminPlayersRouter);
app.use('/admin/players', adminAddPlayerRouter);
app.use('/admin', adminGamesRouter);
app.use('/admin/games',adminAddGameRouter);
app.use('/admin', adminScoresRouter);
app.use('/admin/scores', adminAddScoreRouter);
app.use('/admin/games',adminDetailsGameRouter);
app.use('/admin/games', adminEditGameRouter);


app.use(corse());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
