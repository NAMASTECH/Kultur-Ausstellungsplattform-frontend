import axios from "axios";
import { useEffect, useState } from "react";

export default function EventOverview() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // TODO use pagination when implemented
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        withCredentials: true,
      })
      .then((resp) => {
        setEvents(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const eventRows = events.map((event) => {
    return (
      <tr key={event._id}>
        <td>{event._id}</td>
        <td>{event.eventTitle}</td>
        <td>{event.artist}</td>
        <td>{event.eventType}</td>
        <td>{event.eventCategory}</td>
        <td>{event.img}</td>
        <td>{event.description}</td>
        <td>{event.homepage}</td>
        <td>{Date.parse(event.dateStart)}</td>
        <td>{Date.parse(event.dateStart)}</td>
        <td>{event.timeStart}</td>
        <td>{event.timeEnd}</td>
        <td>{event.venueName}</td>
        <td>{event.venueType}</td>
        <td>
          {event.venues.map(
            (venue) =>
              `${venue.city}, ${venue.street} ${venue.houseNumber} ${venue.zipCode}`
          )}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>All events</h2>
      {events.length > 0 ? (
        <table>
          <thead>
            <th>ID</th>
            <th> eventTitle </th>
            <th>artist</th>
            <th>eventType</th>
            <th>eventCategory</th>
            <th>img</th>
            <th>description</th>
            <th>homepage</th>
            <th>dateStart</th>
            <th>dateEnd</th>
            <th>timeStart</th>
            <th>timeEnd</th>
            <th>venueName</th>
            <th>Address</th>
          </thead>
          <tbody>{eventRows}</tbody>
        </table>
      ) : (
        <h3>No events found!</h3>
      )}
    </div>
  );
}

//    <td>{event.city}</td>
//         <td>{event.street}</td>
//         <td>{event.houseNumber}</td>
//         <td>{event.additionalAddressInfo}</td>
//         <td>{event.zipCode}</td>
