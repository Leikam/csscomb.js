var Comb = require('../lib/csscomb');
var assert = require('assert');

describe('options/always-semicolon', function() {
    var comb;

    beforeEach(function() {
        comb = new Comb();
    });

    it('Should add semicolon for last property if missing. Test 1', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div { height: 0 }'
            ),
            'div { height: 0; }'
        );
    });

    it('Should add semicolon for last property if missing. Test 2', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div {\nheight: 0\n}'
            ),
            'div {\nheight: 0;\n}'
        );
    });

    it('Should add semicolon for last property if missing. Test 3', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div {height: 0}'
            ),
            'div {height: 0;}'
        );
    });

    it('Should add semicolon for last property if missing. Test 4', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div {\nheight: 0 /* Comment */\n}'
            ),
            'div {\nheight: 0; /* Comment */\n}'
        );
    });

    it('Should add semicolon for last property if missing. Test 5', function() {
        comb.configure({ 'always-semicolon': true });
        assert.equal(
            comb.processString(
                'div {\ntop: 1px;\nheight: 0 /* 1comment */  /* 2comment */\n}'
            ),
            'div {\ntop: 1px;\nheight: 0; /* 1comment */  /* 2comment */\n}'
        );
    });

    // Helper to check the detection
    function should_detect(options, a, b) {
        assert.equal(
            JSON.stringify(comb.detectInString(a, options)),
            JSON.stringify(b)
        );
    }

    it('Should detect semicolon for last property. Test 1', function() {
        should_detect(
            ['always-semicolon'],
            'div { height: 0 }',
            {
                'always-semicolon': false
            }
        );
    });

    it('Should detect semicolon for last property. Test 2', function() {
        should_detect(
            ['always-semicolon'],
            'div { height: 0; }',
            {
                'always-semicolon': true
            }
        );
    });

    it('Should detect semicolon for last property. Test 3', function() {
        should_detect(
            ['always-semicolon'],
            'div { height: 0; } div { height: 0 }',
            {
                'always-semicolon': true
            }
        );
    });

    it('Should detect semicolon for last property. Test 4', function() {
        should_detect(
            ['always-semicolon'],
            'div { height: 0 } div { height: 0; } div { height: 0 }',
            {
                'always-semicolon': false
            }
        );
    });

    it('Should detect semicolon for last property. Test 5', function() {
        should_detect(
            ['always-semicolon'],
            'div {\nheight: 0 /* Comment */\n} ' +
            'div { height: 0; }' +
            'div {\ntop: 1px;\nheight: 0 /* 1comment */  /* 2comment */\n}',
            {
                'always-semicolon': false
            }
        );
    });


    it('Should detect semicolon for last property. Test 6', function() {
        should_detect(
            ['always-semicolon'],
            'a{\n    border:0;\n}',
            {
                'always-semicolon': true
            }
        );
    });

    it('Should not detect semicolon for last property if there are no properties', function() {
        should_detect(
            ['always-semicolon'],
            'div {}',
            {}
        );
    });

});
