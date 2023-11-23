
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import { sampleEvents } from './mock/sampleEvents';
import "./EventDetails.scss"

// const event = {
//     "_id": "655385b829ea2d760abf6a4a",
//     "eventTitle": "60 Years Tour",
//     "artist": "Rolling Stones",
//     "eventCategory": "Music",
//     "eventType": "Concert",
//     "img": "https://picsum.photos/200/301",
//     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia animi aspernatur, illo quo quibusdam perferendis repudiandae omnis voluptate maxime. Obcaecati quas minus, quia id optio deleniti at omnis natus sapiente mollitia ipsum quos quaerat doloribus similique necessitatibus fugit dolorem quod laboriosam? Perspiciatis magnam, assumenda beatae tenetur dolore sequi qui reiciendis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. In aut ipsam iusto corporis eligendi ex. Voluptatibus, magni, quaerat dolor aspernatur deserunt similique blanditiis exercitationem sapiente reiciendis deleniti placeat voluptas enim, quo molestias in perspiciatis laudantium atque ea. Natus illo, quod dolorem doloribus tempore nam nisi, voluptates necessitatibus possimus alias accusamus quas pariatur voluptatibus, quisquam minima? Quis eligendi aspernatur quas labore, quam recusandae distinctio rem iusto nesciunt quia illo dolor soluta harum voluptatum inventore ex, id perspiciatis. Quam veritatis tempore id iusto modi cupiditate vel alias magni tenetur, atque officiis velit dolore. Eaque labore ipsam aliquid iusto nisi suscipit laudantium quo?",
//     "homepage": "https://rollingstones.com/tour/",
//     "dateStart": "2023-12-28",
//     "dateEnd": "2023-12-29",
//     "timeStart": "16:00",
//     "timeEnd": "00:00",
//     "organizerId": "654a536cd72a93ef7b4036f9",
//     "venues": [
//         {
//             "_id": "655385b829ea2d760abf6a48",
//             "venueName": "Parkbühne Geyserhaus",
//             "venueType": "Open Air Bühne",
//             "city": "Leipzig",
//             "street": "Kleiststraße",
//             "houseNumber": "52",
//             "zipCode": "04129",
//             "additionalAddressInfo": "In der Nähe der Haltestelle Mosenthinstraße",
//             "createdAt": "2023-11-14T14:35:36.708Z",
//             "updatedAt": "2023-11-14T14:35:36.708Z"
//         },
//         {
//             _id: "6553875e29ea2d760abf6a5e",
//             venueName: "Tempodrom",
//             venueType: "Konzerthalle",
//             city: "Berlin",
//             street: "Möckernstrasse",
//             houseNumber: "10",
//             zipCode: "10963",
//             additionalAddressInfo: "",
//             createdAt: "2023-11-14T14:42:38.257Z",
//             updatedAt: "2023-11-14T14:42:38.257Z",
//         },
//     ],
//     "createdAt": "2023-11-14T14:35:36.818Z",
//     "updatedAt": "2023-11-14T14:35:36.818Z"
// }

export default function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState({
        _id: "",
        eventTitle: "",
        artist: "",
        eventCategory: "",
        eventType: "",
        img: "",
        description: "",
        homepage: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "",
        timeEnd: "",
        organizerId: "",
        venues: [],
        artists: [],
        createdAt: "",
        updatedAt: ""
    }
    );

    // TO DO: Add Loading

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`/api/event/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        fetchEventDetails();
    }, [eventId]);


    // useEffect(() => {
    //     // TODO use pagination when implemented
    //      useParams(), um die Event ID zu holen
    //     axios
    //         .get(`/api/event/655385b829ea2d760abf6a4a`, {
    //             // .get(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
    //             withCredentials: true,
    //         })
    //         .then((resp) => {
    //             setEvent(resp.data);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, []);


    // TO DO: Labels (bzw <span> Elemente, z.B. "Von:", "Bis:", etc) löschen, wenn alles richtig positioniert ist.
    return (
        <section className="event-details-container__section" >
            <aside className="img-container__aside" >
                <img className="event-image" src={event.img} />
            </aside>

            <article className="event-details__article" >
                <div className="event-details-content" >

                    <p id="date-start" >
                        <span className="font-weight-bold">Von:</span>
                        {`${event.dateStart} ${event.timeStart}`}
                    </p>

                    <p id="date-end" >
                        <span className="font-weight-bold">Bis:</span>
                        {`${event.dateEnd} ${event.timeEnd}`}
                    </p>

                    <p className="font-weight-bold font-size-big">
                        <span className="font-weight-bold">Artist(s):</span>
                        {event.artist}
                    </p>

                    {event.artists.map((artist) => {
                        return (
                            <div id="artist-info-container" key={artist._id}>
                                <p id="artist-name" >
                                    <span className="font-weight-bold">Artist Name:</span>
                                    {artist.artistName}
                                </p>
                                <p id="artist-type" >
                                    <span className="font-weight-bold">Artist Type</span>
                                    {artist.artistType}
                                </p>
                                <p id="artist-description" >
                                    <span className="font-weight-bold">Artist Description</span>
                                    {artist.artistDescription}
                                </p>

                                <p>Artist image:</p>
                                <img src={artist.artistImg} id="artist-img" width="200em" />
                            </div>
                        );
                    })}

                    <p id="event-title" >
                        <span className="font-weight-bold">Event Title:</span>
                        {event.eventTitle}
                    </p>

                    <p id="event-type" >
                        <span className="font-weight-bold">Event Typ:</span>
                        {event.eventType}
                    </p>

                    <p id="event-category">
                        <span className="font-weight-bold">Kategorie:</span>
                        {event.eventCategory}
                    </p>

                    <p>
                        <span className="font-weight-bold">Event-Homepage:</span>
                        <a href={event.homepage}> Homepage</a>
                    </p>

                    {event.venues.map((venue) => {
                        return (
                            <div id="venue-info" key={venue._id}>
                                <p id="venue-name" >
                                    <span className="font-weight-bold">Ort:</span>
                                    {venue.venueName}
                                </p>
                                <p id="venue-type" >
                                    <span className="font-weight-bold">Typ von Veranstaltungsort:</span>
                                    {venue.venueType}
                                </p>
                                <div id="venue-address-container">
                                    <span className="font-weight-bold">Adresse:</span>
                                    {(venue.street && venue.houseNumber) && `${venue.street} ${venue.houseNumber},`}
                                    {venue.zipCode} {venue.city}

                                    <p id="additional-address-info">
                                        <span className="font-weight-bold">
                                            Adresse:
                                        </span>
                                        {venue.additionalAddressInfo}
                                    </p>
                                </div>

                            </div>
                        );
                    })}

                    <p id="event-description">
                        <span className="font-weight-bold">
                            Beschreibung:
                        </span>
                        {event.description}
                    </p>
                </div>
            </article>
        </section>
    )
}