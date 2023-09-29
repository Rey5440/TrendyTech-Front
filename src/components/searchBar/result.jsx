import React from 'react';
import styles from './result.module.css';

const Result = ({result, setProduct, handleSearch}) => {
    if(result.name.length === 0) {
        result.name = "No hay resultados";
        return (
            <div className={styles.container}>{result.name}</div>
        );
    }
    const handleClick = (e) => {
        setProduct(result.name)
        handleSearch(e)
    }
    return (
        <div className={styles.container}><button className={styles.button} onClick={handleClick}>{result.name}</button></div>
    )
}

export default Result;