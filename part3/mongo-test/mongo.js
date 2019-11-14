const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-d8aqo.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: Number
})

const Person = mongoose.model('Person', personSchema);

let persons = [
  {
    "name": "Arto Hellas",
    "number": "050 7642552",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "0123456789",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "694201337",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "444222222",
    "id": 4
  }
]

persons.forEach(person => {
  person = new Person(person);
  person.save().then(result => {
    console.log('success1');
    mongoose.connection.close();
  })
})