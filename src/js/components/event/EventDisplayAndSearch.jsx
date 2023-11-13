import React, { useState } from "react";

const EventDisplayAndSearch = () => {
  const [events, setEvents] = useState([]);



  return (
    <header>
      <div>
        <div>
          <h2> Nach Veranstaltung suchen </h2>

          <input type="search" placeholder="Such nach evnet" />
          <button className="btn"> Suchen </button>
        </div>
        <div>
          <h2> Filter</h2>
          <h3> Event Type:</h3>
          <select name="events" id="events">
            <option value="ausstellung">Ausstellung</option>
            <option value="auktion">Auktion</option>
            <option value="messe">Messe</option>
            <option value="vortrag">Vortrag</option>
            <option value="festival">Festival</option>
          </select>
        </div>
        <div>
          <h3> Venue Type:</h3>
          <select name="events" id="events">
            <option value="museum">Museum</option>
            <option value="galerie">Galerie</option>
            <option value="messe">Messe</option>
            <option value="auktionshaus">Auktionshaus</option>
            <option value="akademie">Akademie</option>
          </select>
        </div>
      </div>
    </header>
  );
};
export default EventDisplayAndSearch;

//Date (Start-End)
