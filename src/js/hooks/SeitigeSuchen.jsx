import React, { useState } from "react";
//externe Bibliothek import
const SeitigeSuchen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const fetchDate = async () => {
    //Abruf der Data von api

    const results = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setSearchResults(results);
  };

  //Die suche wird ausgelöt,wenn sich searchTerm ändert
  // useEffect(async () => {
  //   await fetchDate();
  // }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SeitigeSuchen;

// const date = [];
// const handelSearch = (event) => {
//   const searchTerm = event.target.value;
//   setSearchTerm(searchTerm);

//   const results = data.filter((item) =>
//     item.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   setSearchResults(results);
// };
