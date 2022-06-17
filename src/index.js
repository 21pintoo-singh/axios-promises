const express = require('express');

const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://21pintoo-singh:S0Uw8LhNlYRyHfiq@cluster1.k5nsu.mongodb.net/pintoosingh7", {
    useNewUrlParser: true
})
.then( () => console.log("we are connected to world"))
.catch ( err => console.log(err) )


app.use('/', route);


app.listen(process.env.PORT || 3333, function () {
    console.log('API HIT on port ' + (process.env.PORT || 3333))
});
