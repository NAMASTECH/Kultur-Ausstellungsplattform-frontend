import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../EventCard.jsx";
import SelectComponent from "../SelectComponent.jsx";

export default function EventOverview() {
  const [events, setEvents] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedVenueType, setSelectedVenueType] = useState('');

  useEffect(() => {
    // TODO use pagination when implemented
    axios
      .get(`/api/events`, {
        withCredentials: true,
      })
      .then((resp) => {
        setEvents(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const eventRows = events.map((event) => {
  //   return (
  //     <tr key={event._id}>
  //       <td>{event._id}</td>
  //       <td>{event.eventTitle}</td>
  //       <td>{event.artist}</td>
  //       <td>{event.eventType}</td>
  //       <td>{event.eventCategory}</td>
  //       <td>{event.img}</td>
  //       <td>{event.description}</td>
  //       <td>{event.homepage}</td>
  //       <td>{event.dateStart}</td>
  //       <td>{event.dateEnd}</td>
  //       <td>{event.timeStart}</td>
  //       <td>{event.timeEnd}</td>
  //       <td>{event.venueName}</td>
  //       <td>{event.venueType}</td>
  //       {event.venues.map((venue) => {
  //         return (
  //           <>
  //             <td>{venue.city}</td>
  //             <td>{venue.street}</td>
  //             <td>{venue.houseNumber}</td>
  //             <td>{venue.additionalAddressInfo}</td>
  //             <td>{venue.zipCode}</td>
  //           </>
  //         );
  //       })}
  //     </tr>
  //   );
  // });

  const events1 = [
    {
      eventTitle:"60 Years Tour",
      artist:"Rolling Stones",
      eventType:"Concert",
      eventCategory:"Music",
      img:"https://picsum.photos/200/30",
      homepage:"https://rollingstones.com/tour/",
      dateStart:"2023-12-28",
      dateEnd:"2023-12-29",
      timeStart:"16:00",
      timeEnd:"00:00",
      venueName:"Parkbühne Geyserhaus",
      venueType:"Open Air Bühne",
      venues: [
        {
          city: "Leipzig",
          street:"Kleiststraße",
          houseNumber: "52",
          additionalAddressInfo: "In der Nähe der Haltestelle Mosenthinstraße",
          zipCode: "04129"
        },
      ],
      description:"The rolling stones celebrate 60 years on Stage",
    },
    {
      eventTitle:"Rocking the world",
      artist:"Django Django",
      eventType:"Concert",
      eventCategory:"Music",
      img:"https://picsum.photos/200/30",
      homepage:"http://www.djangodjango.co.uk/#popupClosed",
      dateStart:"2024-01-20",
      dateEnd:"2024-01-20",
      timeStart:"18:00",
      timeEnd:"22:00",
      venueName:"Tempodrom",
      venueType:"Konzerthalle",
      venues: [
        {
          city: "Berlin",
          street:"Möckernstrasse",
          houseNumber: "10",
          additionalAddressInfo: "",
          zipCode: "10963"
        },
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, ipsa. Repellat est officia corporis itaque impedit deserunt adipisci quae nostrum assumenda tenetur? Quasi deleniti repudiandae neque similique inventore assumenda vitae?",
    },
    {
      eventTitle:"Reggaejam Festival",
      artist:"Damian Marley, 311, The Movement, Slightly Stoopid",
      eventType:"Concert",
      eventCategory:"Music",
      img:"https://picsum.photos/200/300",
      homepage:"https://reggaejam.de/de/",
      dateStart:"2024-05-26",
      dateEnd:"2024-05-28",
      timeStart:"12:00",
      timeEnd:"00:00",
      venueName:"Klosterpark Bersenbrück",
      venueType:"Festivalgelände",
      venues: [
        {
          city: "Bersenbrück",
          street:"",
          houseNumber: "",
          additionalAddressInfo: "",
          zipCode: "49593"
        },
      ],
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam quo nobis quaerat molestiae exercitationem quae molestias aut eaque ipsam ex consequatur dicta ab accusamus fuga, impedit alias debitis quis consectetur nam, laudantium quia ducimus porro soluta! Molestias delectus aliquid, nulla a ea dolorem totam, minus quaerat dolores quae, beatae sunt.",
    },
  ]

  let i=1;
  const eventTypes = ["Ausstellung", "Auktion", "Messe", "Vortrag", "Festival" ];
  const venueTypes = ["Museum", "Galerie", "Messe", "Auktionshaus", "Akademie" ];
  return (
    <div>
      <h2>Alle Veranstaltungen</h2>

      <br></br>

      {/* <h2>Veranstaltungen filtern</h2> */}

      <div>
        <SelectComponent title="Event Type" values={eventTypes}/>
        <SelectComponent title="Venue Type" values={venueTypes}/>
        {/* <h2> Nach Veranstaltung suchen </h2> */}
           <label htmlFor="selectOption" style={{margin:"10px" }}></label>
          <input id="event-search_input" style={{margin:"10px" }} type="search" placeholder="Künstler, Events, & Orte" />
          <button className="search_btn"> Suchen </button>
      </div>

      <br></br>

      <div>  

      </div>

      {/* {events1.length > 0 ? ( */}
      {events.length > 0 ? (
      
        events.map((event, index )=> { return <EventCard key={event._id} event={event}/>} )
      
        // <table>
        //   <thead>
        //     <th>ID</th>
        //     <th> eventTitle </th>
        //     <th>artist</th>
        //     <th>eventType</th>
        //     <th>eventCategory</th>
        //     <th>img</th>
        //     <th>description</th>
        //     <th>homepage</th>
        //     <th>dateStart</th>
        //     <th>dateEnd</th>
        //     <th>timeStart</th>
        //     <th>timeEnd</th>
        //     <th>venueName</th>
        //     <th>Address</th>
        //   </thead>
        //   <tbody>{eventRows} </tbody>
        // </table>
      ) : (
        <h3>No events found!</h3>
      )}
    </div>
  );
}
