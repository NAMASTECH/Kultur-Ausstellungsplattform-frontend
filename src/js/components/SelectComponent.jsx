import React, { useState } from 'react';

const SelectComponent = ({title, values}) => {
  // Zustand für die ausgewählte Option
  const [selectedOption, setSelectedOption] = useState('');

  // Handler-Funktion für Änderungen der Auswahl
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <label htmlFor="selectOption" style={{margin:"10px", }}>{title}</label>
      <select id="selectOption" value={selectedOption} onChange={handleSelectChange}>
        {
            values.map(value => {return <option key={value} value={value.toLowerCase()}>{value}</option>})
        }
      </select>

      {/* <p>Ausgewählte Option: {selectedOption}</p> */}
    </>
  );
};

export default SelectComponent;
