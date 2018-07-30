const moment = require('moment');
// Relative Jan 1st 1970 00:00:00 am 
// Represented in milliseconds (1000 = 1 sec)
// 1000 => in the future
// -1000 => in the past

// let date = new Date();
// console.log(date.getMonth());

// let date = moment();
// date.add(1,'years').subtract(9,'months');
// console.log(date.format());
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am
// let date = moment();
// console.log(date.format('LT'));
// console.log(date.format('h:mm a'));

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);