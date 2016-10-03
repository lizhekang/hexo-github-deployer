'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    github = require('./github'),
    logHelper = require('./logHelper');

module.exports = function(args) {
    var config = this.config,
        post_uri = config.post_uri || '/',
        port = args.p || args.port || config.port || 5000,
        host = args.i || args.ip || config.ip || '127.0.0.1',
        vc_url = config.github_url,
        hexo_path = process.cwd(),
        github_key = config.github_key,
        title = config.title;

    if(!config.github) {
        logHelper.logH('Please set github option for true in _config.yml first.');
        return false;
    }

    app.use(bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    var config = {
        vc_url: vc_url,
        name: title,
        path: hexo_path,
        key: github_key,
        commands: [
            'npm install',
            'hexo generate'
        ]
    };

    app.post(post_uri, github.generator(config));

    var server = app.listen(port, host, function () {
        var host = server.address().address,
            port = server.address().port;

        logHelper.logH('hexo github deployer listening at http://%s:%s', host, port);
    });
};