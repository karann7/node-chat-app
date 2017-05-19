const expect = require('expect'),
      {Users}  = require('../utils/users.js');

describe('Users', () =>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node course'
    },{
      id: '2',
      name: 'Jen',
      room: 'React course'
    },{
      id: '3',
      name: 'Karan',
      room: 'Node course'
    }];
  });
  it('should add new user', ()=>{
    var users = new Users();
    var user = {
      id: "123",
      name: "Karan",
      room: 'Main'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
  
  it('Should find user', ()=>{
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it('should not find a user', ()=>{
    var userId = '5';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return names for node course',()=>{
    var userList = users.getUserList('Node course');
    expect(userList).toEqual(['Mike', 'Karan']);
  });

   it('should return names for React course',()=>{
    var userList = users.getUserList('React course');
    expect(userList).toEqual(['Jen']);
  });
});