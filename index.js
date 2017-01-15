'use strict';

let express = require('express');
let fetch = require('node-fetch');
let app = express();

app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.render('index', { title: 'Cameron\'s Blog', message: "This blog is still under construction..." });
});

app.get('/:post', (req, res, next) => {
    fetch(`http://localhost:3000/posts/${req.params.post}.json`)
        .then(res => {
            if (!res.ok) {
                throw res.status;
            }

            return res.json();
        })
        .then(postJson => {
            res.render('index', { title: postJson.title, image: postJson.image, message: postJson.message.join('') });
        })
        .catch(error => {
            console.error(error);
            next();
        });

});

app.use((req, res, next) => {
    res.render('index', { title: '404', message: 'Page not found.' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('index', { title: '500', message: 'An unexpected error occured.' });
});

app.listen(3000, () => {
    console.log('Blog listening on port 3000!')
});