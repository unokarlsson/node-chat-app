const expect = require('expect');

const {Users} = require('./users');

describe('Users',() => {

    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Uno',
            room: 'Node course'
        },{
            id: '2',
            name: 'Alexandra',
            room: 'React course'
        },{
            id: '3',
            name: 'Marina',
            room: 'Node course'
        }];
    });

    it('Should  add new user',() => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Uno',
            room: 'Nodejs'
        };
        let response = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });


    it('Should remove a user',() => {
        const removedUser = users.removeUser('2');
        expect(users.users).toNotInclude(removedUser);
        expect(removedUser.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a user',() => {
        const removedUser = users.removeUser('5');
        expect(removedUser).toBeFalsy();
        expect(users.users.length).toBe(3);
    });


    it('Should find user',() => {
        let user = users.getUser('3');
        expect(user).toBe(users.users[2]);
    });

    it('Should not find user',() => {
        let user = users.getUser('6');
        expect(user).toBeFalsy();
    });


    it('Should find user by name',() => {
        let user = users.getUserByName('Uno');
        expect(user).toBe(users.users[0]);
    });

    it('Should not find user by name',() => {
        let user = users.getUserByName('Ulf');
        expect(user).toBeFalsy();
    });


    it('Should return names for Node course',() => {
        let names = users.getUserList('Node course');
        expect(names).toEqual(['Uno','Marina']);
    });

    it('Should return names for React course',() => {
        let names = users.getUserList('React course');
        expect(names).toEqual(['Alexandra']);
    });

 

    // it('',() => {

    // });
});