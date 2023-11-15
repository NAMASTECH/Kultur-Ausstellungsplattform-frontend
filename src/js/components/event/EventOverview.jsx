import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "./EventCard.jsx";
import SelectComponent from "../SelectComponent.jsx";
import { sampleEvents } from "./mock/sampleEvents.js";
import EventDetails from '../event/EventDetails';

export default function EventOverview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO use pagination when implemented
    axios
      .get(`/api/events`, {
        // .get(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        withCredentials: true,
      })
      .then((resp) => {
        setEvents(resp.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const eventTypes = ["Ausstellung", "Auktion", "Messe", "Vortrag", "Festival"];
  const venueTypes = ["Museum", "Galerie", "Messe", "Auktionshaus", "Akademie"];

  return (
    <div>
      <EventDetails />
      <h2>Alle Veranstaltungen</h2>
      <br></br>

      <div>
        {/* <h2>Veranstaltungen filtern</h2> */}
        <SelectComponent title="Event Type" values={eventTypes} />
        <SelectComponent title="Venue Type" values={venueTypes} />

        {/* <h2> Nach Veranstaltung suchen </h2> */}
        <label htmlFor="selectOption" style={{ margin: "10px" }}></label>
        <input id="event-search_input" style={{ margin: "10px" }} type="search" placeholder="Künstler, Events, & Orte" />
        <button className="search_btn"> Suchen </button>
      </div>

      <br></br>

      <div>
        {(!loading) ?
          events.length > 0 ? (
            events.map((event) => { return <EventCard key={event._id} event={event} /> })
          ) : (
            <h3>No events found!</h3>
          ) :
          <h3>Loading...</h3>}
      </div>

    </div>
  );
}
