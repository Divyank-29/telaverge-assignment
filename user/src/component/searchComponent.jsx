// eslint-disable-next-line no-unused-vars
import React , { useState , useCallback} from 'react';
import debounce from 'lodash.debounce'

import { useNavigate } from 'react-router-dom';





const SearchComponent = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [results, setResults] = useState();

  
  
  
  
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/search/recommendations?q=${query}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("API Response:", data); // Log API response
      setResults(data);
      navigate('/search-results', { state: { results: data } });

    }

    catch (error) {
      console.error('Error fetching recommendations:', error);
      setResults([]); // Set results to an empty array in case of error
      
  }
}
  const debouncedSearch = useCallback(debounce((newQuery) => {
    handleSearch(newQuery);
  }, 100), []);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    console.log(`Input changed to: ${newQuery}`);
    setQuery(newQuery);
    debouncedSearch(newQuery);
    handleSearch();
  };

  return (
    <div>
      <input value={query}
          onChange={handleChange}
          placeholder="Search…"
           type="text" 
          
     style={{
      padding: '8px 12px', 
      borderRadius: '4px', 
      border: '1px solid #ccc',
      width: '200px', 
    }}      />
      </div>
  );
};

export default SearchComponent
