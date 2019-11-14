const mongoose = require('mongoose');

if(process.argv.length<3){
    console.log('not enough parameters');
    process.exit(1);
}

const password = process.argv[2];

const url =  
    `mongodb+srv://fullstack:${password}@cluster0-d8aqo.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true});

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})
const Person = mongoose.model('Person', personSchema);

if(process.argv.length==3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
            
        })
        mongoose.connection.close();
    })
} else if(process.argv.length==5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('person saved!');
        mongoose.connection.close();
    })
}

/*
const pswFile = require('fs');
const PSW = fs.readFile('../psw.txt', 'utf8', function(error, data){
    console.log(data);
})
console.log('works');
*/
