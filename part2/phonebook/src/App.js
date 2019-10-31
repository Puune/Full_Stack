import React, { useState, useEffect } from 'react'
import PhonebookList from './modules/PhonebookList';
import Search from './modules/Search';
import axios from 'axios';

//DEPRECATED


const App = () => {

  useEffect(()=> {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])


  const checkDublicates = (props) => persons.every(member => member.name !== props.newMember.name)

  //override submit
  const mySubmit = (event) => {
    event.preventDefault();   
    if(newName.length>0){
      var newMember = {
          name: newName,
          number: newNumber
      }      
      //check for duplicates
      let notDuplicate = checkDublicates({newMember});
      if(notDuplicate){

        let newList = [...persons];
        newList.push(newMember);
        setPersons(newList);

        //empty textfield
        setNewName('');
        setNewNumber('');
      } else {
          window.alert(`name ${newMember.name} already exists`)
          setNewName('');
        }
    } else {  }
}

  const search = (e, state) => {
    //event.preventDefault();
    handleFormFields(e, state);

    function composeList(member){
      let upCaseName = new String(member.name).toUpperCase();
      let upCaseSearch = new String(e.target.value).toUpperCase();
    
      if(upCaseName.includes(upCaseSearch)){
        //console.log(upMember, upSearch);
        results.push(member);
      }
    }
    let results = [];
    persons.forEach(composeList);

    setSearched(results);
  }

  //Allow textfields to update // universal handler
  const handleFormFields = (e, state) => {
    state(e.target.value);
  }

  /*
  //lists
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "0123456789"},
    { name: 'Antti Pentti', number: '694201337'},
    { name: 'Jonne Manninen', number: '444222222'}
  ])  */
  
  const [persons, setPersons] = useState([]);
  const [searched, setSearched] = useState([ ])
  
  //form fields
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSeacrh] = useState('');
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={search}>
        <div>
          Search: <input value={newSearch} onChange={(e)=>search(e, setNewSeacrh)}/>
        </div>
      </form>
      <Search list={searched}/>
      <h2>add new person</h2>
      <form onSubmit={mySubmit}>
        <div>
          name: <input value={newName} onChange={(e)=>handleFormFields(e, setNewName)}/>
          <br/>
          phonenumber: <input value={newNumber} onChange={(e)=>handleFormFields(e, setNewNumber)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhonebookList list={persons} />
    </div>
  )
}

export default App