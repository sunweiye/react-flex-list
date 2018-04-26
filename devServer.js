const webpack = require('webpack');
const express = require('express');
const path = require('path');

/*
If you want the development server to listen on another host or port, you can use the NODE_DEV_SERVER env variable:
$ NODE_DEV_SERVER=0.0.0.0:8000 npm start
 */
const server = process.env.NODE_DEV_SERVER || "localhost:8080";
const [host, port] = server.split(":");
const enviroment = (() => {
    switch(process.env.NODE_ENV){
        case 'production':
            return 'prd';
        case 'staging':
            return 'stg';
        default:
            return 'dev';
    }
})();

const webpackConfig = require("./webpack.config." + enviroment);
const compiler = webpack(webpackConfig);
const app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "example", "index.html"));
});

app.listen(port, host, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://${server}`);
});
