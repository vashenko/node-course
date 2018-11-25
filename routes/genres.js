const express = require('express');
const router = express.Router();

const genres = [
    {
        name: 'blockbusters'
    },
    {
        name: 'comedies'
    },
    {
        name: 'dramas'
    }
]

const port = process.env.PORT || 3000;

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:name', (req, res) => {
    const genre = genres.find(g => g.name === req.params.name);
    return genre ? res.send(genre) : res.status(404).send('No genre');
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

router.delete('/:name', (req, res) => {
    const genre = genres.find(g => g.name === req.params.name);
    if (!genre) return res.status(404).send('Invalid name');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre)
})

router.put('/:name', (req, res) => {
    const genre = genres.find(g => g.name === req.params.name);
    if (!genre) return res.status(404).send('Invalid name');

    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name;
    res.send(genre);
})

function validateGenre(genre) {
    const schema = {
        name: joi.string().min(3).required()
    }
    return joi.validate(genre, schema);
}

module.exports = router;