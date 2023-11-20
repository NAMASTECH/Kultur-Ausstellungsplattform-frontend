import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // TO DO: Fetch eventTypes, venueTypes and eventCategories from an API

  // const [eventTypes, setEventTypes] = useState("");
  // const [venueTypes, setVenueTypes] = useState("");

  // useEffect(() => {
  // ...
  // }, []);

  // OR
  // define them here, for example:
  const eventTypes = ["All", "Ausstellung", "Auktion", "Messe", "Vortrag", "Festival"];
  const venueTypes = ["All", "Museum", "Galerie", "Messe", "Auktionshaus", "Akademie"];

  return (
    <EventContext.Provider value={{ eventTypes, venueTypes }}>
      {children}
    </EventContext.Provider>
  );
};
