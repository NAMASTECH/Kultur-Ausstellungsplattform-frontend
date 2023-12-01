// EditEvent.jsx
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { useAuthStore } from "../hooks/useAuthStore"
import SelectComponent from '../components/SelectComponent';
import "./EditEvent.scss"

export default function EditEvent() {

    const { eventId } = useParams();
    const { userData } = useAuthStore();
    // State for form inputs
    const [eventType, setEventType] = useState("All");
    const [venueType, setVenueType] = useState("All");
    const [organizerName, setOrganizerName] = useState(userData.username);
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        eventTitle: '',
        eventCategory: '',
        eventType: '',
        img: '',
        description: '',
        homepage: '',
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
        isActive: true,
        venues: [
            {
                venueName: '',
                venueType: '',
                street: '',
                houseNumber: '',
                zipCode: '',
                city: '',
                additionalAddressInfo: ''
            }
        ],
        artists: [
            {
                artistName: '',
                artistType: '',
                artistImg: '',
                artistHomepage: '',
                artistDescription: ''
            }
        ],
    });



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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/api/event/${eventId}`, event, {
                withCredentials: true
            });
            navigate(`/mydata`)
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteEvent = async () => {
        if (window.confirm('Sind Sie sicher, dass sie dieses Event löschen möchten?')) {
            try {
                const response = await axios.put(`/api/events/deactivate/${eventId}`, {
                    withCredentials: true
                });
                // Handle the response, for example, redirect to another page or update the state
                alert('Event deleted successfully:', response.data.message);
                navigate(`/mydata`)
            } catch (error) {
                // Handle the error, for example, show an error message
                console.error('Error deleting event:', error.response.data);
            }
        }
    };

    const handleVenueChange = (index, field, value) => {
        // Create a new array of venues
        const updatedVenues = event.venues.map((venue, i) => {
            if (i === index) {
                // Update the specific venue object
                return { ...venue, [field]: value };
            }
            return venue;
        });

        // Update the event state with the new venues array
        setEvent(prevEvent => ({ ...prevEvent, venues: updatedVenues }));
    };

    const handleArtistChange = (index, field, value) => {
        const updatedArtists = event.artists.map((artist, i) => {
            if (i === index) {
                // Update the specific artist object
                return { ...artist, [field]: value };
            }
            return artist;
        });

        // Update the event state with the new artists array
        setEvent(prevEvent => ({ ...prevEvent, artists: updatedArtists }));
    };

    // Function to ensure the URL starts with http:// or https://
    const formatURL = (url) => {
        if (!url) return '';

        // Check if URL already starts with http:// or https://
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        // Prepend https:// if it's missing
        return `https://${url}`;
    };

    const handleEventTypeChange = (evt) => {
        setEventType(evt.target.value);
    };

    const handleVenueTypeChange = (evt) => {
        setVenueType(evt.target.value);
    };

    const handleOrganizerNameChange = (evt) => {
        setOrganizerName(evt.target.value);
    };

    const formattedEventHomepage = formatURL(event.homepage);
    const formattedImgUrl = formatURL(event.img);

    // EventContext konsumieren
    const { eventTypes, venueTypes } = useContext(EventContext);

    return (

        <section className="event-details-container__section" >
            <h2>Event bearbeiten</h2>

            <div className="event-details-container">

                <div className="img-container">
                    <img className="event-image" alt="Es wurde noch kein Bild für diese Veranstaltung hinterlegt" src={formattedImgUrl} />
                </div>

                <article className="event-details__article" >
                    <form id="editEvent_form" onSubmit={handleSaveChanges}>

                        <div className="event-details-content" >

                            <label htmlFor="organizerName">Veranstalter</label>

                            <input name="organizerName" type="text" placeholder="Veranstalter" value={organizerName} onChange={handleOrganizerNameChange} />


                            {event.venues.map((venue, index) => {
                                return (
                                    <div key={venue._id}>
                                        <label htmlFor="venueName">Veranstaltungsort</label>
                                        <input name="venueName" type="text" placeholder="Veranstaltungsort" value={venue.venueName} onChange={(e) => handleVenueChange(index, 'venueName', e.target.value)} />
                                    </div>
                                )
                            })}

                            <div className="date-and-time-container">

                                <div className="dates-container">
                                    <label htmlFor="dateStart">Datum</label>
                                    <input className="date-start_input" name="dateStart" type="date" required value={event.dateStart.split("T")[0]} onChange={handleInputChange} />

                                    <pre> - </pre>

                                    <input className="date-end_input" name="dateEnd" type="date" required value={event.dateEnd.split("T")[0]} onChange={handleInputChange} />
                                </div>

                                <pre> | </pre>

                                <div className='hours-container'>
                                    <label htmlFor="timeStart">Startzeit </label>
                                    <input name="timeStart" type="time" required value={event.timeStart} onChange={handleInputChange} />

                                    <pre> - </pre>
                                    <label htmlFor="timeEnd">Endzeit </label>
                                    <input name="timeEnd" type="time" required value={event.timeEnd} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="event-title-container">
                                {/* <h2>Eventname</h2> */}
                                <label htmlFor="eventTitle">Title </label>
                                <input id="eventName_input" name="eventTitle" type="text" required placeholder="Eventname" value={event.eventTitle} onChange={handleInputChange} />
                            </div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="eventDescription_textarea"
                                size="sm"
                                required
                                name="description"
                                placeholder="Geben Sie eine Beschreibung für diese Veranstaltung an"
                                rows="5"
                                // cols="5"
                                maxLength="2000"
                                value={event.description}
                                onChange={handleInputChange}
                            />

                            <SelectComponent
                                title="Event-Typ"
                                values={eventTypes}
                                onChange={handleEventTypeChange}
                                selected={event.eventType}
                            />

                            <SelectComponent
                                title="Typ von Veranstaltungsort"
                                values={venueTypes}
                                onChange={handleVenueTypeChange}
                                selected={event.venues[0].venueType}
                            />

                            {event.venues.map((venue, index) => {
                                return (
                                    <div id="event-details-content-footer">
                                        <div key={venue._id} id="venue-info" >

                                            <div id="venue-address-container">

                                                <p>Adresse</p>
                                                <label htmlFor="venueName"> Veranstaltungsort</label>
                                                <input name="venueName" type="text" placeholder="Veranstaltungsort" value={venue.venueName} onChange={(e) => handleVenueChange(index, 'venueName', e.target.value)} />
                                                <label htmlFor="venueType"> Veranstaltungsorttyp</label>
                                                <input name="venueType" type="text" placeholder="Veranstaltungsorttyp" required value={venue.venueType} onChange={(e) => handleVenueChange(index, 'venueType', e.target.value)} />

                                                <div>
                                                    <label htmlFor="street">Straße</label>
                                                    <input name="street" type="text" placeholder="Straße" required value={venue.street} onChange={(e) => handleVenueChange(index, 'street', e.target.value)} />
                                                    <label htmlFor="houseNumber">Number</label>
                                                    <input name="houseNumber" type="text" placeholder="Hausnummer" required value={venue.houseNumber} onChange={(e) => handleVenueChange(index, 'houseNumber', e.target.value)} />
                                                </div>

                                                <div>
                                                    <label htmlFor="zipCode">PLZ</label>
                                                    <input name="zipCode" type="text" placeholder="Postleitzahl" required value={venue.zipCode} onChange={(e) => handleVenueChange(index, 'zipCode', e.target.value)} />
                                                    <label htmlFor="city">Stadt</label>
                                                    <input name="city" type="text" placeholder="Stadt" required value={venue.city} onChange={(e) => handleVenueChange(index, 'city', e.target.value)} />
                                                </div>

                                                <div>
                                                    <label htmlFor="additionalAddressInfo">Zusätzliche Adressinformationen</label>
                                                    <input name="additionalAddressInfo" type="text" placeholder="Adresszusatz" value={venue.additionalAddressInfo} onChange={(e) => handleVenueChange(index, 'additionalAddressInfo', e.target.value)} />

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}

                            {/* <div id="event-homepage">
                                    <span className="font-weight-bold">Event-Homepage:</span>
                                    <a href={formattedEventHomepage} target="_self" rel="noopener noreferrer">
                                        {event.homepage}
                                        Event Homepage
                                    </a>
                                </div> */}
                            <label htmlFor="homepage">Startseite - </label>
                            <input name="homepage" type="text" placeholder="Event Homepage" value={event.homepage} onChange={handleInputChange} />


                            <p className="font-weight-bold font-size-big">
                                <span className="font-weight-bold">Künstler:</span>
                                {/* {event.artist} */}
                            </p>
                            <div>
                                {event.artists.map((artist, index) => {

                                    const formattedArtistImgUrl = formatURL(artist.artistImg)

                                    return (
                                        <div key={artist._id} id="artist-info-container">
                                            <label htmlFor="artistName">Künstlername: </label>
                                            <input
                                                name="artistName"
                                                type="text"
                                                value={artist.artistName}
                                                onChange={(e) => handleArtistChange(index, 'artistName', e.target.value)}
                                            />
                                            {/* <p id="artist-type" ></p>
                                                <span className="font-weight-bold">Künstlertyp: </span>
                                                {artist.artistType}
                                            </p>
                                            <p id="artist-homepage" >
                                                <span className="font-weight-bold">Künstler Startseite: </span>
                                                {artist.artistHomepage}
                                            </p>
                                            <p id="artist-description" >
                                                <span className="font-weight-bold">Beschreibung des Künstlers: </span>
                                                {artist.artistDescription}
                                            </p>

                                            <p>Künstlerbild</p>
                                            <img src={formattedArtistImgUrl} id="artist-img" width="200em" /> */}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                        <div className='filter_button'>
                            <button onClick={handleDeleteEvent}>{event.isActive ? 'dezactivire' : 'activire'}</button>
                            <button type="submit" >Speichern</button>
                        </div>
                    </form>
                </article>
            </div>

        </section >
    );
}