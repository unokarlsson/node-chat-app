const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
// console.log('Old way          = ',__dirname + '/../public');
console.log('Using path.join  = ',publicPath);

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));

// app.get('/',(request,response) => {
//     response.send(publicPath/index.html);
// });

app.listen(port,() => {
    console.log(`Server up on port ${port}`);
})