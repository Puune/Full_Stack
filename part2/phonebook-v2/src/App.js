import React, {useState, useEffect} from 'react';
import InputForm from './modules/InputForm';
import ContentBrowser from './modules/ContentBrowser';
import Filter from './modules/Filter';
import dbServices from './modules/dbServices';
import Notification from './modules/Notification';

const App = () => {

    useEffect(()=> {
        dbServices
            .readAll()
                .then(initPersons => {
                    setPersons(initPersons)
                })
                .catch(error => {
                    setMsg(`Error reading from db`)
                    setTimeout(()=>{
                        setMsg(null);
                    }, 5000)
                })
    },[])

    const [persons, setPersons] = useState([]);
    const [searched, setSearched] = useState('');
    //const [content, setContent] = useState('');
    const [msg, setMsg] = useState(null);
    
    return(
        <div>
            <h1>Phonebook</h1>
            <Notification message={msg}/>
            <Filter searched={searched}  setSearched={setSearched}/>
            <h3>Add new contact</h3>
            <InputForm persons={persons} setPersons={setPersons} setMsg={setMsg}/>
            <h3>Numbers</h3>
            <ContentBrowser persons={persons} setPersons={setPersons} 
                                searched={searched} setMsg={setMsg} />
        </div>
    )
}
export default App;