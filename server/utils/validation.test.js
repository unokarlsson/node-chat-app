const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',() => {
    it('Should allow string with non space characters',() => {
        let string = ' s   ';
        let isReal = isRealString(string);
        expect(isReal).toBe(true);
    });

    it('Should reject non string values',() => {
        let string = 24;
        let isReal = isRealString(string);
        expect(isReal).toBe(false);
    });

    it('Should reject string with only spaces',() => {
        let string = '    ';
        let isReal = isRealString(string);
        expect(isReal).toBe(false);
    });
});