import React from 'react';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
const styles = require('./styles.scss');

export default ({section, sections, handleSelect}) => {
  console.log(handleSelect);
  return (
      <ul className={styles.pills__container}>
        {
          Object.values(sections).map((currentSection) => (
            <li
              className={`${styles.pills__item} ${currentSection.id === section && styles.active}`}
              key={currentSection.id} onClick={() => handleSelect(currentSection.id)}>{currentSection.name}</li>
          ))
        }
      </ul>
  );
};
