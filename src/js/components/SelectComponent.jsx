import { useState } from 'react';

const SelectComponent = ({ title, values, onChange, selected }) => {
  // Zustand für die ausgewählte Option
  const [selectedOption, setSelectedOption] = useState(selected);

  // Handler-Funktion für Änderungen der Auswahl
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <label htmlFor={title} >{title}</label>
      <select id={title} value={selectedOption} onChange={handleSelectChange} >
        {values.map(value => { return <option key={value} value={value}>{value}</option> })}
      </select>
    </>
  );
};

export default SelectComponent;
