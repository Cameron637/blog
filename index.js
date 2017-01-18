'use strict';

let express = require('express');
let app = express();

app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
    try {
        let post = require(`./posts/${req.query.lang || "en"}/${req.query.post || "default"}.json`);
        res.render('index', { title: post.title, image: post.image, message: post.message.join('') });
    } catch (error) {
        console.error(error.stack);
        next();
    }
});

app.use((req, res, next) => {
    res.render('index', { title: '404', message: 'Page not found.' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('index', { title: '500', message: 'An unexpected error occured.' });
});

app.listen(65307, () => {
    console.log('Blog listening on port 65307!');
});