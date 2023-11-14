import React, { useState } from 'react';

const SelectComponent = ({title, values}) => {
  // Zustand für die ausgewählte Option
  const [selectedOption, setSelectedOption] = useState('');

  // Handler-Funktion für Änderungen der Auswahl
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
     <h3>{title}</h3>
      <label htmlFor="selectOption">Wähle eine Option:</label>
      <select id="selectOption" value={selectedOption} onChange={handleSelectChange}>
        {
            values.map(eventType => {return <option value={eventType.toLowerCase()}>{eventType}</option>})
        }
      </select>

      <p>Ausgewählte Option: {selectedOption}</p>
    </div>
  );
};

export default SelectComponent;
