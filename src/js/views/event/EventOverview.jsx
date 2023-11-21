import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { EventContext } from '../../context/EventContext';
import EventCard from "../../components/EventCard.jsx";
import SelectComponent from "../../components/SelectComponent.jsx";
import { sampleEvents } from "./mock/sampleEvents.js";
import EventDetails from "./EventDetails.jsx";
import Calendar from "../../components/datePiker/datePiker.jsx";
import Pagination from "../../components/pagination/pagination.jsx";

export default function EventOverview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [search_btn, setSearch_btn] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [eventType, setEventType] = useState("");
  const [venueType, setVenueType] = useState("");
  const [items, setItems] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/events`, {
        withCredentials: true,
        params: {
          dateStart,
          dateEnd,
          eventType,
          venueType,
          page,
          limit: 9,
        },
      })
      .then((resp) => {
        setEvents(resp.data.events);
        setItems(resp.data.totalCount[0].count);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        setSearch_btn(false)
      });
  }, [loading, search_btn, page]);

  const handleSearchInputChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleEventTypeChange = (evt) => {
    setEventType(evt.target.value);
  }

  const handleVenueTypeChange = (evt) => {
    setVenueType(evt.target.value);
  }

  const { eventTypes, venueTypes } = useContext(EventContext)

  return (
    <div>
      <h2>Alle Veranstaltungen</h2>

      <div>
        
        <SelectComponent title="Event Type" values={eventTypes} onChange={handleEventTypeChange} />
        <SelectComponent title="Venue Type" values={venueTypes} onChange={handleVenueTypeChange} />
        <Calendar dateStart={setDateStart} dateEnd={setDateEnd} />
      
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

      
      <Pagination items={items} setPage={setPage} />
     
      

    </div>
  );
}
