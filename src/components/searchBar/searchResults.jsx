import React from 'react';
import Result from './result.jsx';
import styles from './searchResults.module.css';

const SearchResults = ({ results }) => {
    if(results.length === 0) {
        return null;
    }
    return (
        <div>
            {results && (<div className={styles.container}>
                {results.map((result) => <Result result={result} />)}
            </div>)}
        </div>
    )
}

export default SearchResults;