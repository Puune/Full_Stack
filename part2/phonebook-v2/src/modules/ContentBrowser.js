import React from 'react';
import ContentBrowserMember from './ContentBrowserMember';

const entries = (entry, setPersons, setMsg) => <ContentBrowserMember key={entry.id} 
                                                entry={entry} setPersons={setPersons} 
                                                setMsg={setMsg}/>

const ContentBrowser = ({persons, setPersons, searched, setMsg}) => {

    //make sure the list is never empty
    const createFilteredList = () => {

        function composeList(member){
            let upCaseName = new String(member.name).toUpperCase();
            let upCaseSearch = new String(searched).toUpperCase();
            if(upCaseName.includes(upCaseSearch)){                
                results.push(member);
            }
        }

        let results = [];
        persons.forEach(composeList);
        return (
            results
        )
    }

    return(
        <ul>
            {createFilteredList().map(entry => entries(entry, setPersons, setMsg))}
        </ul>
    )
}
export default ContentBrowser;