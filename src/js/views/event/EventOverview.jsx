import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard.jsx";
import PaginationComponent from "../../components/PaginationComponent";
import "./EventOverview.scss";
import Filter from "../../components/filter/filter.jsx";


export default function EventOverview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search_btn, setSearch_btn] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [eventType, setEventType] = useState("All");
  const [venueType, setVenueType] = useState("All");
  const [open, setOpen] = useState(false);
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
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
  }, [loading, search_btn, currentPage, limit]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div>
      <button onClick={() => setOpen(true)}>Filter</button>
      <Filter open={open} setOpen={setOpen} setSearch_btn={setSearch_btn} setEventType={setEventType} setVenueType={setVenueType} eventType={eventType} venueType={venueType} dateStart={dateStart} dateEnd={dateEnd} setDateEnd={setDateEnd} setDateStart={setDateStart} />

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
