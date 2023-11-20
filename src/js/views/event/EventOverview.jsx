import axios from "axios";
import { useEffect, useState } from "react";
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
  // ["All", "Ausstellung", "Auktion", "Messe", "Vortrag", "Festival"];

  const eventTypes = {ALL: "", Ausstellung: "Ausstellung", Auktion: "Auktion", Messe: "Messe", Vortrag: "Vortrag", Festival: "Festival"}

  // ["All", "Museum", "Galerie", "Messe", "Auktionshaus", "Akademie"];
  const venueTypes = {ALL: "", Museum: "Museum", Galerie: "Galerie", Messe: "Messe", Auktionshaus: "Auktionshaus", Akademie: "Akademie"}

  const handleSearchInputChange = (evt) => {
    setSearchTerm(evt.target.value);
    
  };

  return (
    <div>
      <h2>Alle Veranstaltungen</h2>

      <div>
        <SelectComponent title="Event Type" values={eventTypes} setValue={setEventType} />
        <SelectComponent title="Venue Type" values={venueTypes} setValue={setVenueType} />
        <Calendar dateStart={setDateStart} dateEnd={setDateEnd}/>
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
