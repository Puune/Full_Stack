import React, {useState} from 'react';
import dbServices from './dbServices';

const InputForm = ({persons, setPersons, setMsg}) => {

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleFormFields = (e, state) => {
        state(e.target.value);
    }

    const checkDublicates = (newMember) => persons.every(member => member.name !== newMember.name)

    //override submit
    const mySubmit = (event) => {
      event.preventDefault();   
      if(newName.length>0){
        var newMember = {
            name: newName,
            number: newNumber
        }      

        //check for duplicates. notDublicate always true if list empty
        let notDuplicate = (persons.length===0) ? true : checkDublicates(newMember);
        if(notDuplicate){
            dbServices.
                addContact(newMember)
                    .then(returnObj => {
                    setPersons(returnObj);
            })
            .catch(error => {
                setMsg(`Error Adding new person`);
                setTimeout(()=>{
                    setMsg(null);
                }, 5000)
            })

            setMsg(`${newMember.name} added`)
            setTimeout(()=>{
                setMsg(null)
            }, 3000)
            //let newList = [...persons];  //OLD
            //newList.push(newMember);     //OLD
            //setPersons(newList);         //OLD

            //empty textfield
            setNewName('');
            setNewNumber('');
        } else {
            //window.alert(`name ${newMember.name} already exists`) //OLD
            //setNewName('');                                       //OLD
            if(window.confirm(`${newMember.name} already exists, replace old number with new one?`)){
                
                //Get correct id
                let id;
                persons.forEach(person => {
                    if(person.name === newMember.name){
                        id = person.id;
                    }
                })

                //update database, update persons
                dbServices
                    .updateContact(id, newMember)
                        .then(response => {
                        setPersons(()=>{
                            let list = [...persons];
                            list[id-1] = response;
                            return list;
                        })                            
                    })
                    .catch(error => {
                        setMsg(`Error: ${error}`);
                        setTimeout(()=>{
                            setMsg(null);
                        }, 5000)
                })

                setMsg(`${newMember.name} number updated`)
                setTimeout(()=>{
                    setMsg(null);
                }, 3000)
            }
        }
      } else {  }
  }

    return(
        <form onSubmit={mySubmit}>
            <div>
                Name: <input value={newName} onChange={(e)=>handleFormFields(e, setNewName)}/>
                Number: <input value={newNumber} onChange={(e)=>handleFormFields(e, setNewNumber)}/>
            </div>
            <div>
                <button type="submit">add</button>      
            </div>
        </form>
    )
}
export default InputForm;