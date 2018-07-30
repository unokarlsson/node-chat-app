const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate a correct message object',() => {
        const from = 'Uno';
        const text = 'Some text'
        const messaage = generateMessage(from,text);
        expect(messaage).toInclude({from,text});
        expect(messaage.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage',() => {
    it('Should generate correct location object',() => {
        const from = 'Uno';
        const latitude = 1;
        const longitude = 2;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const message = generateLocationMessage(from,latitude,longitude);

        expect(message).toInclude({
            from,
            url 
        });
        expect(message.createdAt).toBeA('number');
    });
});