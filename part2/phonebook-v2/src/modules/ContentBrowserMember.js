import React from 'react';
import dbServices from './dbServices';

const ContentBrowserMember = ({entry, setPersons, setMsg}) => {

    const onClickDelete = (event) => {
        if(window.confirm(`Want to delete ${entry.name}?`)){
            let id = entry.id;
            event.preventDefault();
            dbServices
                .deleteContact(id)
                .catch(error => {
                    setMsg(`Error deleting contact`);
                    setTimeout(()=>{
                        setMsg(null);
                    }, 5000)
                })        
            
            dbServices
                .readAll()
                    .then(updatedList => {
                        setPersons(updatedList)
                })
                .catch(error => {
                    setMsg(`Error updating persons after deletion`)
                    setTimeout(()=>{
                        setMsg(null);
                    }, 5000)
                })      
            
            setMsg(`${entry.name} deleted`)
            setTimeout(()=>{
                setMsg(null)
                window.location.reload(false)
            }, 3000)
        }
    }
    
    return(
        <li key={entry.id}>
            {entry.name} : {entry.number} {'   '}
            <button onClick={onClickDelete}>delete</button>
        </li>
    )
}
export default ContentBrowserMember;
