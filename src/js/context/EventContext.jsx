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
  const eventCategories = ["All", "Kunst", "Musik", "Clubs", "Sport", "Bildung", "Politik"]

  return (
    <EventContext.Provider value={{ eventTypes, venueTypes, eventCategories }}>
      {children}
    </EventContext.Provider>
  );
};
