import React from 'react';
import styles from './result.module.css';

const Result = ({result}) => {
    return (
        <div className={styles.container}><button className={styles.button}>{result.name}</button></div>
    )
}

export default Result;