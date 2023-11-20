import React, { useState } from 'react';

const SelectComponent = ({title, values, setValue}) => {
  // Zustand für die ausgewählte Option
  const [selectedOption, setSelectedOption] = useState('');

  // Handler-Funktion für Änderungen der Auswahl
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setValue(event.target.value);
  };

  return (
    <>
      <label htmlFor="selectOption" style={{margin:"10px", }}>{title}</label>
      <select id="selectOption" value={selectedOption} onChange={handleSelectChange}>
        {
          Object.keys(values).map((key) => {
            return <option key={key} value={values[key]}>{key}</option>
          })
        }
        
      </select>

      {/* <p>Ausgewählte Option: {selectedOption}</p> */}
    </>
  );
};

export default SelectComponent;
