import React from 'react';
import Result from './result.jsx';
import styles from './searchResults.module.css';

const SearchResults = ({results}) => {
    return (
        <div className={styles.container}>
            {results && results.map((result) => <Result result={result} />)}
        </div>
    )
}

export default SearchResults;