[{
    id: '298yrow8rsdf',
    name: 'Uno',
    room: 'Nodejs'
}]

class Users {
    constructor() {
        this.users = [];
    }

    getUser(id) {
        return this.users.filter((user) => user.id===id)[0];
    };

    getUserByName(name) {
        return this.users.filter(user => user.name===name)[0];
    }
    
    // Return array of names, ['Uno','Marina']
    getUserList(room) {
        return this.users.filter((user) => {
            return user.room===room;
        }).map((user) => {
            return user.name;
        });
    };
    
    addUser(id,name,room) {
        return this.users.push({id,name,room});
    };
    
    removeUser(id) {
        let removedUser;
        this.users = this.users.filter((user) => {
            if(user.id===id) {
                removedUser = user;
                return false
            }
            return true;
        });
        return removedUser;
    };
}

module.exports = {Users};