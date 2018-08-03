class Person {
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }

    getUserDesription() {
        return `${this.name} is ${this.age} är.`
    }
}

let me = new Person('Uno',59);
console.log('me.name = ',me.name);
console.log('me.age  = ',me.age);

console.log(me.getUserDesription());