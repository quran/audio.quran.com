import React from 'react';
const styles = require('./styles.scss');

export default ({ section, sections, handleSelect }) => {
  return (
    <ul className={styles.pills__container}>
      {Object.values(sections).map(currentSection => (
        <li
          className={`${styles.pills__item} ${currentSection.id === section && styles.active}`}
          key={currentSection.id}
          onClick={() => handleSelect(currentSection.id)}
        >
          <a tabIndex="-1">{currentSection.name}</a>
        </li>
      ))}
    </ul>
  );
};
