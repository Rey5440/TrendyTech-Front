import React from 'react';
import Result from './result.jsx';
import styles from './searchResults.module.css';

const SearchResults = ({ results, setProduct, handleSearch }) => {
    if(results.length === 0) {
        return null;
    }
    return (
        <div>
            {results && (<div className={styles.container}>
                {results.map((result) => <Result result={result} setProduct={setProduct} handleSearch={handleSearch}/>)}
            </div>)}
        </div>
    )
}

export default SearchResults;