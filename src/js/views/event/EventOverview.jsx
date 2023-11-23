import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../context/EventContext";
import EventCard from "../../components/EventCard.jsx";
import SelectComponent from "../../components/SelectComponent.jsx";
import { sampleEvents } from "./mock/sampleEvents.js";
import EventDetails from "./EventDetails.jsx";
import Calendar from "../../components/datePiker/datePiker.jsx";
import PaginationComponent from "../../components/PaginationComponent";
import "./EventOverview.scss";
export default function EventOverview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [search_btn, setSearch_btn] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [eventType, setEventType] = useState("");
  const [venueType, setVenueType] = useState("");
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 9;

  useEffect(() => {
    // TODO use pagination when implemented
    axios
      .get(`/api/events?page=${currentPage}&limit=${limit}`, {
        withCredentials: true,
        params: {
          dateStart,
          dateEnd,
          eventType,
          venueType,
          page: currentPage,
          limit,
        },
      })
      .then((resp) => {
        setEvents(resp.data.events);
        setTotalPages(resp.data.totalCount[0].count);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
        setSearch_btn(false)
      });
  }, [loading, search_btn, currentPage]);


  const handleSearchInputChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleEventTypeChange = (evt) => {
    setEventType(evt.target.value);
  };

  const handleVenueTypeChange = (evt) => {
    setVenueType(evt.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { eventTypes, venueTypes } = useContext(EventContext);

  return (
    <div>
      
      <div className="gallery">
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
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
