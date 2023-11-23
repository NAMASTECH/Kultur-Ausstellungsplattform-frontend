
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import { sampleEvents } from './mock/sampleEvents';

// TO DO: GET Endpoint für 1 Event ODER Context API


const event = {
    "_id": "655385b829ea2d760abf6a4a",
    "eventTitle": "60 Years Tour",
    "artist": "Rolling Stones",
    "eventCategory": "Music",
    "eventType": "Concert",
    "img": "https://picsum.photos/200/301",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia animi aspernatur, illo quo quibusdam perferendis repudiandae omnis voluptate maxime. Obcaecati quas minus, quia id optio deleniti at omnis natus sapiente mollitia ipsum quos quaerat doloribus similique necessitatibus fugit dolorem quod laboriosam? Perspiciatis magnam, assumenda beatae tenetur dolore sequi qui reiciendis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. In aut ipsam iusto corporis eligendi ex. Voluptatibus, magni, quaerat dolor aspernatur deserunt similique blanditiis exercitationem sapiente reiciendis deleniti placeat voluptas enim, quo molestias in perspiciatis laudantium atque ea. Natus illo, quod dolorem doloribus tempore nam nisi, voluptates necessitatibus possimus alias accusamus quas pariatur voluptatibus, quisquam minima? Quis eligendi aspernatur quas labore, quam recusandae distinctio rem iusto nesciunt quia illo dolor soluta harum voluptatum inventore ex, id perspiciatis. Quam veritatis tempore id iusto modi cupiditate vel alias magni tenetur, atque officiis velit dolore. Eaque labore ipsam aliquid iusto nisi suscipit laudantium quo?",
    "homepage": "https://rollingstones.com/tour/",
    "dateStart": "2023-12-28",
    "dateEnd": "2023-12-29",
    "timeStart": "16:00",
    "timeEnd": "00:00",
    "organizerId": "654a536cd72a93ef7b4036f9",
    "venues": [
        {
            "_id": "655385b829ea2d760abf6a48",
            "venueName": "Parkbühne Geyserhaus",
            "venueType": "Open Air Bühne",
            "city": "Leipzig",
            "street": "Kleiststraße",
            "houseNumber": "52",
            "zipCode": "04129",
            "additionalAddressInfo": "In der Nähe der Haltestelle Mosenthinstraße",
            "createdAt": "2023-11-14T14:35:36.708Z",
            "updatedAt": "2023-11-14T14:35:36.708Z"
        },
        {
            _id: "6553875e29ea2d760abf6a5e",
            venueName: "Tempodrom",
            venueType: "Konzerthalle",
            city: "Berlin",
            street: "Möckernstrasse",
            houseNumber: "10",
            zipCode: "10963",
            additionalAddressInfo: "",
            createdAt: "2023-11-14T14:42:38.257Z",
            updatedAt: "2023-11-14T14:42:38.257Z",
        },
    ],
    "createdAt": "2023-11-14T14:35:36.818Z",
    "updatedAt": "2023-11-14T14:35:36.818Z"
}

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

    return (
        <div style={{ display: "flex", width: "80%", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "20rem", }}>
                <img className="PlaceholderPicture" style={{ alignSelf: 'stretch', width: "100%", height: "500px", background: 'linear-gradient(0deg, #DDE1E6 0%, #DDE1E6 100%)' }} src={event.img} />
            </div>
            <div className="EventDetails" style={{ width: '60%', minHeight: "fit-content", border: '1px #DDE1E6 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', margin: "15px" }}>
                <div className="Content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'stretch', paddingTop: 24, paddingBottom: 16, paddingLeft: 16, paddingRight: 16, gap: 16 }}>
                    <div className="dateStart" > <b>Von:</b> {`${event.dateStart} ${event.timeStart}`}</div>
                    <div className="dateEnd" >  <b>Bis:</b> {`${event.dateEnd} ${event.timeEnd}`}</div>
                    <div className="artists" style={{ fontSize: 20, fontWeight: '700', }}> <b>Artist(s):</b>{event.artist} </div>


                    {event.artists.map((artist) => {
                        return (
                            <div key={artist._id}>
                                <div className="artistName" > <b>Artist Name:</b> {artist.artistName}</div>
                                <div className="artistType" > <b>Artist Type</b> {artist.artistType}</div>
                                <div className="artistDescription" > <b>Artist Description</b> {artist.artistDescription}</div>
                                <p>Artist image:</p>
                                <img src={artist.artistImg} className="artistImg" width="200em" />
                            </div>
                        );
                    })}


                    <div className="eventTitle" > <b>Event Title:</b> {event.eventTitle}</div>
                    <div className="eventType" > <b>Event Typ:</b> {event.eventType}</div>
                    <div className="eventCategory" > <b>Kategorie:</b> {event.eventCategory}</div>
                    <a href={event.homepage}>Homepage</a>

                    {event.venues.map((venue) => {
                        return (
                            <div key={venue._id}>
                                <div className="venueName" > <b>Ort:</b> {venue.venueName}</div>
                                <div className="venueType" > <b>Typ von Veranstaltungsort:</b> {venue.venueType}</div>
                                <div>
                                    <b>Adresse:</b>
                                    {(venue.street && venue.houseNumber) && `${venue.street} ${venue.houseNumber},`}
                                    {venue.zipCode} {venue.city}
                                </div>
                                <div>{venue.additionalAddressInfo}</div>
                            </div>
                        );
                    })}

                    <p className="description" style={{
                    }}> <b>Beschreibung:</b> {event.description}</p>
                </div>
            </div>
        </div>
    )
}
