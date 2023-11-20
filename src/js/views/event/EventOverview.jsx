import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { EventContext } from '../../context/EventContext';
import EventCard from "../../components/EventCard.jsx";
import SelectComponent from "../../components/SelectComponent.jsx";
import { sampleEvents } from "./mock/sampleEvents.js";
import EventDetails from "./EventDetails.jsx";
import Calendar from "../../components/datePiker.jsx";

export default function EventOverview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [search_btn, setSearch_btn] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [eventType, setEventType] = useState("");
  const [venueType, setVenueType] = useState("");

  useEffect(() => {
    // TODO use pagination when implemented
    axios
      .get(`/api/events`, {
        withCredentials: true,
        params: {
          dateStart,
          dateEnd,
          eventType,
          venueType,
        },
      })
      .then((resp) => {
        setEvents(resp.data.events);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        setSearch_btn(false)
        console.log(events)
      });
  }, [loading, search_btn]);

  const handleSearchInputChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <div>
      <h2>Alle Veranstaltungen</h2>

      <div>
        {/* <h2>Veranstaltungen filtern</h2> */}
        <SelectComponent title="Event Type" values={eventTypes} onChange={handleEventTypeChange} />
        <SelectComponent title="Venue Type" values={venueTypes} onChange={handleVenueTypeChange} />
        <label htmlFor="dateStart" style={{ margin: "10px" }}>
          Von
        </label>
        <input
          id="dateStart"
          value={dateStart}
          style={{ margin: "10px" }}
          type="date"
          onChange={(evt) => setDateStart(evt.target.value)}
        />
        <label htmlFor="dateEnd" style={{ margin: "10px" }}>
          Bis
        </label>
        <input
          id="dateEnd"
          value={dateEnd}
          style={{ margin: "10px" }}
          type="date"
          onChange={(evt) => setDateEnd(evt.target.value)}
        />
        {/* <h2> Nach Veranstaltung suchen </h2> */}
        <label htmlFor="event-search_input" style={{ margin: "10px" }}></label>
        <input
          id="event-search_input"
          value={searchTerm}
          style={{ margin: "10px" }}
          type="search"
          placeholder="Künstler, Events, & Orte"
          onChange={handleSearchInputChange}
        />
        <button className="search_btn" onClick={(evt) => setSearch_btn(true)}> Suchen </button>
      </div>

      <br></br>

      <div>
        {!loading ? (
          events.length > 0 ? (
            events.map((event) => {
              return <EventCard key={event._id} event={event} />;
            })
          ) : (
            <h3>No events found!</h3>
          )
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
}
