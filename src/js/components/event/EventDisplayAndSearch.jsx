import React, { useState } from "react";
import SelectComponent from "../SelectComponent";

const EventDisplayAndSearch = () => {
  const eventTypes = ["Ausstellung", "Auktion", "Messe", "Vortrag", "Festival" ];
  const venueTypes = ["Museum", "Galerie", "Messe", "Auktionshaus", "Akademie" ];

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
          <SelectComponent title="Event Type" values={eventTypes}/>
          <SelectComponent title="Venue Type" values={venueTypes}/>
        </div>
      </div>
    </header>
  );
};
export default EventDisplayAndSearch;

//Date (Start-End)
