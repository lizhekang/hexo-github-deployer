'use strict';

var assign = require('object-assign');

hexo.config.server = assign({
    port: 5000,
    ip: '0.0.0.0'
}, hexo.config.server);

hexo.extend.console.register('github-deployer', 'Start github deployer.', {
    desc: 'Start github deployer and wait for get change Arrived.',
    options: [
        {name: '-p, --port', desc: 'Override the default port.'},
        {name: '-i, --ip', desc: 'Override the default ip.'}
    ]
}, require('./lib/index'));