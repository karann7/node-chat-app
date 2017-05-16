var expect = require('expect'),
    generateMessage = require('../utils/message.js');

describe('generate message', ()=>{
  it('should generate the correct message object', () =>{
  var from = "Karan";
  var text = "This is a message";
  var message = generateMessage(from, text);
  expect(message.createdAt).toBeA('number');
  expect(message).toInclude({from, text});
   });
});