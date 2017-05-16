var expect = require('expect'),
    {generateMessage, generateLocationMessage} = require('../utils/message.js');

describe('generate message', ()=>{
  it('should generate the correct message object', () =>{
    var from = "Karan";
    var text = "This is a message";
    var message = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
   });
});

describe('generateLocationMessage', ()=>{
  it('should generate a location object', ()=>{
    var from = "karan";
    var lat = 15;
    var lng = 19;
    var url = "https://www.google.com/maps?q=15,19";
    var message = generateLocationMessage(from, lat, lng);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});