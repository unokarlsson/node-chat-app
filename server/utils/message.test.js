const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate a correct message object',() => {
        const from = 'Uno';
        const text = 'Some text'
        const messaage = generateMessage(from,text);
        expect(messaage).toInclude({from,text});
        expect(messaage.createdAt).toBeA('number');
    });



});