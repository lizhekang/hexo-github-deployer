'use strict';

var chai = require('chai'),
    expect = chai.expect;

var Hmac = require('../lib/tools').hmac;

describe('Hmac function test sets.', function(){
    it('should return `69cb4dab043d790a3bc8fde6a1c4a7d93e4a329e` when the input `a nice plugin.` with key `1234` and use `SHA-1`', function(){
        var hash = Hmac('sha1', '1234', 'a nice plugin.', 'utf8', 'hex');
        expect(hash).to.be.equal('69cb4dab043d790a3bc8fde6a1c4a7d93e4a329e');
    });
});