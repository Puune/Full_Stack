import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchForm from './modules/SearchForm'
import CountryBrowser from './modules/CountryBrowser';


const App = () => {
  
  useEffect(()=> {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const[countries, setCountries] = useState([]);
  const[search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  const filter = (currentSearch) => {
      let tempList = [];
      function composeList(member) {        
        let upCaseName = member.name.toUpperCase();
        let upCaseSearch = currentSearch.toUpperCase();
        if(upCaseName.includes(upCaseSearch)){
            tempList.push(member);
        } 
      }      
      countries.forEach(composeList)
      setFiltered(tempList);
  }

//  console.log(countries[0]);
  
  
  return(
    <div>
      <SearchForm value={search} state={setSearch} filter={filter}/>
      <CountryBrowser filtered={filtered} />
    </div>
  )
}
export default App;
