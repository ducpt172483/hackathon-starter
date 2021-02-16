const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const errorHandler = require('errorhandler');

dotenv.config({ path: '.env' });

const app = express();

app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler());
} else {
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send('Server Error');
    });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log(
        '%s App is running at http://localhost:%d in %s mode',
        chalk.green('✓'),
        app.get('port'),
        app.get('env')
    );
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
