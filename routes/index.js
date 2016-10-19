var express = require('express');
var router = express.Router();
var faker = require('faker');

var films = [
 { id: 1, username: 'hannes_becker', timestamp: Date.now(), photo: 'https://source.unsplash.com/random', hearts: 939, comments: [{ username: 'jamz', comment: 'awesome!' }]},
 { id: 2, username: 'james_wales', timestamp: Date.now(), photo: 'https://source.unsplash.com/random', hearts: 12, comments: [{ username: 'karl', comment: 'awesome!' }]}
]

var id = films.length;

/* GET home page. */
router.get('/films', function(req, res, next) {
  res.json(films);
  //res.render('index', { title: 'Express' });
});

router.get('/films/:timestamp', function(req, res, next) {
  const timestamp = req.params.timestamp ? req.params.timestamp : 0;

  const filteredFilms = films.filter((film) => {
    return film.timestamp > timestamp;
  });
  res.json(filteredFilms);
});


router.get('/load', function(req, res, next) {
  var comments = [];

  id = id + 1;

  for(var i = 0; i < id; i++) {
    comments = [...comments, { username: faker.internet.userName(), comment: faker.lorem.paragraph() }];
  }

  const newFilm = {
    id: id,
    username: faker.internet.userName(),
    timestamp: (Date.now() + (60*60*1000)),
    photo: 'https://source.unsplash.com/random',
    hearts: faker.random.number(),
    comments: comments
  };

  films = [...films, newFilm];

  res.sendStatus(200);
});

module.exports = router;
