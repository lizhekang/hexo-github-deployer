'use strict';

var git = require('./git'),
    logHelper = require('./logHelper'),
    tools = require('./tools'),
    Q = require('q');

function generator(obj) {
    var app = obj,
        cmdArray = app.commands;


    function update() {
        var len = cmdArray.length,
            cmds = cmdArray,
            funcs = [];

        for (var index = 0; index < len; index ++) {
            funcs.push(runCommand);
        }

        function runCommand(index) {
            var deferred = Q.defer(),
                cmd = cmds[index++];

            exec(cmd, {silent: true}, function (code, output) {
                if(parseInt(code) == 0) {
                    logHelper.logH('Exit code:', code);
                    logHelper.logH('%s  output:\n%s', cmd, output);
                }else {
                    logHelper.errorH('Exit code:', code);
                    logHelper.errorH('%s  output:\n%s', cmd, output);
                }


                deferred.resolve(index);
            });
            return deferred.promise;
        }

        return funcs.reduce(Q.when, Q(0));
    }

    return function(req, res) {
        var signature = req.headers['x-hub-signature'] ? req.headers['x-hub-signature'] : '',
            sha1 = '',
            body = '',
            hash = '',
            url = app.vc_url,
            ref = app.ref,
            name = app.name,
            path = app.path,
            response  = 'Wrong request!',
            key = app.key;

        logHelper.logH('An %s req arrival.', name);

        if(signature != '') {
            sha1 = signature.split('=')[1];
        }
        body = JSON.stringify(req.body);
        hash = tools.hmac('sha1', key, body, 'utf8', 'hex');

        if(hash == sha1) {
            if(ref == '' || 'refs/heads/' + ref == req.body.ref) {
                response = 'Going to renew ' + name + '!';
                git.update(path, url, update);
            }else {
                response = 'Nothing to do.'
            }
        }
        res.send(response)
    }
}

module.exports.generator = generator;