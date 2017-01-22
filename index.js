'use strict';

let compression = require('compression');
let express = require('express');
let favicon = require('serve-favicon');
let less = require('less-middleware');
let path = require('path');
let state = require('express-state');

let app = express();

// Favicon
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// State
state.extend(app);
app.set('state namespace', 'state');

app.locals.site = {};
app.locals.site.mode = app.get('env'); // NODE_ENV is 'development' by default.
app.expose(app.locals.site.mode, {
    namespace: 'mode',
    isJSON: true,
    cache: true
}); // Ensures that there is always a `state` object

// GZIP - https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
if (app.locals.site.mode === 'production') {
    app.use(compression());
}

// Jade
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');
app.locals.pretty = app.locals.site.mode !== 'production';

// Less
let stylesDir = '/styles';
let stylesPath = path.join(__dirname, stylesDir);

app.use(stylesDir, less(stylesPath, {
    sourceMap: app.locals.site.mode !== 'production'
}));

app.use(stylesDir, express.static(stylesPath));

// Scripts
app.use('/scripts', express.static(path.join(__dirname, '/scripts')));
app.use('/views', express.static(path.join(__dirname, '/views')));
app.use('/pages', express.static(path.join(__dirname, '/pages')));
app.use('/images', express.static(path.join(__dirname, '/images')));

// Routes
app.get('/', (req, res, next) => {
    try {
        let page = require(`./pages/${req.query.lang || 'en'}/${req.query.post || 'default'}.json`);

        res.expose({
            lang: page.lang,
            title: page.title,
            type: page.type
        }, {
                namespace: 'page',
                isJSON: true,
                cache: true
            });

        res.render('index', {
            title: page.title
        });
    } catch (error) {
        console.error(error.stack);
        next();
    }
});

// 404
app.use((req, res, next) => {
    if (app.locals.site.mode !== 'production') {
        return next();
    }

    res.status(404).render('index', {
        title: '404',
        message: 'Page not found.'
    });
});

// 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('index', {
        title: '500',
        message: 'An unexpected error occured.'
    });
});

// Server
app.listen(65307, () => {
    console.log('Blog listening on port 65307!');
});