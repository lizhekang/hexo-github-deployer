'use strict';

var crypto = require('crypto');

function hmac(algorithm, key, text, input_encoding, output_encoding) {
    var hmac = crypto.createHmac(algorithm, key),
        sign = '';

    sign = hmac.update(text, input_encoding).digest().toString(output_encoding);

    return sign;
}

module.exports = {
    hmac: hmac
};