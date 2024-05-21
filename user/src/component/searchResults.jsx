import { useLocation } from 'react-router-dom';

const SearchResultPage = () => {
  const location = useLocation(); // Access the current location
  const { results } = location.state || {}; // Extract the 'results' data from the location state

  return (
    <div>
      <h1>Search Results</h1>
      <div>
        {results && results.map(result => (
          <div key={result._id}>
            <img src={result.images} alt={result.name} />
            <div>{result.brand} {result.name}</div>
            <div>{result.description}</div>
            <div>{result.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultPage;
